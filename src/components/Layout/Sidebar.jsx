import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { logout } from "../../auth/firebase";
import PlaylistBar from "./PlaylistBar";

const Sidebar = () => {
  return (
    <div className="w-[20%] h-full hidden lg:flex flex-col p-2 text-white overflow-auto">
      <div className="bg-black h-auto flex flex-col gap-6 pb-6">
        <NavLink to={"/"}>
          <div className="pt-3 pl-6 pb-2">
            <img
              src={assets.logoBlue}
              alt=""
              className="h-6 w-auto 2xl:h-8 threeXL:h-9"
            />
          </div>
        </NavLink>

        <NavLink to={"/"}>
          <div className="flex items-center gap-2 pl-6 opacity-85 hover:opacity-100">
            <img className="w-6" src={assets.home} alt="" />
            <p className="font-bold text-lg">Home</p>
          </div>
        </NavLink>

        <NavLink to={"/"}>
          <div className="flex items-center gap-[7px] pl-6 opacity-85 hover:opacity-100">
            <img className="w-6" src={assets.search} alt="" />
            <p className="font-bold text-lg">Search</p>
          </div>
        </NavLink>

        <div
          onClick={() => logout()}
          className="flex items-center gap-2 pl-6 cursor-pointer opacity-85 hover:opacity-100"
        >
          <img className="w-6" src={assets.logout} alt="" />
          <p className="font-bold text-lg">Log Out</p>
        </div>
      </div>
      <div className="bg-[#121212]">
        <div className="flex justify-between items-center">
          <NavLink to={"/"}>
            <div className="flex items-center gap-[7px] pl-6 opacity-85 hover:opacity-100">
              <img className="w-[25px] pl-[1px]" src={assets.playlist} alt="" />
              <p className="font-bold text-lg">Library</p>
            </div>
          </NavLink>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Create your first playlist</h1>
          <p className="font-light">It is easy we will help you</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Create Playlist
          </button>
        </div>
        <PlaylistBar />
      </div>
    </div>
  );
};

export default Sidebar;
