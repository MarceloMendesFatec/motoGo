// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-BZ2vvf5cQplIPEePG5WY_ecmEnSV2v4",
  authDomain: "motogo-45326.firebaseapp.com",
  projectId: "motogo-45326",
  storageBucket: "motogo-45326.appspot.com",
  messagingSenderId: "969277726363",
  appId: "1:969277726363:web:c0997583905df19554703e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




export default db;
