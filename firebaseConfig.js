
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDXpLHnVuYGGjNBizwSm20Pi95a_StxNIE",
  authDomain: "tasty-dog.firebaseapp.com",
  projectId: "tasty-dog",
  storageBucket: "tasty-dog.appspot.com",
  messagingSenderId: "1086376724882",
  appId: "1:1086376724882:web:5a7cacd9645c8609c4594b" 
};
   
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider,  messaging, getToken, onMessage };
