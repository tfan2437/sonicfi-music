import DisplayHome from "./components/DisplayHome";
import DisplayAlbum from "./components/DisplayAlbum";
import Login from "./components/Login";
import { useContext, useEffect } from "react";
import { PlayerContext } from "./context/PlayerContext";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./auth/firebase";
import MainLayout from "./components/MainLayout";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("No User");
        navigate("/login");
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Route>
    </Routes>
  );
};

export default App;
