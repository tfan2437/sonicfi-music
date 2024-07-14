import Login from "./components/Login";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "./context/PlayerContext";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./auth/firebase";
import MainLayout from "./components/MainLayout";
import { Routes, Route } from "react-router-dom";

import DisplayArtist from "./components/Artist/DisplayArtist";
import Album from "./components/Album/Album";
import HomePage from "./components/Home/HomePage";

import { collection, query, where, getDocs } from "firebase/firestore";
import Test from "./components/Test";

const App = () => {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useContext(PlayerContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setCurrentUser(doc.data());
        });
      } else {
        console.log("No User");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/austin" element={<Album />} />
        <Route path="/artist/:id" element={<DisplayArtist />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
