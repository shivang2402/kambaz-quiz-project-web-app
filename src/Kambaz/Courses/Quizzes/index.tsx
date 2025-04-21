


import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setQuizzes } from "./quizReducer";
import { fetchQuizSubmission } from "./quizClient";
import {
  Container,
  Button,
  ListGroup,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import { fetchQuizzesForCourse, createQuizForCourse, deleteQuizOnServer } from "./quizClient";

export default function QuizList() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const isStudent = currentUser?.role === "STUDENT";
  const courseQuizzes = quizzes.filter((q: any) =>
    q.course === cid && (!isStudent || q.isPublished)
  );
  const canCreateQuiz = ["FACULTY", "TA", "ADMIN"].includes(currentUser?.role);

  useEffect(() => {
    const loadQuizzes = async () => {
      if (!cid) return;
      const quizzesFromServer = await fetchQuizzesForCourse(cid);
      dispatch(setQuizzes(quizzesFromServer));
    };
    loadQuizzes();
  }, [cid, dispatch]);

  const handleAddQuiz = async () => {
    if (!cid) return;

    const newQuiz = {
      title: "Untitled Quiz",
      description: "",
      quizType: "Graded Quiz",
      assignmentGroup: "Quizzes",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      allowedAttempts: 1,
      showCorrectAnswers: false,
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockAfterAnswering: false,
      dates: {
        available: "",
        due: "",
        until: "",
      },
      questions: [],
      isPublished: false,
      points: 0,
    };

    try {
      const created = await createQuizForCourse(cid, newQuiz);
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${created._id}/edit`);
    } catch (e) {
      console.error("Failed to create quiz:", e);
    }
  };


  const getAvailability = (quiz: any) => {
    const now = new Date();
    const available = new Date(quiz.dates?.available);
    const until = new Date(quiz.dates?.until);
    if (now < available) return `Not available until ${available.toLocaleDateString()}`;
    if (now > until) return "Closed";
    return "Available";
  };

  const togglePublish = (quiz: any) => {
    const updated = { ...quiz, isPublished: !quiz.isPublished };
    const updatedList = courseQuizzes.map((q: any) =>
      q._id === quiz._id ? updated : q
    );
    dispatch(setQuizzes(updatedList));
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteQuizOnServer(id);
      dispatch(setQuizzes(courseQuizzes.filter((q: any) => q._id !== id)));
    } catch (err) {
      console.error("Failed to delete quiz:", err);
    }
  };


  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Assignment Quizzes</h5>
        {canCreateQuiz && (<Button variant="danger" onClick={handleAddQuiz}>+ Quiz</Button>)}
      </div>

      {courseQuizzes.length === 0 ? (
        <div className="text-muted">No quizzes yet. Click <b>+ Quiz</b> to add one.</div>
      ) : (
        <ListGroup>
          {courseQuizzes.map((quiz: any) => (
            <ListGroup.Item key={quiz._id}>
              <Row>
                <Col md={10}>
                  <div className="d-flex gap-3 align-items-start">
                    <span
                      role="button"
                      title={quiz.isPublished ? "Unpublish" : "Publish"}
                      onClick={() => togglePublish(quiz)}
                      className="fs-5"
                    >
                      {quiz.isPublished ? "✅" : "🚫"}
                    </span>

                    <div>
                      <div
                        role="button"
                        onClick={async () => {
                          if (currentUser?.role === "STUDENT") {
                            try {
                              const attempts = await fetchQuizSubmission(quiz._id, currentUser._id);
                              if (attempts?.length > 0) {
                                navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`);
                              } else {
                                navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/take`);
                              }
                            } catch (e) {
                              console.error("Failed to check submission:", e);
                              navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/take`);
                            }
                          } else {
                            navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`);
                          }
                        }}

                        className="fw-bold text-dark text-decoration-none"
                      >
                        {quiz.title}
                      </div>

                      <div className="text-muted small mt-1">
                        {getAvailability(quiz)} • Due {quiz.dates?.due ? new Date(quiz.dates.due).toLocaleDateString() : "N/A"}• {quiz.points} pts • {quiz.questions.length} Questions
                      </div>
                    </div>
                  </div>
                </Col>

                {!isStudent && (<Col md={2} className="d-flex justify-content-end">
                  <Dropdown>
                    <Dropdown.Toggle variant="light" size="sm" className="border-0">
                      ⋮
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`)}>
                        Edit
                      </Dropdown.Item>

                      <Dropdown.Item onClick={() => handleDelete(quiz._id)}>
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => togglePublish(quiz)}>
                        {quiz.isPublished ? "Unpublish" : "Publish"}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>)}
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}
