import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const ProgressBar = () => {
  const { seekBar, seekBg, seekSong } = useContext(PlayerContext);

  return (
    <div className="flex items-center gap-5 mt-4 mb-2 md:my-0 mx-6 md:mx-0">
      <div
        onClick={seekSong}
        ref={seekBg}
        className="w-full bg-white md:bg-[#616161] rounded-full cursor-pointer"
      >
        <hr
          ref={seekBar}
          className="h-1 border-none w-0 bg-[#0032ff] rounded-full"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
