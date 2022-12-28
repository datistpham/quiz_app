// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsImGL6fuQb715w69ZlSVEkZag07sLu8Y",
  authDomain: "quiz-20730.firebaseapp.com",
  projectId: "quiz-20730",
  storageBucket: "quiz-20730.appspot.com",
  messagingSenderId: "402820908137",
  appId: "1:402820908137:web:890833413103e61f6c0ef8",
  measurementId: "G-D4K2ZRYZ0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app