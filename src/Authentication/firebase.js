// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC89HJMoVpOXWNNp1KQmPgVvEHlUJc_gNk",
    authDomain: "barberappointment-960be.firebaseapp.com",
    databaseURL: "https://barberappointment-960be-default-rtdb.firebaseio.com",
    projectId: "barberappointment-960be",
    storageBucket: "barberappointment-960be.appspot.com",
    messagingSenderId: "362103582990",
    appId: "1:362103582990:web:6c579c236343c9a62aa75f",
    measurementId: "G-NLJJLS6EL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getDatabase(app)



export { app, auth, db };