
import { useDispatch, useSelector } from "react-redux";
import { BsGripVertical, BsSearch, BsTrash } from "react-icons/bs";
// import { deleteAssignment } from "./reducer";
import { ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import * as client from "./client.ts";
import { useEffect } from "react";


import * as courseClient from "../client.ts";



import { setAssignments,deleteAssignment  } from "./reducer";

type Assignment = {
  _id: string;
  title: string;
  course: string;
  available_date: string;
  due_date: string;
  points: number;
};

function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const { cid } = useParams<{ cid?: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent click from bubbling to parent
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this assignment?"
    );
    if (confirmDelete) {
      await client.deleteAssignment(assignment._id);
      dispatch(deleteAssignment(assignment._id));
    }
  };

  const handleNavigate = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`);
  };

  return (
    <ListGroup className="wd-assignment-list-item rounded-0">
      <ListGroup.Item
        className="wd-lesson p-3 ps-1 d-flex align-items-center"
        onClick={handleNavigate}
        style={{ cursor: "pointer" }}
      >
        <BsGripVertical className="me-2 fs-3" />
        <div className="assignment-details">
          <div className="assignment-title">{assignment.title}</div>
          <div className="assignment-meta">
            <span><b>Available</b> {assignment.available_date}</span> | 
            <b>Due</b> {assignment.due_date} | 
            <span>{assignment.points} pts</span>
          </div>
        </div>
        <div className="ms-auto d-flex align-items-center">
          <FaPencil />
          {currentUser.role === "FACULTY" && (
            <BsTrash
              className="ms-3 text-danger cursor-pointer"
              onClick={handleDelete}
              size={20}
            />
          )}
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
}


export default function Assignments() {
  const { cid } = useParams<{ cid?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const fetchAssignments = async () => {
    if (cid) {
      const assignments = await courseClient.findAssignmentsForCourse(cid);
      dispatch(setAssignments(assignments));
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);


  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-assignments">
      <div className="wd-search-container d-flex align-items-center mb-3">
        <div className="position-relative">
          <BsSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          <input type="text" className="form-control ps-5" placeholder="Search..." />
        </div>

        {currentUser.role === "FACULTY" && (
          <div className="ms-auto d-flex">
            <button className="btn btn-light border me-2 px-3 py-2">
              <span className="me-1">+</span> Group
            </button>

            <button
              onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}
              className="btn btn-danger text-white px-3 py-2"
            >
              <span className="me-1">+</span> Assignment
              </button>
              </div>
        )}
      </div>

      <ListGroup className="rounded-0" id="wd-assignment-list">
        {assignments
          ?.filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <AssignmentCard key={assignment._id} assignment={assignment} />
          ))}
      </ListGroup>
    </div>
  );
}
