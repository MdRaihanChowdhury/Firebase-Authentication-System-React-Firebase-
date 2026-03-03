// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMIbjFbfQKixn2RODpBDanr-b3ydgQxuA",
  authDomain: "auth-project-258f7.firebaseapp.com",
  projectId: "auth-project-258f7",
  storageBucket: "auth-project-258f7.firebasestorage.app",
  messagingSenderId: "407828778233",
  appId: "1:407828778233:web:8d9081ac6d8cd5638ce628",
  measurementId: "G-FZHG1HXD5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export default app;