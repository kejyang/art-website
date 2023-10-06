// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



const firebaseConfig = initializeApp ({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "art-hoster.firebaseapp.com",
    projectId: "art-hoster",
    storageBucket: "art-hoster.appspot.com",
    messagingSenderId: "696548861778",
    appId: "1:696548861778:web:b5154a80b173485209fc8b"
});


const firebase = getStorage(firebaseConfig);
export default firebase;