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
  getAlbumById,
  getAlbumMetaDataById,
} from "./data/spotifyAPI";
import DisplayArtist from "./components/DisplayArtist";
import Album from "./components/Album/Album";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("No User");
        navigate("/login");
      }
    });

    // getAlbumMetaDataById("1F9LY06gadScF4g3g3BrDC");
    // getAlbumById("1F9LY06gadScF4g3g3BrDC");
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
        <Route path="/test" element={<Album />} />
      </Route>
    </Routes>
  );
};

export default App;
