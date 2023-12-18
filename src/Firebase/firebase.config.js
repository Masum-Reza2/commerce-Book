import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD3R5mqW8Dp9ahXUHuzZ8gR-lcNEwiEo3E",
    authDomain: "commerce-book.firebaseapp.com",
    projectId: "commerce-book",
    storageBucket: "commerce-book.appspot.com",
    messagingSenderId: "311030196048",
    appId: "1:311030196048:web:03d2d767e44ecfb054ae55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;