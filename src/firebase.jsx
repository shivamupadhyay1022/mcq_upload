// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBic7Ky1Znd3RMIh0XLLGG1BgXUiOwKOBA",
  authDomain: "sci-mcq.firebaseapp.com",
  databaseURL: "https://sci-mcq-default-rtdb.firebaseio.com",
  projectId: "sci-mcq",
  storageBucket: "sci-mcq.appspot.com",
  messagingSenderId: "208145204531",
  appId: "1:208145204531:web:a9286fd532dad7f9f96a46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);

export default app;