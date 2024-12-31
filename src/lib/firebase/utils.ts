import { db } from "./config";
import { collection, addDoc } from "firebase/firestore";

export type ResultsType = {
  r1: number;
  r2: number;
};

export type AnswerType = "yes" | "no" | null;

export interface QuizTypes {
  postCode: string;
  createdAt: any;
  results: ResultsType;
  answers: {
    q1: AnswerType;
    q2: AnswerType;
    q3: AnswerType;
    q4: AnswerType;
    q5: AnswerType;
  };
}
export const saveQuizResult = async (data: QuizTypes) => {
  console.log({ db, data });
  try {
    const docRef = await addDoc(collection(db, "submissions"), data);
    console.log({ docRef });
    return docRef.id;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw error;
  }
};
