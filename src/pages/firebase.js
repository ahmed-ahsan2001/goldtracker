// src/pages/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAMY7kV2pDpruIAyofHhkalpy5NSyAVlYo",
  authDomain: "goldsilver-b2521.firebaseapp.com",
  projectId: "goldsilver-b2521",
  storageBucket: "goldsilver-b2521.firebasestorage.app",
  messagingSenderId: "1024933424765",
  appId: "1:1024933424765:web:47f0e72281c53e300a0b14",
  measurementId: "G-G3VMQJRC82",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser (to prevent SSR errors)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics };
