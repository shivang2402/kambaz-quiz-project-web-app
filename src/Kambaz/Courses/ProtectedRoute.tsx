import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function CourseProtectedRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { cid } = useParams();

  console.log(
    currentUser &&
      currentUser.role === "STUDENT" &&
      enrollments.some(
        (enrollment: any) =>
          enrollment.course === cid && enrollment.user === currentUser._id
      )
  );

  if (
    currentUser &&
    (currentUser.role == "FACULTY" ||
      (currentUser.role === "STUDENT" &&
        enrollments.some(
          (enrollment: any) =>
            enrollment.course === cid && enrollment.user === currentUser._id
        )))
  ) {
    return children;
  } else {
    return <Navigate to="/Kambaz/Dashboard" />;
  }
}