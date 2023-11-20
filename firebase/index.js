import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBksxbUeVGEmghg74n33mjtzl_0JJrwpCo",
    authDomain: "superg-6abfb.firebaseapp.com",
    projectId: "superg-6abfb",
    storageBucket: "superg-6abfb.appspot.com",
    messagingSenderId: "898160022906",
    appId: "1:898160022906:web:a5ffbbb1e19ebae47cf2c3",
    measurementId: "G-4CJM9JLRF5",
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = 'it';