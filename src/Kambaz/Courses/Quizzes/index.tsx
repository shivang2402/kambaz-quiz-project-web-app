// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { setQuizzes } from "./quizReducer";
// import { v4 as uuidv4 } from "uuid";
// import {
//   Container,
//   Button,
//   ListGroup,
//   Row,
//   Col,
//   Dropdown,
// } from "react-bootstrap";

// export default function QuizList() {
//   const { cid } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { quizzes } = useSelector((state: any) => state.quizzesReducer);
//   const courseQuizzes = quizzes.filter((q: any) => q.course === cid);

//   useEffect(() => {
//     if (!cid) return;

//     dispatch(setQuizzes([
//       {
//         _id: "demo1",
//         course: cid,
//         title: "Q1 - HTML",
//         description: "Test your basics",
//         quizType: "Graded Quiz",
//         assignmentGroup: "Assignment Quizzes",
//         shuffleAnswers: true,
//         timeLimit: 15,
//         multipleAttempts: false,
//         allowedAttempts: 1,
//         showCorrectAnswers: false,
//         accessCode: "",
//         oneQuestionAtATime: true,
//         webcamRequired: false,
//         lockAfterAnswering: false,
//         dueDate: "2025-05-01",
//         availableDate: "2025-04-20",
//         untilDate: "2025-05-02",
//         questions: [{}, {}, {}, {}, {}],
//         isPublished: true,
//         points: 15
//       },
//       {
//         _id: "demo2",
//         course: cid,
//         title: "Q2 - CSS",
//         description: "Quick recap",
//         quizType: "Practice Quiz",
//         assignmentGroup: "Assignment Quizzes",
//         shuffleAnswers: false,
//         timeLimit: 30,
//         multipleAttempts: true,
//         allowedAttempts: 3,
//         showCorrectAnswers: true,
//         accessCode: "REVIEW123",
//         oneQuestionAtATime: false,
//         webcamRequired: false,
//         lockAfterAnswering: false,
//         dueDate: "2025-05-10",
//         availableDate: "2025-04-25",
//         untilDate: "2025-05-11",
//         questions: [{}],
//         isPublished: false,
//         points: 10
//       },
//     ]));
//   }, [cid, dispatch]);

//   const getAvailability = (quiz: any) => {
//     const now = new Date();
//     const available = new Date(quiz.availableDate);
//     const until = new Date(quiz.untilDate);
//     if (now < available) return `Not available until ${available.toLocaleDateString()}`;
//     if (now > until) return "Closed";
//     return "Available";
//   };

//   const togglePublish = (quiz: any) => {
//     const updated = { ...quiz, isPublished: !quiz.isPublished };
//     const updatedList = courseQuizzes.map((q: any) =>
//       q._id === quiz._id ? updated : q
//     );
//     dispatch(setQuizzes(updatedList));
//   };

//   const handleDelete = (id: string) => {
//     dispatch(setQuizzes(courseQuizzes.filter((q: any) => q._id !== id)));
//   };

//   return (
//     <Container className="mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="fw-bold">Assignment Quizzes</h5>
//         <Link to={`/Kambaz/Courses/${cid}/Quizzes/${uuidv4()}`}>
//           <Button variant="danger">+ Quiz</Button>
//         </Link>
//       </div>

//       {courseQuizzes.length === 0 ? (
//         <div className="text-muted">No quizzes yet. Click <b>+ Quiz</b> to add one.</div>
//       ) : (
//         <ListGroup>
//           {courseQuizzes.map((quiz: any) => (
//             <ListGroup.Item key={quiz._id}>
//               <Row>
//                 <Col md={10}>
//                   <div className="d-flex gap-3 align-items-start">
//                     <span
//                       role="button"
//                       title={quiz.isPublished ? "Unpublish" : "Publish"}
//                       onClick={() => togglePublish(quiz)}
//                       className="fs-5"
//                     >
//                       {quiz.isPublished ? "✅" : "🚫"}
//                     </span>

//                     <div>
//                       <Link
//                         to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
//                         className="fw-bold text-dark text-decoration-none"
//                       >
//                         {quiz.title}
//                       </Link>

//                       <div className="text-muted small mt-1">
//                         {getAvailability(quiz)} • Due {new Date(quiz.dueDate).toLocaleDateString()} • {quiz.points} pts • {quiz.questions.length} Questions
//                       </div>
//                     </div>
//                   </div>
//                 </Col>

//                 <Col md={2} className="d-flex justify-content-end">
//                   <Dropdown>
//                     <Dropdown.Toggle variant="light" size="sm" className="border-0">
//                       ⋮
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       <Dropdown.Item onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`)}>
//                         Edit
//                       </Dropdown.Item>

//                       <Dropdown.Item onClick={() => handleDelete(quiz._id)}>
//                         Delete
//                       </Dropdown.Item>
//                       <Dropdown.Item onClick={() => togglePublish(quiz)}>
//                         {quiz.isPublished ? "Unpublish" : "Publish"}
//                       </Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </Col>
//               </Row>
//             </ListGroup.Item>
//           ))}
//         </ListGroup>
//       )}
//     </Container>
//   );
// }


import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setQuizzes } from "./quizReducer";
import {
  Container,
  Button,
  ListGroup,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import { fetchQuizzesForCourse, createQuizForCourse } from "./quizClient";

export default function QuizList() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const courseQuizzes = quizzes.filter((q: any) => q.course === cid);

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
      dueDate: "",
      availableDate: "",
      untilDate: "",
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
    const available = new Date(quiz.availableDate);
    const until = new Date(quiz.untilDate);
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

  const handleDelete = (id: string) => {
    dispatch(setQuizzes(courseQuizzes.filter((q: any) => q._id !== id)));
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Assignment Quizzes</h5>
        <Button variant="danger" onClick={handleAddQuiz}>+ Quiz</Button>
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
                        onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`)}
                        className="fw-bold text-dark text-decoration-none"
                      >
                        {quiz.title}
                      </div>

                      <div className="text-muted small mt-1">
                        {getAvailability(quiz)} • Due {new Date(quiz.dueDate).toLocaleDateString()} • {quiz.points} pts • {quiz.questions.length} Questions
                      </div>
                    </div>
                  </div>
                </Col>

                <Col md={2} className="d-flex justify-content-end">
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
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}
