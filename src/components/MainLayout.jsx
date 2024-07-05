import Player from "./Player";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

import { Outlet, useLocation } from "react-router-dom";

import { useEffect, useRef } from "react";
import { albumsData } from "../assets/assets";

const MainLayout = () => {
  const { audioRef, track } = useContext(PlayerContext);

  const displayRef = useRef();
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
          className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
        >
          <Outlet />
        </div>
      </div>
      <Player />
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
    </div>
  );
};

export default MainLayout;
