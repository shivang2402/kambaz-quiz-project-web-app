
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Course } from "./Courses/types";
import { Link } from "react-router-dom";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrollCourse,
  unenrollCourse,
}: any) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  console.log("hello print faculty", isFaculty);
  

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* New/Edit Course Form - Faculty only */}
      {isFaculty && (
        <>
          <h5>
            {!course._id ? "New Course" : "Edit Course"}
            <Button
              className="btn btn-primary float-end btn-sm"
              onClick={() => {
                addNewCourse();
                setTimeout(() => {
                  const courseIds = courses.map((c: Course) => c._id);
                  console.log("Course IDs after add:", courseIds);
                }, 100);
              }}
            >
              Add
            </Button>
            <Button
              className="btn btn-warning float-end me-2 btn-sm"
              onClick={updateCourse}
            >
              Update
            </Button>
          </h5>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                value={course.name}
                onChange={(e) => setCourse({ ...course, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Course Number</Form.Label>
              <Form.Control
                type="text"
                value={course.number}
                onChange={(e) =>
                  setCourse({ ...course, number: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={course.startDate}
                onChange={(e) =>
                  setCourse({ ...course, startDate: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={course.endDate}
                onChange={(e) =>
                  setCourse({ ...course, endDate: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={course.image}
                onChange={(e) =>
                  setCourse({ ...course, image: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={course.description}
                onChange={(e) =>
                  setCourse({ ...course, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
          <hr />
        </>
      )}

      {/* Enrolled Courses */}
      <h2 id="wd-dashboard-published">My Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: Course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    src={"/images/reactjs.jpg"}
                    variant="top"
                    width="100%"
                    height={160}
                  />

                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </Card.Text>
                  </Card.Body>
                </Link>

                {/* Student Controls: Enroll / Unenroll */}
                {currentUser?.role === "STUDENT" && (
                  <div className="p-2">
                    {course.enrolled ? (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => unenrollCourse(course._id)}
                      >
                        Unenroll
                      </Button>
                    ) : (
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => enrollCourse(course._id)}
                      >
                        Enroll
                      </Button>
                    )}
                  </div>
                )}

                {/* Faculty Controls: Edit and Delete */}
                {isFaculty && (
                  <div className="mt-2 p-2">
                    <Button
                      variant="warning"
                      className="me-2 float-end btn-sm"
                      onClick={() => setCourse(course)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="float-end btn-sm"
                      onClick={() => {
                        console.log("Clicked delete for course ID:", course._id);
                        deleteCourse(course._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
