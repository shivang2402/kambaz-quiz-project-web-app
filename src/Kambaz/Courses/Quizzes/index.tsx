import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Container, Button, ListGroup } from "react-bootstrap";

export default function QuizList() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const courseQuizzes = quizzes.filter((quiz: any) => quiz.course === cid);

  return (
    <Container>
      <h3 className="mb-3">Quizzes</h3>
      <div className="d-flex justify-content-end mb-3">
        <Link to={`/Kambaz/Courses/${cid}/Quizzes/${uuidv4()}`}>
          <Button variant="primary">+ Quiz</Button>
        </Link>
      </div>

      {courseQuizzes.length === 0 ? (
        <div className="text-muted">No quizzes yet. Click <b>+ Quiz</b> to add one.</div>
      ) : (
        <ListGroup>
          {courseQuizzes.map((quiz: any) => (
            <ListGroup.Item
              key={quiz._id}
              className="d-flex justify-content-between align-items-center"
            >
              <Link to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}>
                {quiz.title || "Untitled Quiz"}
              </Link>
              <span>{quiz.isPublished ? "✅ Published" : "🚫 Unpublished"}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}
