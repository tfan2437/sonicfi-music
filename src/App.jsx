import Login from "./components/Login";
import { useContext, useEffect } from "react";
import { PlayerContext } from "./context/PlayerContext";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./auth/firebase";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/Layout/MainLayout";
import ArtistPage from "./components/Artist/ArtistPage";
import AlbumPage from "./components/Album/AlbumPage";
import HomePage from "./components/Home/HomePage";

import { doc, getDoc } from "firebase/firestore";
import { getTracksById } from "./utils/spotifyAPI";

const App = () => {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser, setPlaylist } =
    useContext(PlayerContext);

  // User auth status check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        setCurrentUser(userData);
        console.log("user valid");
      } else {
        console.log("No User");
        navigate("/login");
      }
    });
    // getTracksById("7CyPwkp0oE8Ro9Dd5CUDjW");
    return () => unsubscribe();
  }, []);

  // if user updated get the playlist
  useEffect(() => {
    if (currentUser) {
      const getPlaylist = async () => {
        const playlistRef = doc(db, "playlists", currentUser.uid);
        const playlistDoc = await getDoc(playlistRef);
        if (!playlistDoc.exists()) return;

        const playlistData = playlistDoc.data();
        setPlaylist(playlistData);
      };

      getPlaylist();
      return () => {
        console.log("Get playlist from database.");
      };
    }
  }, [currentUser]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/album/:id" element={<AlbumPage />} />
        <Route path="/artist/:id" element={<ArtistPage />} />
      </Route>
    </Routes>
  );
};

export default App;
