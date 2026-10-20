import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLKwvsfsx0fcLk4D_OmGvOvITvFVrL-zc",
  authDomain: "testdangnhap-350b1.firebaseapp.com",
  projectId: "testdangnhap-350b1",
  storageBucket: "testdangnhap-350b1.firebasestorage.app",
  messagingSenderId: "1047881178898",
  appId: "1:1047881178898:web:c67ae6a956a7842aee9dcb",
  measurementId: "G-BKPHM6H0NL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();