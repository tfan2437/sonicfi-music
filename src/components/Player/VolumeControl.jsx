import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const VolumeControl = () => {
  const { audioRef } = useContext(PlayerContext);

  const [volume, setVolume] = useState(20);

  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.volume = volume / 100.0;
    }
  }, [volume, audioRef]);

  const handleVolumeChange = (e) => {
    const rect = e.target.getBoundingClientRect();
    const newVolume = Math.min(
      Math.max(0, ((e.clientX - rect.left) / rect.width) * 100),
      100
    );
    setVolume(newVolume);
  };

  return (
    <div
      className="w-full h-full bg-[#616161] rounded-full cursor-pointer"
      onClick={handleVolumeChange}
    >
      <div
        className="h-full bg-white rounded-full transition-all"
        style={{ width: `${volume}%` }}
      />
    </div>
  );
};

export default VolumeControl;
