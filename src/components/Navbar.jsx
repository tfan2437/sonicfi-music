import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt=""
            onClick={() => navigate(-1)}
          />
          <img
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt=""
            onClick={() => navigate(1)}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="bg-black border-[1.5px] border-[#616161] hover:border-[#ffffff] text-[#616161] hover:text-[#ffffff] text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore Premium
          </p>
          <div className="hidden md:flex justify-center items-center bg-black w-[33.5px] h-[33.5px] border-[1.5px] border-[#616161] hover:border-[#ffffff] text-[#616161] hover:text-[#ffffff] rounded-full cursor-pointer">
            <img
              className="h-4 pb-[2px] opacity-50 hover:opacity-100"
              src={assets.bell_icon}
              alt=""
            />
          </div>
          <p className="w-[33.5px] h-[33.5px] bg-[#0032ff] border-[1.5px] border-[#0032ff] hover:border-[#ffffff] text-white rounded-full flex items-center justify-center text-sm cursor-pointer">
            T
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          All
        </p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">Music</p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">
          Podcasts
        </p>
      </div>
    </>
  );
};

export default Navbar;
