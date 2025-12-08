// Firebase Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsn4S60-DpjnRzW7em-rMIeGLdJNbP1yU",
  authDomain: "webcreator-voltnexis.firebaseapp.com",
  projectId: "webcreator-voltnexis",
  storageBucket: "webcreator-voltnexis.firebasestorage.app",
  messagingSenderId: "206204303418",
  appId: "1:206204303418:web:761134239430b947bc5d03",
  measurementId: "G-0NZHV1YCY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;