// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Configuration Settings
const firebaseConfig = {
  apiKey: "AIzaSyDNFKCHarvxooKst-itSgaj7k8VZWzkGIg",
  authDomain: "fixr-27c95.firebaseapp.com",
  projectId: "fixr-27c95",
  storageBucket: "fixr-27c95.appspot.com",
  messagingSenderId: "1060875381804",
  appId: "1:1060875381804:web:2bc5013993199aaf793589",
  measurementId: "G-EM3MQ6DFW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
