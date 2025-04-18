import { createAction } from "@reduxjs/toolkit";

export const enrollCourse = createAction<string>("enrollments/enrollCourse");
export const unenrollCourse = createAction<string>("enrollments/unenrollCourse");
export const setEnrollments = createAction<string[]>("enrollments/setEnrollments");
