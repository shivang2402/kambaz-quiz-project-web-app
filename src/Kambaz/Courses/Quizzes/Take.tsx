import { useParams, useNavigate  } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { submitQuizAttempt, fetchQuizSubmission } from "./quizClient";
import { Button, Container, Form, Badge } from "react-bootstrap";


export default function QuizTake() {
  const { qid } = useParams();


  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const quiz = quizzes.find((q: any) => q._id === qid);

  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) return <div className="m-4 text-muted">Quiz not found.</div>;
  if (currentUser?.role !== "STUDENT")
    return <div className="m-4 text-danger">Access denied: For students only.</div>;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfAlreadySubmitted = async () => {
      try {
        const attempts = await fetchQuizSubmission(qid!, currentUser._id);
        if (attempts?.length > 0) {
          navigate(`/Kambaz/Courses/${quiz.course}/Quizzes/${qid}/preview`, { replace: true });
        }
      } catch (err) {
        console.error("Error checking submission:", err);
      } finally {
        setLoading(false);
      }
    };

    checkIfAlreadySubmitted();
  }, [qid, currentUser]);

  if (loading) return <div className="m-4">Checking if quiz already attempted...</div>;

  const handleSubmit = async () => {
    const score = getScore();
    const submissionPayload = {
      user: currentUser._id,
      quiz: qid,
      course: quiz.course,
      responses: Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        type: quiz.questions.find((q: any) => q._id === questionId)?.type,
        answer,
      })),
      score,
      timeBegin: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
    };

    try {
      const result = await submitQuizAttempt(submissionPayload);
      console.log("Saved quiz submission:", result);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Submission failed");
    }
  };

  const getScore = () => {
    let score = 0;
    quiz.questions.forEach((q: any) => {
      const a = answers[q._id];

      if (q.type === "Multiple Choice") {
        const correctIndex = q.choices.findIndex((c: any) => c.isCorrect);
        if (a === correctIndex) score += q.points;
      } else if (q.type === "tf" && a === q.answer) {
        score += q.points;
      } else if (
        q.type === "fib" &&
        q.possibleAnswers?.some(
          (ans: string) => ans.toLowerCase().trim() === a?.toLowerCase().trim()
        )
      ) {
        score += q.points;
      }
    });
    return score;
  };

  const renderTypeLabel = (type: string) => {
    console.log("Type of Quiz", type);

    if (type === "Multiple Choice") return <Badge bg="info">Multiple Choice</Badge>;
    if (type === "tf") return <Badge bg="warning">True / False</Badge>;
    if (type === "fib") return <Badge bg="secondary">Fill in the Blank</Badge>;
    return null;
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Take Quiz: {quiz.title}</h3>

      <Form>
        {quiz.questions.map((q: any, index: number) => {
          const questionId = q._id || `q-${index}`;
          const radioName = `${qid}-${questionId}`;

          return (
            <div key={questionId} className="mb-4 p-4 border rounded bg-light">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong>
                  Q{index + 1}: {q.title} ({q.points} pts)
                </strong>
                {renderTypeLabel(q.type)}
              </div>

              <div className="mb-3">{q.question}</div>

              {q.type === "Multiple Choice" && (
                <>
                  {q.choices?.map((choice: any, cIndex: number) => (
                    <Form.Check
                      key={cIndex}
                      type="radio"
                      name={radioName}
                      label={choice.answer}
                      checked={answers[q._id] === cIndex}
                      onChange={() => setAnswers({ ...answers, [q._id]: cIndex })}
                      disabled={submitted}
                    />
                  ))}
                </>
              )}

              {q.type === "tf" && (
                <>
                  <Form.Check
                    type="radio"
                    name={radioName}
                    label="True"
                    checked={answers[q._id] === true}
                    onChange={() => setAnswers({ ...answers, [q._id]: true })}
                    disabled={submitted}
                  />
                  <Form.Check
                    type="radio"
                    name={radioName}
                    label="False"
                    checked={answers[q._id] === false}
                    onChange={() => setAnswers({ ...answers, [q._id]: false })}
                    disabled={submitted}
                  />
                </>
              )}

              {q.type === "fib" && (
                <Form.Control
                  type="text"
                  placeholder="Enter your answer"
                  value={answers[q._id] || ""}
                  onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })}
                  disabled={submitted}
                />
              )}

              {submitted && (
                <div className="mt-2 text-muted">
                  {(() => {
                    let correct = false;

                    if (q.type === "Multiple Choice") {
                      const correctIndex = q.choices.findIndex((c: any) => c.isCorrect);
                      correct = answers[q._id] === correctIndex;
                    } else if (q.type === "tf") {
                      correct = answers[q._id] === q.answer;
                    } else if (q.type === "fib") {
                      correct = q.possibleAnswers?.some(
                        (ans: string) =>
                          ans.toLowerCase().trim() === answers[q._id]?.toLowerCase().trim()
                      );
                    }

                    return correct ? (
                      <span className="text-success">✅ Correct</span>
                    ) : (
                      <span className="text-danger">❌ Incorrect</span>
                    );
                  })()}
                </div>
              )}
            </div>
          );
        })}

        {!submitted ? (
          <div className="d-flex justify-content-end">
            <Button variant="success" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          </div>
        ) : (
          <div className="alert alert-primary text-center">
            Final Score: <strong>{getScore()}</strong> /{" "}
            {quiz.questions.reduce((sum: number, q: any) => sum + q.points, 0)}
          </div>
        )}
      </Form>
    </Container>
  );
}
