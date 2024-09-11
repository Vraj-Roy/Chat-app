// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5lkBTFgnYUqGFK7XfuaOJ7N06ZUV9pf8",
  authDomain: "chat-app-40030.firebaseapp.com",
  projectId: "chat-app-40030",
  storageBucket: "chat-app-40030.appspot.com",
  messagingSenderId: "227871776843",
  appId: "1:227871776843:web:35fd52dec144c0513f6dce",
  measurementId: "G-WKJYWGE8ZG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
