import Player from "./Player";
import Sidebar from "./Sidebar";
import { useContext, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { albumsData } from "../assets/assets";
import Navbar from "./Navbar";
import { PlayerContext } from "../context/PlayerContext";

const MainLayout = () => {
  const { displayRef } = useContext(PlayerContext);

  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.slice(-1) : "";
  const bgColor = albumsData[Number(albumId)].bgColor;

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  });

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <div
          ref={displayRef}
          className="w-[100%] lg:w-[85%] bg-[#000000] text-white overflow-auto"
        >
          <Navbar />
          <Outlet />
        </div>
      </div>
      <Player />
    </div>
  );
};

export default MainLayout;
