import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { logout } from "../../auth/firebase";
import PlaylistBar from "./PlaylistBar";
import { useContext, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const Sidebar = () => {
  const [showPlaylist, setShowPlaylist] = useState(true);

  const { setShowSearch } = useContext(PlayerContext);

  const playlistStyle = showPlaylist ? "" : "hidden";

  const activedStyle =
    "text-black bg-white hover:text-white hover:bg-black transition-all py-0.5 px-2 rounded-full text-sm font-semibold cursor-pointer";

  const unactivedStyle =
    "text-white bg-black hover:text-black hover:bg-white transition-all py-0.5 px-2 rounded-full text-sm font-semibold cursor-pointer";

  return (
    <div className="w-[20%] h-full hidden lg:flex flex-col p-2 text-white overflow-auto">
      <div className="bg-black h-auto flex flex-col gap-4 pl-4 pb-4">
        <NavLink to={"/"}>
          <div className="pt-3 pb-2">
            <img src={assets.logoBlue} alt="" className="h-5 w-auto 2xl:h-7" />
          </div>
        </NavLink>

        <NavLink to={"/"}>
          <div className="flex items-center gap-2 opacity-85 hover:opacity-100">
            <img className="w-5" src={assets.home} alt="" />
            <p className="font-bold text-base">Home</p>
          </div>
        </NavLink>

        <div
          className="flex items-center gap-[7px] opacity-85 hover:opacity-100 cursor-pointer"
          onClick={() => setShowSearch((prev) => !prev)}
        >
          <img className="w-5" src={assets.search} alt="" />
          <p className="font-bold text-base">Search</p>
        </div>

        <div
          onClick={() => logout()}
          className="flex items-center gap-2 cursor-pointer opacity-85 hover:opacity-100"
        >
          <img className="w-[21px]" src={assets.logout} alt="" />
          <p className="font-bold text-base">Log Out</p>
        </div>
      </div>
      <div className="bg-[#121212]">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-[7px] pl-4 opacity-85 hover:opacity-100 cursor-pointer"
            onClick={() => setShowPlaylist((prev) => !prev)}
          >
            <img className="w-5 pl-[1px]" src={assets.playlist} alt="" />
            <p className="font-bold text-base">Playlist</p>
          </div>
        </div>
        <hr className="opacity-20 mx-4 mt-3" />

        <div className={playlistStyle}>
          <div className="flex gap-2 mt-3 mx-4">
            <p className={activedStyle}>Tracks</p>
            <p className={unactivedStyle}>Albums</p>
            <p className={unactivedStyle}>Artists</p>
          </div>
          <PlaylistBar />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
