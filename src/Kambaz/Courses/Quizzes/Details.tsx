import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchQuizSubmission } from "./quizClient";
import { Button, Container, Table } from "react-bootstrap";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: any) => q._id === qid);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser) || {};

  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";
  const isAvailable = new Date() >= new Date(quiz?.dates?.available || 0);

  const [submission, setSubmission] = useState<any>(null);

  useEffect(() => {
    const loadSubmission = async () => {
      if (!qid || !currentUser?._id || !isStudent) return;
      try {
        const res = await fetchQuizSubmission(qid, currentUser._id);
        if (res.length > 0) setSubmission(res[0]);
      } catch (e) {
        console.error("Failed to fetch submission:", e);
      }
    };

    loadSubmission();
  }, [qid, currentUser, isStudent]);

  if (!quiz) return <div className="text-muted m-4">Quiz not found.</div>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="mb-1">{quiz.title || "Untitled Quiz"}</h2>
          <div className="text-muted">{quiz.description || "No description provided."}</div>
        </div>

        {isFaculty && (
          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)}
            >
              Edit
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`)}
            >
              Preview
            </Button>
          </div>
        )}

        {isStudent && !submission && (
          <Button
            variant="success"
            disabled={!isAvailable}
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/take`)}
            title={!isAvailable ? `Not available until ${quiz.dates?.available}` : ""}
          >
            Start Quiz
          </Button>
        )}
      </div>

      {/* Quiz Metadata */}
      <Table bordered className="bg-white">
        <tbody>
          <tr>
            <td><strong>Quiz Type</strong></td>
            <td>{quiz.quizType || "Not specified"}</td>
            <td><strong>Assignment Group</strong></td>
            <td>{quiz.assignmentGroup || "None"}</td>
          </tr>
          <tr>
            <td><strong>Points</strong></td>
            <td>{quiz.points ?? "N/A"}</td>
            <td><strong>Time Limit</strong></td>
            <td>{quiz.settings?.timeLimit ? `${quiz.settings.timeLimit} minutes` : "No limit"}</td>
          </tr>
          <tr>
            <td><strong>Multiple Attempts</strong></td>
            <td>{quiz.settings?.multipleAttempts?.enabled ? "Yes" : "No"}</td>
            <td><strong>How Many Attempts</strong></td>
            <td>{quiz.settings?.multipleAttempts?.attemptsAllowed ?? 1}</td>
          </tr>
          <tr>
            <td><strong>Access Code</strong></td>
            <td>{quiz.settings?.accessCode || "None"}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td><strong>Available From</strong></td>
            <td>{quiz.dates?.available ? new Date(quiz.dates.available).toLocaleDateString() : "N/A"}</td>
            <td><strong>Available Until</strong></td>
            <td>{quiz.dates?.until ? new Date(quiz.dates.until).toLocaleDateString() : "N/A"}</td>
          </tr>
          <tr>
            <td><strong>Due Date</strong></td>
            <td>{quiz.dates?.due ? new Date(quiz.dates.due).toLocaleDateString() : "N/A"}</td>
            <td></td>
            <td></td>
          </tr>

          {isFaculty && (
            <>
              <tr>
                <td><strong>Shuffle Answers</strong></td>
                <td>{quiz.settings?.shuffleAnswers ? "Yes" : "No"}</td>
                <td><strong>Show Correct Answers</strong></td>
                <td>{quiz.settings?.showCorrectAnswers?.enabled ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td><strong>One Question at a Time</strong></td>
                <td>{quiz.settings?.oneQuestionAtATime ? "Yes" : "No"}</td>
                <td><strong>Webcam Required</strong></td>
                <td>{quiz.settings?.webcamRequired ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td><strong>Lock After Answering</strong></td>
                <td>{quiz.settings?.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
                <td></td>
                <td></td>
              </tr>
            </>
          )}
        </tbody>
      </Table>

      {/* If student has attempted, show submission summary */}
      {isStudent && submission && (
        <div className="mt-5">
          <h4>Your Attempt</h4>
          <p><strong>Score:</strong> {submission.score}</p>

          {submission.quiz.questions.map((q: any, idx: number) => {
            const response = submission.responses[idx]; // match by index
            const userAnswer = response?.answer ?? "Not Answered";

            const isCorrect = (() => {
              if (q.type === "mcq") {
                const correct = q.choices?.find((c: any) => c.isCorrect)?.answer;
                return userAnswer === correct;
              }
              if (q.type === "tf") {
                return userAnswer?.toString().toLowerCase() === q.answer?.toString().toLowerCase();
              }
              if (q.type === "fib") {
                return q.possibleAnswers?.some(
                  (ans: string) => ans.toLowerCase().trim() === userAnswer.toLowerCase().trim()
                );
              }
              return false;
            })();

            return (
              <div key={idx} className="mb-4 p-3 border rounded bg-light">
                <h5>Q{idx + 1}: {q.title} ({q.points} pts)</h5>
                <p><strong>Question:</strong> {q.question}</p>
                <p><strong>Your Answer:</strong> {userAnswer}</p>
                <p>
                  <strong>Correct?</strong>{" "}
                  {isCorrect ? <span className="text-success">✅</span> : <span className="text-danger">❌</span>}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
