import { Col, Container, Form, Row, Nav, Tab } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addQuiz, updateQuiz } from "./quizReducer";
import { createQuizForCourse, updateQuizOnServer } from "./quizClient";
import QuestionEditor from "./QuestionsEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const existingQuiz = quizzes.find((q: any) => q._id === qid);
  const isEditingRef = useRef(!!existingQuiz);

  const [quiz, setQuiz] = useState<any>(
    existingQuiz || {
      _id: qid || uuidv4(),
      course: cid,
      title: "",
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
      dueDate: "",
      availableDate: "",
      untilDate: "",
      questions: [],
      isPublished: false,
    }
  );

  const handleSave = async (publish = false) => {
    const payload = { ...quiz, isPublished: publish };

    if (isEditingRef.current) {
      const updated = await updateQuizOnServer(payload);
      dispatch(updateQuiz(updated));
    } else {
      const created = await createQuizForCourse(cid!, payload);
      dispatch(addQuiz(created));
    }

    navigate(publish ? `/Kambaz/Courses/${cid}/Quizzes` : `/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`);
  };

  const totalPoints = quiz.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) || 0;

  return (
    <Container>
      <Tab.Container defaultActiveKey="details">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="details">Details</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="questions">Questions</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="mt-4">
          <Tab.Pane eventKey="details">
            <Form>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>
                  {quiz.title || "Untitled Quiz"} {quiz.isPublished ? "✅" : "🚫"}
                </h3>
              </div>

              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={quiz.title}
                  onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={quiz.description}
                  onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                />
              </Form.Group>

              <Row className="mt-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Quiz Type</Form.Label>
                    <Form.Select
                      value={quiz.quizType}
                      onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
                    >
                      <option>Graded Quiz</option>
                      <option>Practice Quiz</option>
                      <option>Graded Survey</option>
                      <option>Ungraded Survey</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Assignment Group</Form.Label>
                    <Form.Select
                      value={quiz.assignmentGroup}
                      onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
                    >
                      <option>Quizzes</option>
                      <option>Exams</option>
                      <option>Assignments</option>
                      <option>Project</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Time Limit (minutes)</Form.Label>
                    <Form.Control
                      type="number"
                      value={quiz.timeLimit}
                      onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Access Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={quiz.accessCode}
                      onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={6}>
                  <Form.Check
                    type="checkbox"
                    label="Shuffle Answers"
                    checked={quiz.shuffleAnswers}
                    onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Multiple Attempts"
                    checked={quiz.multipleAttempts}
                    onChange={(e) =>
                      setQuiz({
                        ...quiz,
                        multipleAttempts: e.target.checked,
                        allowedAttempts: e.target.checked ? 2 : 1,
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    label="Show Correct Answers"
                    checked={quiz.showCorrectAnswers}
                    onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })}
                  />
                </Col>

                <Col md={6}>
                  <Form.Check
                    type="checkbox"
                    label="One Question at a Time"
                    checked={quiz.oneQuestionAtATime}
                    onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Webcam Required"
                    checked={quiz.webcamRequired}
                    onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Lock After Answering"
                    checked={quiz.lockAfterAnswering}
                    onChange={(e) => setQuiz({ ...quiz, lockAfterAnswering: e.target.checked })}
                  />
                </Col>
              </Row>

              {quiz.multipleAttempts && (
                <Form.Group className="mt-3">
                  <Form.Label>How Many Attempts</Form.Label>
                  <Form.Control
                    type="number"
                    value={quiz.allowedAttempts}
                    onChange={(e) => setQuiz({ ...quiz, allowedAttempts: parseInt(e.target.value) })}
                  />
                </Form.Group>
              )}

              <Form.Group className="mt-3">
                <Form.Label>Total Points (auto-calculated)</Form.Label>
                <Form.Control type="number" value={totalPoints} readOnly />
              </Form.Group>

              <Row className="mt-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Available Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={quiz.availableDate}
                      onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={quiz.dueDate}
                      onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Until Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={quiz.untilDate}
                      onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <hr className="mt-4" />
              <div className="d-flex justify-content-end">
                <Link to={`/Kambaz/Courses/${cid}/Quizzes`} className="btn btn-secondary me-2">
                  Cancel
                </Link>
                <button className="btn btn-primary me-2" type="button" onClick={() => handleSave(false)}>
                  Save
                </button>
                <button className="btn btn-success" type="button" onClick={() => handleSave(true)}>
                  Save & Publish
                </button>
              </div>
            </Form>
          </Tab.Pane>

          <Tab.Pane eventKey="questions">
            <QuestionEditor quiz={quiz} setQuiz={setQuiz} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}
