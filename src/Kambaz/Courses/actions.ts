import { createAction } from "@reduxjs/toolkit";
import { Course } from "./types";

export const addCourse = createAction<Course>("courses/addCourse");
export const deleteCourse = createAction<string>("courses/deleteCourse");
export const updateCourse = createAction<Course>("courses/updateCourse");
export const setCourses = createAction<Course[]>("courses/setCourses");
