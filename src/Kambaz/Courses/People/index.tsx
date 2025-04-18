// import { useParams } from "react-router-dom";
// import { Table } from "react-bootstrap";
// import { FaUserCircle } from "react-icons/fa";
// import * as db from "../../Database"; // Import users and enrollments

// export default function PeopleTable() {
//     const { cid } = useParams(); // Get course ID from URL
//     const { users, enrollments } = db; // Load data

//     // Filter users based on enrollments
//     const enrolledUsers = users.filter((usr) =>
//         enrollments.some(
//             (enrollment) => enrollment.user === usr._id && enrollment.course === cid
//         )
//     );

//     return (
//         <div
//             id="wd-people-table"
//             style={{
//                 fontSize: "1.5rem",
//                 marginLeft: "1.5rem",
//                 marginRight: "1.5rem",
//             }}
//         >
//             <Table striped className="table-sm" style={{ margin: "0" }}>
//                 <thead>
//                     <tr>
//                         <th style={{ padding: "0.5rem" }}>Name</th>
//                         <th style={{ padding: "0.5rem" }}>Login ID</th>
//                         <th style={{ padding: "0.5rem" }}>Section</th>
//                         <th style={{ padding: "0.5rem" }}>Role</th>
//                         <th style={{ padding: "0.5rem" }}>Last Activity</th>
//                         <th style={{ padding: "0.5rem" }}>Total Activity</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {enrolledUsers.length > 0 ? (
//                         enrolledUsers.map((user) => (
//                             <tr key={user._id}>
//                                 <td className="wd-full-name text-nowrap" style={{ padding: "0.5rem" }}>
//                                     <FaUserCircle
//                                         className="me-2 text-secondary"
//                                         style={{ fontSize: "1.0rem" }}
//                                     />
//                                     <span className="wd-first-name">{user.firstName}</span>{" "}
//                                     <span className="wd-last-name">{user.lastName}</span>
//                                 </td>
//                                 <td style={{ padding: "0.5rem" }}>{user.loginId}</td>
//                                 <td style={{ padding: "0.5rem" }}>{user.section}</td>
//                                 <td style={{ padding: "0.5rem" }}>{user.role}</td>
//                                 <td style={{ padding: "0.5rem" }}>{user.lastActivity}</td>
//                                 <td style={{ padding: "0.5rem" }}>{user.totalActivity}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
//                                 No users enrolled in this course.
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </Table>
//         </div>
//     );
// }



import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import PeopleDetails from "./Details";

export default function PeopleTable({ users = [] }: { users?: any[] }) {
  return (
    <div
      id="wd-people-table"
      style={{
        fontSize: "1.5rem",
        marginLeft: "1.5rem",
        marginRight: "1.5rem",
      }}
    >
      <PeopleDetails />

      <Table striped className="table-sm" style={{ margin: "0" }}>
        <thead>
          <tr>
            <th style={{ padding: "0.5rem" }}>Name</th>
            <th style={{ padding: "0.5rem" }}>Login ID</th>
            <th style={{ padding: "0.5rem" }}>Section</th>
            <th style={{ padding: "0.5rem" }}>Role</th>
            <th style={{ padding: "0.5rem" }}>Last Activity</th>
            <th style={{ padding: "0.5rem" }}>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap" style={{ padding: "0.5rem" }}>
                  <Link
                    to={`/Kambaz/Account/Users/${user._id}`}
                    className="text-decoration-none"
                  >
                    <FaUserCircle
                      className="me-2 text-secondary"
                      style={{ fontSize: "1.0rem" }}
                    />
                    <span className="wd-first-name">{user.firstName}</span>{" "}
                    <span className="wd-last-name">{user.lastName}</span>
                  </Link>
                </td>
                <td style={{ padding: "0.5rem" }}>{user.loginId}</td>
                <td style={{ padding: "0.5rem" }}>{user.section}</td>
                <td style={{ padding: "0.5rem" }}>{user.role}</td>
                <td style={{ padding: "0.5rem" }}>{user.lastActivity}</td>
                <td style={{ padding: "0.5rem" }}>{user.totalActivity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
                No users to display.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
