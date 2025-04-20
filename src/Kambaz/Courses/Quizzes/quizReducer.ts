import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of a question
export interface QuizQuestion {
  _id: string;
  type: "mcq" | "tf" | "fib";
  title: string;
  points: number;
  question: string;
  choices?: { answer: string; isCorrect: boolean }[]; // For MCQ
  answer?: boolean; // For True/False
  possibleAnswers?: string[]; // For Fill in the Blank
}

export interface Quiz {
  _id: string;
  course: string;
  title: string;
  description: string;
  quizType: "Graded Quiz" | "Practice Quiz" | "Graded Survey" | "Ungraded Survey";
  assignmentGroup: "Quizzes" | "Exams" | "Assignments" | "Project";
  settings: {
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: {
      enabled: boolean;
      attemptsAllowed: number;
    };
    showCorrectAnswers: {
      enabled: boolean;
      timing?: string | null;
    };
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
  };
  dates: {
    due: string;
    available: string;
    until: string;
  };
  questions: QuizQuestion[];
  isPublished: boolean;
  points: number;
}

interface QuizState {
  quizzes: Quiz[];
}

const initialState: QuizState = {
  quizzes: [],
};

const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload);
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      const index = state.quizzes.findIndex((q) => q._id === action.payload._id);
      if (index !== -1) {
        state.quizzes[index] = action.payload;
      }
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
    },
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
  },
});

export const { addQuiz, updateQuiz, deleteQuiz, setQuizzes } = quizSlice.actions;
export default quizSlice.reducer;
