import axios from "axios";
import { Quiz } from "./quizReducer";

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/quizzes`;

export const createQuizForCourse = async (courseId: string, quiz: Quiz) => {
  const response = await axios.post(`${QUIZZES_API}/course/${courseId}`, quiz);
  return response.data;
};

export const updateQuizOnServer = async (quiz: Quiz) => {
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};

export const deleteQuizFromServer = async (quizId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const fetchQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${QUIZZES_API}/course/${courseId}`);
  return response.data;
};
