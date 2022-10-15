// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6Fp-WRN3NtN7c8sL2FirARNXIgq0PXz0",
    authDomain: "adidas-shop-5101d.firebaseapp.com",
    projectId: "adidas-shop-5101d",
    storageBucket: "adidas-shop-5101d.appspot.com",
    messagingSenderId: "763101343478",
    appId: "1:763101343478:web:4c636b66be540b1dcf86d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;