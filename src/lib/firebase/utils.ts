import { db } from "./config";
import { collection, addDoc } from "firebase/firestore";

// export type ResultsType = {
//   q1: number;
//   q2: number;
//   q3: number;
//   q4: number;
// };

export type ResultsType = {
  r1: number;
  r2: number;
};

export interface QuizTypes {
  postCode: string;
  createdAt: any;
  results: ResultsType;
}
export const saveQuizResult = async (data: QuizTypes) => {
  try {
    const docRef = await addDoc(collection(db, "submissions"), data);
    return docRef.id;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw error;
  }
};
