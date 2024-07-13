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
  getArtist,
  getAlbumById,
  getAlbumMetaDataById,
  trackRecommendationsByGenres,
} from "./utils/spotifyAPI";
import DisplayArtist from "./components/Artist/DisplayArtist";
import Album from "./components/Album/Album";
import DisplayRecommendations from "./components/Recommendations/DisplayRecommendations";

const App = () => {
  const navigate = useNavigate();

  const genres = ["pop", "hip-hop", "rock", "country", "r&b", "k-pop"];

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("No User");
        navigate("/login");
      }
    });

    // getArtist("2YZyLoL8N0Wb9xBt1NhZWg");

    // trackRecommendationsByGenres();
    // browseAll();
    // getAlbumMetaDataById("1F9LY06gadScF4g3g3BrDC");
    // getAlbumById("1F9LY06gadScF4g3g3BrDC");

    // getTracksById("3SdFuYwyWoq7kuaHdTDcyD");
    // searchByKeyword("post malone")
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<DisplayRecommendations />} />
        <Route path="/austin" element={<Album />} />
        <Route path="/artist/:id" element={<DisplayArtist />} />
      </Route>
    </Routes>
  );
};

export default App;
