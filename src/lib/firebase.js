// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQLQ4pd8HG9YXGAkDZKrUqCxugnrVHAuA",
  authDomain: "poop-b81c6.firebaseapp.com",
  projectId: "poop-b81c6",
  storageBucket: "poop-b81c6.appspot.com",
  messagingSenderId: "155587586343",
  appId: "1:155587586343:web:c05ce061bf307bfc0e2102",
  measurementId: "G-TXZFQP45Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);