import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const enrollUser = async (courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/current/courses/${courseId}/enroll`
  );
  return response.data;
};

export const unenrollUser = async (courseId: string) => {
  console.log("HYUEH");
  
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/current/courses/${courseId}/unenroll`
  );
  return response.data;
};