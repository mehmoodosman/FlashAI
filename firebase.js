// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "process.env.NEXT_PUBLIC_FIREBASE_API_KEY",
  authDomain: "flashai-6d741.firebaseapp.com",
  projectId: "flashai-6d741",
  storageBucket: "flashai-6d741.appspot.com",
  messagingSenderId: "1024379636445",
  appId: "1:1024379636445:web:cb19d110079b4aa412e934",
  measurementId: "G-KFY1949GYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}