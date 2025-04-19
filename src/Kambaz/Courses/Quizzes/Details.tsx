import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Table } from "react-bootstrap";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: any) => q._id === qid);

  if (!quiz) return <div className="text-muted m-4">Quiz not found.</div>;

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser) || {};
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  const isAvailable = new Date() >= new Date(quiz.availableDate);

  return (
    <Container className="mt-4">
      {/* Header with role-based buttons */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="mb-1">{quiz.title || "Untitled Quiz"}</h2>
          <div className="text-muted">{quiz.description || "No description provided."}</div>
        </div>

        {/* Faculty buttons */}
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

        {/* Student start button */}
        {isStudent && (
          <Button
            variant="success"
            disabled={!isAvailable}
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/take`)}
            title={!isAvailable ? `Not available until ${quiz.availableDate}` : ""}
          >
            Start Quiz
          </Button>
        )}
      </div>

      {/* Metadata Table */}
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
            <td>{quiz.timeLimit ? `${quiz.timeLimit} minutes` : "No limit"}</td>
          </tr>

          <tr>
            <td><strong>Multiple Attempts</strong></td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
            <td><strong>How Many Attempts</strong></td>
            <td>{quiz.multipleAttempts ? quiz.allowedAttempts ?? "Unlimited" : 1}</td>
          </tr>

          <tr>
            <td><strong>Access Code</strong></td>
            <td>{quiz.accessCode || "None"}</td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td><strong>Available From</strong></td>
            <td>{quiz.availableDate || "N/A"}</td>
            <td><strong>Available Until</strong></td>
            <td>{quiz.untilDate || "N/A"}</td>
          </tr>

          <tr>
            <td><strong>Due Date</strong></td>
            <td>{quiz.dueDate || "N/A"}</td>
            <td></td>
            <td></td>
          </tr>

          {/* Extra fields for faculty only */}
          {isFaculty && (
            <>
              <tr>
                <td><strong>Shuffle Answers</strong></td>
                <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
                <td><strong>Show Correct Answers</strong></td>
                <td>{quiz.showCorrectAnswers ? "Yes" : "No"}</td>
              </tr>

              <tr>
                <td><strong>One Question at a Time</strong></td>
                <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
                <td><strong>Webcam Required</strong></td>
                <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
              </tr>

              <tr>
                <td><strong>Lock After Answering</strong></td>
                <td>{quiz.lockAfterAnswering ? "Yes" : "No"}</td>
                <td></td>
                <td></td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
