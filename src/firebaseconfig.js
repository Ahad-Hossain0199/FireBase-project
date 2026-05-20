// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCInwxOLg-TDUciDwfkSLQrexyo4vATDEI",
  authDomain: "todo-app-65bb0.firebaseapp.com",
  projectId: "todo-app-65bb0",
  storageBucket: "todo-app-65bb0.firebasestorage.app",
  messagingSenderId: "200032047817",
  appId: "1:200032047817:web:5a4bbeb2bd8616e788b318",
  measurementId: "G-2BV83CF2HR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig