// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface EnrollmentState {
//   enrolledCourses: string[];
// }

// const initialState: EnrollmentState = {
//   enrolledCourses: ["RS108", "RS102", "RS101"], // Default courses
// };

// const enrollmentsSlice = createSlice({
//   name: "enrollments",
//   initialState,
//   reducers: {
//     enrollCourse: (state, action: PayloadAction<string>) => {
//       if (!state.enrolledCourses.includes(action.payload)) {
//         state.enrolledCourses.push(action.payload);
//       }
//     },
//     unenrollCourse: (state, action: PayloadAction<string>) => {
//       state.enrolledCourses = state.enrolledCourses.filter(
//         (courseId) => courseId !== action.payload
//       );
//     },
//     setEnrollments: (state, action: PayloadAction<string[]>) => {
//       state.enrolledCourses = action.payload;
//     },
//   },
// });

// export const { enrollCourse, unenrollCourse, setEnrollments } = enrollmentsSlice.actions;
// export default enrollmentsSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState: { courses: any[]; enrollments: any[] } = {
  courses: [],
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setCourses: (state, { payload: { courses } }) => {
      state.courses = courses;
    },
    setEnrollments: (state, { payload: { enrollments } }) => {
      console.log("printing enrollments in reducer");
      console.log(enrollments);
      state.enrollments = enrollments;
    },
    enroll: (state, { payload: { userId, courseId } }) => {
      // Add a new enrollment entry
      const newEnrollment = {
        _id: uuidv4(),
        user: userId,
        course: courseId,
      };
      state.enrollments.push(newEnrollment);
    },
    unenroll: (state, { payload: { userId, courseId } }) => {
      // Remove the enrollment entry for the user and course
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(enrollment.user === userId && enrollment.course === courseId)
      );
    },
  },
});

export const { enroll, unenroll, setCourses, setEnrollments } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;