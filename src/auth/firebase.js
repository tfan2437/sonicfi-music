import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "streamfi-music.firebaseapp.com",
  projectId: "streamfi-music",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Authentication Function
const signUp = async (name, email, password) => {
  try {
    const respose = await createUserWithEmailAndPassword(auth, email, password);
    const user = respose.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name,
      email: email,
      authProvider: "Email",
      profileImage:
        "https://live.staticflickr.com/65535/53818372241_08c548fb4b_s.jpg",
    });

    console.log("Signed up successfully! User: " + user.displayName);
  } catch (error) {
    console.error("Error during Sign Up:", error.message);
    console.error("Error code:", error.code);
    alert(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    const respose = await signInWithEmailAndPassword(auth, email, password);
    const user = respose.user;
    console.log("Login successfully! User: " + user.displayName);
  } catch (error) {
    console.error("Error during Sign Up:", error.message);
    console.error("Error code:", error.code);
    alert(error.code.split("/")[1].split("-").join(" "));
  }
};

const loginWithGoogle = async () => {
  try {
    const respose = await signInWithPopup(auth, provider);
    const user = respose.user;

    const userDoc = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      await setDoc(userDoc, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        authProvider: "Google",
        profileImage: user.photoURL,
      });
    }
    console.log("Google login successfully! User: " + user.displayName);
  } catch (error) {
    console.error("Error during Sign Up:", error.message);
    console.error("Error code:", error.code);
    alert(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signUp, login, loginWithGoogle, logout };
