import Player from "../Player/Player";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { PlayerContext } from "../../context/PlayerContext";

const MainLayout = () => {
  const { displayRef } = useContext(PlayerContext);

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
