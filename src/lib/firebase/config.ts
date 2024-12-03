import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAnalytics, logEvent, type Analytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
interface ImportMetaEnv {
  readonly NEXT_PUBLIC_FIREBASE_API_KEY: string;
  readonly NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
  readonly NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
  readonly NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
  readonly NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly NEXT_PUBLIC_FIREBASE_APP_ID: string;
}
declare global {
  interface ImportMeta extends ImportMetaEnv {}
}

// Analytics Event Types
type EventParams = {
  [key: string]: string | number | boolean;
};
console.log("import.meta.env", import.meta.env.NEXT_PUBLIC_FIREBASE_API_KEY);
console.log("Env Mode:", import.meta.env.MODE);
console.log("Project ID:", import.meta.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);

export const firebaseConfig = {
  apiKey: import.meta.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Analytics with null check for SSR
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export const analyticsUtils = {
  // Log a custom event
  logCustomEvent: (eventName: string, eventParams?: EventParams) => {
    if (analytics && typeof window !== "undefined") {
      logEvent(analytics, eventName, eventParams);
    }
  },

  // Log page view
  logPageView: (pagePath: string, pageTitle: string) => {
    if (analytics && typeof window !== "undefined") {
      logEvent(analytics, "page_view", {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  },

  // Log user sign in
  logUserSignIn: (method: string) => {
    if (analytics && typeof window !== "undefined") {
      logEvent(analytics, "login", {
        method: method,
      });
    }
  },
};

export const signInWithGoogle = async () => {
  try {
    console.log("Attempting Google Sign-In...");
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in:", result.user);
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

export const logout = () => {
  return signOut(auth);
};
const functions = getFunctions(app);

const refreshToken = async () => {
  if (auth.currentUser) {
    await auth.currentUser.getIdToken(true); // Force token refresh
    console.log("Token refreshed with new claims");
  }
};
export async function exportCollection(collectionName: string) {
  console.log("Starting export for collection:", collectionName);
  try {
    const functionUrl = `https://us-central1-${firebaseConfig.projectId}.cloudfunctions.net/exportFirestoreToCSV`;
    console.log("Using function URL:", functionUrl);

    const response = await fetch(`${functionUrl}?collection=${collectionName}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      throw new Error(
        `Export failed with status: ${response.status}. ${errorText}`,
      );
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${collectionName}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    console.log("Export completed successfully");
  } catch (error) {
    console.error("Export failed:", error);
    throw error; // Re-throw to allow caller to handle the error
  }
}

export const setAdminRole = httpsCallable(functions, "setAdminRole");
