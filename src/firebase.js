// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoLrATTZ2gGg_nrz1aTnNFvEiPrf-1Wc4",
  authDomain: "disney-plus-react-app-447e0.firebaseapp.com",
  projectId: "disney-plus-react-app-447e0",
  storageBucket: "disney-plus-react-app-447e0.appspot.com",
  messagingSenderId: "970462323987",
  appId: "1:970462323987:web:30bde899c2987a7a93e6e6",
  measurementId: "G-ZWC23L1T1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;