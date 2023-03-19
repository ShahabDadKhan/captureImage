// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcRXzdB8qA9yPnjLb-hXUlhpeBLvQSVZY",
  authDomain: "capture-image-7c416.firebaseapp.com",
  projectId: "capture-image-7c416",
  storageBucket: "capture-image-7c416.appspot.com",
  messagingSenderId: "343294959119",
  appId: "1:343294959119:web:429b9907cf406199300d7a",
  measurementId: "G-SJMTF8M2SF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
