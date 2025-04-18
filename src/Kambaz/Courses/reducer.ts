import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "./types";

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: [
    {
      _id: "RS101",
      name: "Rocket Propulsion",
      number: "RS4550",
      startDate: "2023-01-10",
      endDate: "2023-05-15",
      description: "This course provides an in-depth study of the fundamentals of rocket propulsion, covering topics such as propulsion theory, engine types, fuel chemistry, and the practical applications of rocket technology. Designed for students with a strong background in physics and engineering, the course includes both theoretical instruction and hands-on laboratory work.",
      image: "/images/reactjs.jpg",
      title: "Rocket Propulsion",
      instructor: "",
      enrolled: undefined
    },
    {
      _id: "RS102",
      name: "Aerodynamics",
      number: "RS4560",
      startDate: "2023-01-10",
      endDate: "2023-05-15",
      description:
        "This course offers a comprehensive exploration of aerodynamics, focusing on the principles and applications of airflow and its effects on flying objects. Topics include fluid dynamics, airfoil design, lift and drag forces, and the aerodynamic considerations in aircraft design. The course blends theoretical learning with practical applications, suitable for students pursuing a career in aeronautics or astronautics engineering.",
      image: "/images/reactjs.jpg",
      title: "Aerodynamics",
      instructor: "",
      enrolled: undefined

    },
    {
      _id: "RS103",
      name: "Spacecraft Design",
      number: "RS4570",
      startDate: "2023-01-10",
      endDate: "2023-05-15",
      description:
        "This course delves into the principles and practices of spacecraft design, offering students a detailed understanding of the engineering and technology behind spacecraft systems. Key topics include spacecraft structure, propulsion, power systems, thermal control, and payload integration. Emphasizing both theoretical concepts and practical skills, the course prepares students for careers in the space industry, with a focus on innovative design and problem-solving in the context of current and future space missions.",
      image: "/images/reactjs.jpg",
      title: "Spacecraft Design",
      instructor: "",
      enrolled: undefined

    },
    {
      _id: "RS104",
      name: "Organic Chemistry",
      number: "CH1230",
      startDate: "2023-01-10",
      endDate: "2023-05-15",
      description:
        "Organic Chemistry is an in-depth course that explores the structure, properties, composition, and reactions of organic compounds and materials. The course covers various topics including hydrocarbons, functional groups, stereochemistry, and organic synthesis techniques.",
      image: "/images/reactjs.jpg",
      title: "Organic Chemistry",
      instructor: "",
      enrolled: undefined

    },
    {
      _id: "RS105",
      name: "Inorganic Chemistry",
      number: "CH1240",
      startDate: "2023-01-10",
      endDate: "2023-05-15",
      description:
        "Inorganic Chemistry focuses on the properties, structures, and behaviors of inorganic and organometallic compounds. This course covers a range of topics including coordination chemistry, metal complexes, bonding theories, symmetry, and crystal field theory.",
      image: "/images/reactjs.jpg",
      title: "Inorganic Chemistry",
      instructor: "",
      enrolled: undefined

    },
    {
      _id: "RS106",
      name: "Physical Chemistry",
      number: "CH1250",
      startDate: "2023-01-10",
      endDate: "2023-05-15",
      description:
        "Physical Chemistry merges the principles of physics and chemistry to understand the physical properties of molecules, the forces that act upon them, and the chemical reactions they undergo.",
      image: "/images/reactjs.jpg",
      title: "Physical Chemistry",
      instructor: "",
      enrolled: undefined

    },
    {
      _id: "RS107",
      name: "Ancient Languages and Scripts of Middle-earth",
      number: "ME101",
      startDate: "2023-01-10",
      endDate: "2023-05-15",
      description:
        "This course offers an exploration of the ancient languages and scripts found throughout Middle-earth, including Elvish (Sindarin and Quenya), Dwarvish (Khuzdul), and the Black Speech of Mordor.",
      image: "/images/reactjs.jpg",
      title: "Ancient Languages and Scripts of Middle-earth",
      instructor: "",
      enrolled: undefined

    },
    {
      _id: "RS108",
      name: "Wizards, Elves, and Men: Inter-species Diplomacy in Middle-earth",
      number: "ME102",
      startDate: "2023-01-10",
      endDate: "2023-05-15",
      description:
        "This course explores the complex relationships and diplomatic interactions among the different races of Middle-earth: Elves, Men, Dwarves, and Wizards.",
      image: "/images/reactjs.jpg",
      title: "Wizards, Elves, and Men: Inter-species Diplomacy in Middle-earth",
      instructor: "",
      enrolled: undefined

    },
  ],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter((course) => course._id !== action.payload);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      const index = state.courses.findIndex((course) => course._id === action.payload._id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
  },
});

export const { addCourse, deleteCourse, updateCourse, setCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
