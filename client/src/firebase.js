// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-blog-da10a.firebaseapp.com",
  projectId: "my-blog-da10a",
  storageBucket: "my-blog-da10a.appspot.com",
  messagingSenderId: "777482756220",
  appId: "1:777482756220:web:0fdb479252224dbd6569f9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);