// Firebase Auth & Database
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "streamfi.firebaseapp.com",
  projectId: "streamfi",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Authentication Function

const signup = async (name, email, password) => {
  try {
    const respose = await createUserWithEmailAndPassword(auth, email, password);
    const user = respose.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email: email,
      profileImage:
        "https://live.staticflickr.com/65535/53818372241_08c548fb4b_s.jpg",
    });
    console.log(user);
  } catch (error) {
    console.error(error);
    alert(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    const respose = await signInWithEmailAndPassword(auth, email, password);
    const user = respose.user;
    console.log(user);
  } catch (error) {
    console.error(error);
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
        authProvider: "google",
        email: user.email,
        profileImage: user.photoURL,
      });
    }

    console.log(user.displayName);
  } catch (error) {
    console.error(error);
    alert(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signup, login, loginWithGoogle, logout };
