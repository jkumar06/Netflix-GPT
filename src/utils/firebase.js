// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl1xc7kV44AnF4oDai2LFS7iu6bsUSpxo",
  authDomain: "netflixgpt-277c7.firebaseapp.com",
  projectId: "netflixgpt-277c7",
  storageBucket: "netflixgpt-277c7.appspot.com",
  messagingSenderId: "477138844878",
  appId: "1:477138844878:web:534c0f25385ddf55c0649f",
  measurementId: "G-DSWCW2DZCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
