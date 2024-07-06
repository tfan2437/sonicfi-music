import DisplayHome from "./components/DisplayHome";
import DisplayAlbum from "./components/DisplayAlbum";
import Login from "./components/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./auth/firebase";
import MainLayout from "./components/MainLayout";
import { Routes, Route } from "react-router-dom";
import {
  getTracksById,
  searchByKeyword,
  getArtistOverviewById,
} from "./data/spotifyAPI";
import DisplayArtist from "./components/DisplayArtist";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("No User");
        navigate("/login");
      }
    });
    // getArtistOverviewById("246dkjvS1zLTtiykXe5h60");
    // getTracksById("7221xIgOnuakPdLqT0F3nP");
    // searchByKeyword("post malone")
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
        <Route path="/artist" element={<DisplayArtist />} />
      </Route>
    </Routes>
  );
};

export default App;
