import { Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router";
import { useRef, useState } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { createAssignmentForCourse } from "../client";
import { updateAssignment as updateAssignmentOnServer } from "./client";



export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editAssignment = async (assignment: any) => {
    const updatedAssignment = await updateAssignmentOnServer(assignment);
    dispatch(updateAssignment(updatedAssignment));
  };

  const createAssignment = async (assignment: any) => {
    if (cid) {
      const createdAssignment = await createAssignmentForCourse(
        cid,
        assignment
      );
      dispatch(addAssignment({ ...createdAssignment, course: cid }));
    }
  };

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const existingAssignment = assignments.find((a: any) => a._id === aid);
  const isEditingRef = useRef(!!existingAssignment);

  const [assignment, setAssignment] = useState<any>(
    existingAssignment || {
      _id: uuidv4(),
      title: "",
      description: "",
      points: 0,
      due_date: "",
      available_date: "",
      course: cid,
    }
  );

  const handleSaveClick = () => {
    if (
      typeof assignment.title !== "string" ||
      !assignment.title.trim() ||
      typeof assignment.due_date !== "string" ||
      !assignment.due_date.trim() ||
      assignment.points <= 0
    ) {
      alert("Please fill in all required fields!");
      return;
    }

    if (isEditingRef.current) {
      // dispatch(updateAssignment(assignment));
      editAssignment(assignment);

    } else {
      // dispatch(addAssignment(assignment));

      createAssignment(assignment);

    }

    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <Container id="wd-assignments-editor">
      <Form>
        <Form.Group controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={assignment.title}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          />
        </Form.Group>

        <br />
        <Form.Group controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={assignment.description}
            onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
            rows={4}
          />
        </Form.Group>

        <br />
        <Form.Group controlId="wd-points">
          <Row>
            <Col md={6} className="d-flex justify-content-end">
              <Form.Label>Points</Form.Label>
            </Col>
            <Col md={6}>
              <Form.Control
                type="number"
                value={assignment.points}
                onChange={(e) => setAssignment({ ...assignment, points: Number(e.target.value) })}
              />
            </Col>
          </Row>
        </Form.Group>

        <br />
        <Form.Group controlId="wd-due-date">
          <Row>
            <Col md={6} className="d-flex justify-content-end">
              <Form.Label>Due Date</Form.Label>
            </Col>
            <Col md={6}>
              <Form.Control
                type="date"
                value={assignment.due_date}
                onChange={(e) => setAssignment({ ...assignment, due_date: e.target.value })}
              />
            </Col>
          </Row>
        </Form.Group>

        <br />
        <Form.Group controlId="wd-available-from">
          <Row>
            <Col md={6} className="d-flex justify-content-end">
              <Form.Label>Available From</Form.Label>
            </Col>
            <Col md={6}>
              <Form.Control
                type="date"
                value={assignment.available_date}
                onChange={(e) => setAssignment({ ...assignment, available_date: e.target.value })}
              />
            </Col>
          </Row>
        </Form.Group>

        <br />
        <hr />

        <Container className="d-flex justify-content-end">
          <Link
            to={`/Kambaz/Courses/${cid}/Assignments`}
            className="btn btn-secondary text-dark me-2"
          >
            Cancel
          </Link>
          <button onClick={handleSaveClick} className="btn btn-danger text-white" type="button">
            Save
          </button>
        </Container>
      </Form>
    </Container>
  );
}
