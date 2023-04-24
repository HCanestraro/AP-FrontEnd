// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJrGdGVvBltHa0a0R-NtNFhvyBqrBEHz4",
  authDomain: "ap-frontend-che.firebaseapp.com",
  projectId: "ap-frontend-che",
  storageBucket: "ap-frontend-che.appspot.com",
  messagingSenderId: "1075017258754",
  appId: "1:1075017258754:web:4f61b2507c57e70674941b",
  measurementId: "G-SVC62MW3KR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);