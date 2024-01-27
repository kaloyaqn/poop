import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDQLQ4pd8HG9YXGAkDZKrUqCxugnrVHAuA",
    authDomain: "poop-b81c6.firebaseapp.com",
    projectId: "poop-b81c6",
    storageBucket: "poop-b81c6.appspot.com",
    messagingSenderId: "155587586343",
    appId: "1:155587586343:web:c05ce061bf307bfc0e2102",
    measurementId: "G-TXZFQP45Q7"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
export const messaging = getMessaging(firebaseApp);