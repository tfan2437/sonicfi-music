import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const navigate = useNavigate();
  const navRef = useRef();
  const { displayRef, currentUser, userImage, showSearch } =
    useContext(PlayerContext);

  useEffect(() => {
    const handleScroll = () => {
      if (displayRef.current.scrollTop >= 200) {
        navRef.current.classList.add("bg-[#000000c1]");
      } else {
        navRef.current.classList.remove("bg-[#000000c1]");
      }
    };

    const displayElement = displayRef.current;
    displayElement.addEventListener("scroll", handleScroll);

    return () => {
      displayElement.removeEventListener("scroll", handleScroll);
    };
  }, [displayRef]);

  return (
    <div
      ref={navRef}
      className="fixed top-0 z-10 w-[100%] lg:w-[81%] py-4 px-4 transition-colors duration-300 ease-out"
    >
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
          {showSearch && <SearchBar />}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/tfan2437?tab=repositories"
            target="_blank"
          >
            <p className="bg-black border-[1.5px] border-[#616161] hover:border-[#ffffff] text-[#616161] hover:text-[#ffffff] text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
              Explore on Github
            </p>
          </a>
          <div className="hidden md:flex justify-center items-center bg-black w-[33.5px] h-[33.5px] border-[1.5px] rounded-full cursor-pointer opacity-50 hover:opacity-100">
            <img className="h-4 pb-[2px]" src={assets.bell_icon} alt="" />
          </div>

          <div className="flex justify-center items-center w-[33.5px] h-[33.5px] bg-[#0032ff] text-white rounded-full flex items-center justify-center text-sm cursor-pointer">
            {userImage !== "" ? (
              <img
                src={userImage}
                alt=""
                className="w-full h-full object-cover overflow-hidden rounded-full"
              />
            ) : (
              <p className="text-lg text-white font-normal">
                {currentUser && currentUser.email.slice(0, 1).toUpperCase()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
