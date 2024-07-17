import { useContext, useEffect } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const LyricsBox = () => {
  const { tracks, trackIndex, getLyrics, showLyrics, lyrics } =
    useContext(PlayerContext);

  useEffect(() => {
    if (showLyrics && tracks[trackIndex]) {
      getLyrics(tracks[trackIndex].id);
    }
  }, [showLyrics]);

  return (
    <div className="absolute h-[400px] w-[300px] bg-[#00000071] top-[-420px] right-4 rounded-lg backdrop-blur-md overflow-scroll">
      <p className="text-lightD font-semibold px-4 py-3 text-base leading-6 text-wrap">
        {tracks[trackIndex].name}
      </p>
      <pre
        className="text-lightB font-light px-4 pb-3 text-sm leading-6 text-wrap"
        style={{ fontFamily: "SF-Pro-Display" }}
      >
        {lyrics}
      </pre>
    </div>
  );
};

export default LyricsBox;
