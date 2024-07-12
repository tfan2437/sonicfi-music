import Slider from "react-input-slider";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";

const VolumeControl = () => {
  const [volume, setVolume] = useState(20);
  const { audioRef } = useContext(PlayerContext);

  useEffect(() => {
    audioRef.current.volume = volume / 100.0;
  }, [volume]);

  return (
    <Slider
      axis="x"
      x={volume}
      onChange={({ x }) => setVolume(x)}
      styles={{
        track: {
          width: 100,
          height: 4,
          backgroundColor: "#616161",
          cursor: "pointer",
        },
        active: {
          backgroundColor: "#ffffff",
        },
        thumb: {
          width: 10,
          height: 10,
          backgroundColor: "#ffffff",
          cursor: "pointer",
          display: "none",
        },
      }}
    />
  );
};

export default VolumeControl;
