
import { ListGroup } from "react-bootstrap";
import { Link, useParams, useLocation } from "react-router-dom";

export default function CourseNavigation() {
  const { cid } = useParams(); // Retrieve course ID from the URL
  const location = useLocation(); // Get current pathname

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <ListGroup id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const path = `/Kambaz/Courses/${cid}/${link}`;
        const isActive = location.pathname === path;

        return (
          <ListGroup.Item key={link} className={`p-0 border-0 ${isActive ? "active" : ""}`}>
            <Link
              to={path}
              id={`wd-course-${link.toLowerCase()}-link`}
              className={`btn btn-link w-100 text-start list-group-item border-0 ${isActive ? "text-black" : "text-danger"}`}
            >
              {link}
            </Link>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
