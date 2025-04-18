export interface Course {
  enrolled: any;
  name: string | number | string[] | undefined;
  number: string | number | string[] | undefined;
  startDate: string | number | string[] | undefined;
  endDate: string | number | string[] | undefined;
  image: string | number | string[] | undefined;
  _id: string;
  title: string;
  description: string;
  instructor: string;
}

export const ADD_COURSE = "ADD_COURSE";
export const DELETE_COURSE = "DELETE_COURSE";
export const UPDATE_COURSE = "UPDATE_COURSE";
export const SET_COURSES = "SET_COURSES";

export interface AddCourseAction {
  type: typeof ADD_COURSE;
  payload: Course;
}

export interface DeleteCourseAction {
  type: typeof DELETE_COURSE;
  payload: string;
}

export interface UpdateCourseAction {
  type: typeof UPDATE_COURSE;
  payload: Course;
}

export interface SetCoursesAction {
  type: typeof SET_COURSES;
  payload: Course[];
}

type CourseActionTypes =
  | AddCourseAction
  | DeleteCourseAction
  | UpdateCourseAction
  | SetCoursesAction;

export default CourseActionTypes;
