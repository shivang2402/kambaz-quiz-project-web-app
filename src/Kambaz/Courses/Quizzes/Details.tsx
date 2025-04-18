import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Table, Row, Col } from "react-bootstrap";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { account } = useSelector((state: any) => state.accountReducer); // assumes role
  const quiz = quizzes.find((q: any) => q._id === qid);

  if (!quiz) return <div className="text-muted m-4">Quiz not found.</div>;

  const isFaculty = account?.role === "Faculty";
  const isStudent = account?.role === "Student";

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="mb-1">{quiz.title}</h2>
          <div className="text-muted">{quiz.description}</div>
        </div>

        <div className="d-flex gap-2">
          {isFaculty && (
            <>
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
            </>
          )}
          {isStudent && (
            <Button
              variant="success"
              onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/take`)}
            >
              Start Quiz
            </Button>
          )}
        </div>
      </div>

      <Table bordered className="bg-white">
        <tbody>
          <tr>
            <td><strong>Quiz Type</strong></td>
            <td>{quiz.quizType}</td>
            <td><strong>Assignment Group</strong></td>
            <td>{quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <td><strong>Points</strong></td>
            <td>{quiz.points}</td>
            <td><strong>Time Limit</strong></td>
            <td>{quiz.timeLimit} mins</td>
          </tr>
          <tr>
            <td><strong>Shuffle Answers</strong></td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
            <td><strong>Show Correct Answers</strong></td>
            <td>{quiz.showCorrectAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td><strong>Access Code</strong></td>
            <td>{quiz.accessCode || "None"}</td>
            <td><strong>One Question at a Time</strong></td>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td><strong>Webcam Required</strong></td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
            <td><strong>Lock After Answering</strong></td>
            <td>{quiz.lockAfterAnswering ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td><strong>Multiple Attempts</strong></td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
            <td><strong>Allowed Attempts</strong></td>
            <td>{quiz.multipleAttempts ? quiz.allowedAttempts : 1}</td>
          </tr>
          <tr>
            <td><strong>Available From</strong></td>
            <td>{quiz.availableDate}</td>
            <td><strong>Available Until</strong></td>
            <td>{quiz.untilDate}</td>
          </tr>
          <tr>
            <td><strong>Due Date</strong></td>
            <td>{quiz.dueDate}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
