import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { account } = useSelector((state: any) => state.accountReducer);
  const quiz = quizzes.find((q: any) => q._id === qid);

  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) return <div className="m-4 text-muted">Quiz not found.</div>;

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";


  const isStudent = currentUser?.role === "STUDENT";
  if (isStudent==true) return <div className="m-4 text-danger">Access denied.</div>;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getScore = () => {
    let score = 0;
    quiz.questions.forEach((q: any, index: number) => {
      const a = answers[q._id];
      if (q.type === "Multiple Choice" && a === q.correctAnswer) {
        score += q.points;
      } else if (q.type === "True/False" && a === q.correctAnswer) {
        score += q.points;
      } else if (
        q.type === "Fill in the Blank" &&
        q.acceptedAnswers?.some((ans: string) => ans.toLowerCase().trim() === a?.toLowerCase().trim())
      ) {
        score += q.points;
      }
    });
    return score;
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Quiz Preview: {quiz.title}</h3>

      <Form>
        {quiz.questions.map((q: any, index: number) => (
          <div key={q._id} className="mb-4 p-3 border rounded bg-light">
            <strong>
              Q{index + 1}: {q.title} ({q.points} pts)
            </strong>
            <div className="mt-2 mb-2">{q.question}</div>

            {q.type === "Multiple Choice" && (
              <>
                {q.choices.map((choice: string, cIndex: number) => (
                  <Form.Check
                    key={cIndex}
                    type="radio"
                    name={`q-${q._id}`}
                    label={choice}
                    checked={answers[q._id] === cIndex}
                    onChange={() =>
                      setAnswers({ ...answers, [q._id]: cIndex })
                    }
                    disabled={submitted}
                  />
                ))}
              </>
            )}

            {q.type === "True/False" && (
              <>
                <Form.Check
                  type="radio"
                  name={`q-${q._id}`}
                  label="True"
                  checked={answers[q._id] === true}
                  onChange={() =>
                    setAnswers({ ...answers, [q._id]: true })
                  }
                  disabled={submitted}
                />
                <Form.Check
                  type="radio"
                  name={`q-${q._id}`}
                  label="False"
                  checked={answers[q._id] === false}
                  onChange={() =>
                    setAnswers({ ...answers, [q._id]: false })
                  }
                  disabled={submitted}
                />
              </>
            )}

            {q.type === "Fill in the Blank" && (
              <Form.Control
                type="text"
                value={answers[q._id] || ""}
                onChange={(e) =>
                  setAnswers({ ...answers, [q._id]: e.target.value })
                }
                disabled={submitted}
              />
            )}

            {submitted && (
              <div className="mt-2 text-muted">
                {(() => {
                  const correct =
                    q.type === "Multiple Choice"
                      ? answers[q._id] === q.correctAnswer
                      : q.type === "True/False"
                      ? answers[q._id] === q.correctAnswer
                      : q.acceptedAnswers?.some(
                          (ans: string) =>
                            ans.toLowerCase().trim() ===
                            answers[q._id]?.toLowerCase().trim()
                        );

                  return correct ? (
                    <span className="text-success">✅ Correct</span>
                  ) : (
                    <span className="text-danger">❌ Incorrect</span>
                  );
                })()}
              </div>
            )}
          </div>
        ))}

        {!submitted ? (
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)}>
              Edit Quiz
            </Button>
            <Button variant="success" onClick={handleSubmit}>
              Submit Preview
            </Button>
          </div>
        ) : (
          <div className="alert alert-success text-center">
            Final Score: <strong>{getScore()}</strong> / {quiz.questions.reduce((sum: number, q: any) => sum + q.points, 0)}
          </div>
        )}
      </Form>
    </Container>
  );
}
