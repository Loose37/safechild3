import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBrBg457P_Yqxsk35v9dSQRv5HGtAHLQU8",
  authDomain: "safechild-92ef7.firebaseapp.com",
  projectId: "safechild-92ef7",
  storageBucket: "safechild-92ef7.appspot.com",
  messagingSenderId: "533823021156",
  appId: "1:533823021156:web:2788f1a3ca579eb8e83f71",
  measurementId: "G-XV60BP32MQ"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export const auth = getAuth(app);

