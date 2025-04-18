
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import KambazNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Account from "./Account";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";

import * as userClient from "./Account/client"; 

import * as courseClient from "./Courses/client";
import { useDispatch} from "react-redux";


import { enroll, setEnrollments, unenroll } from "./Enrollments/reducer";
import * as enrollmentClient from "./Enrollments/client";



export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]); // ⬅️ start empty
  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();



  const fetchEnrollments = async () => {
    try {
      const enrolledCourses = await userClient.findMyCourses();
      console.log("printing enrollments from find my courses");
      console.log(enrolledCourses);
      console.log("printing current user");
      console.log(currentUser);
      const en = enrolledCourses.map((c: any) => ({
        _id: c._id,
        user: currentUser._id,
        course: c._id,
      }));
      console.log("before setting enrollments");
      console.log(en);
      dispatch(setEnrollments({ enrollments: en }));
    } catch (e) {
      console.error(e);
    }
  };


  // const fetchCourses = async () => {
  //   try {
  //     const courses = await userClient.findMyCourses();
  //     setCourses(courses);
  //   } catch (error) {
  //     console.error("Failed to fetch courses:", error);
  //   }
  // };

  const fetchCourses = async () => {
    try {
      // const allCourses = await userClient.findAllCourses();
      const allCourses = await courseClient.fetchAllCourses();
  
      // Get enrollments from userClient (enrolled courses)
      const enrolledCourses = await userClient.findMyCourses(); // same API for now
  
      const enrolledCourseIds = new Set(enrolledCourses.map((c: any) => c._id));
  
      const updatedCourses = allCourses.map((c: any) => ({
        ...c,
        enrolled: enrolledCourseIds.has(c._id),
      }));
  
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };
  

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);


  // const addNewCourse = () => {
  //   setCourses([...courses, { ...course, _id: uuidv4() }]);
  // };

  const addNewCourse = async () => {
    try {
      const newCourse = await userClient.createCourse(course);
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };


  // const deleteCourse = (courseId: any) => {
  //   setCourses(courses.filter((course) => course._id !== courseId));
  // };



  const deleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };


  const updateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      setCourses(
        courses.map((c) => (c._id === course._id ? course : c))
      );
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  
  // const enrollCourse = async (courseId: string) => {
  //   await enrollmentClient.enrollUser(courseId);
  //   dispatch(
  //     enroll({
  //       courseId,
  //       userId: currentUser._id,
  //     })
  //   );
  // };

  const enrollCourse = async (courseId: string) => {
    try {
      await enrollmentClient.enrollUser(courseId);
      dispatch(
        enroll({
          courseId,
          userId: currentUser._id,
        })
      );
      await fetchCourses();        
      await fetchEnrollments();    
    } catch (error: any) {
      if (error.response?.status === 400) {
        console.warn("User is already enrolled in this course.");
      } else {
        console.error("Failed to enroll:", error);
      }
    }
  };
  
  

  const unenrollCourse = async (courseId: string) => {
    try {
      await enrollmentClient.unenrollUser(courseId);
      dispatch(
        unenroll({
          courseId,
          userId: currentUser._id,
        })
      );
      await fetchCourses();        // ✅ refresh UI
      await fetchEnrollments();    // ✅ update enrollment state
    } catch (error) {
      console.error("Failed to unenroll:", error);
    }
  };
  

  // useEffect(() => {
  //   fetchCourses();
  //   console.log("printing enrollments");
  //   // console.log(enrollments);
  //   if (currentUser) fetchEnrollments();
  // }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
      fetchEnrollments();
    }
  }, [currentUser]);
  


  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  {React.createElement(Dashboard as React.ElementType, {
                    courses,
                    course,
                    setCourse,
                    addNewCourse,
                    deleteCourse,
                    updateCourse,
                    enrollCourse,
                    unenrollCourse
                  })}
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  {React.createElement(Courses as React.ElementType, {
                    courses,
                  })}
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
