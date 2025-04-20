import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { useSelector } from "react-redux";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
// import Quizzes from "./Quizzes";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/index";
import QuizDetails from "./Quizzes/Details";
import QuizList from "./Quizzes"; // index.tsx
import QuizEditor from "./Quizzes/Editor"; // Editor.tsx
import QuizPreview from "./Quizzes/Preview";
import QuizTake from "./Quizzes/Take";


export default function Courses() {
  const { cid } = useParams();
  const courses = useSelector((state: any) => state.courseReducer.courses);
  const course = courses.find((course: { id: string | undefined; }) => course.id === cid);
  const { pathname } = useLocation();

  // // Redirect users who are not enrolled in the course
  // if (!course || !enrolledCourses.includes(cid)) {
  //   return <Navigate to="/Kambaz/Dashboard" replace />;
  // }

  // Extract the section name from the URL path
  const section = pathname.split("/")[4] || "Home";

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {section}
      </h2>

      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h2>Piazza</h2>} />
            <Route path="Zoom" element={<h2>Zoom</h2>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            {/* <Route path="Quizzes" element={<h2>Quizzes</h2>} /> */}
            <Route path="Quizzes" element={<QuizList />} />
            <Route path="Quizzes/:qid" element={<QuizDetails />} />
            <Route path="Quizzes/:qid/edit" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
            <Route path="Quizzes/:qid/take" element={<QuizTake />} />




            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}


