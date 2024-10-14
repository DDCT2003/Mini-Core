import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL3cdgWJlt_3uswIgIwrsgxXxZDwFL-DE",
  authDomain: "mini-core-7ebe2.firebaseapp.com",
  projectId: "mini-core-7ebe2",
  storageBucket: "mini-core-7ebe2.appspot.com",
  messagingSenderId: "979946081556",
  appId: "1:979946081556:web:e5c379bc9df9fb49fc4601"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
