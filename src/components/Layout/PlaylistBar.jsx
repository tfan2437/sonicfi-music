import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const PlaylistBar = () => {
  const { playlist, tracks, setTracks, track, setTrack } =
    useContext(PlayerContext);
  const [pendingIndex, setPendingIndex] = useState(null);

  const tracksUpdate = () => {
    return new Promise((resolve, reject) => {
      try {
        setTracks(playlist.tracks);
        resolve("playlist tracks updated");
      } catch (error) {
        reject("playlist tracks update failed");
      }
    });
  };

  const currentTrackUpdate = (index) => {
    return new Promise((resolve, reject) => {
      try {
        setTrack(tracks[index]);
        resolve("current track updated");
      } catch (error) {
        reject("current track update failed");
      }
    });
  };

  const handleTrackUpdate = async (index) => {
    try {
      await tracksUpdate();
      setPendingIndex(index);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const updateTrack = async () => {
      if (pendingIndex !== null) {
        try {
          await currentTrackUpdate(pendingIndex);
          setPendingIndex(null);
        } catch (error) {
          console.error(error);
        }
      }
    };

    updateTrack();
  }, [tracks, pendingIndex]);

  return (
    <>
      {playlist && (
        <div className="flex flex-col w-[400px] h-auto overflow-hidden bg-dark2 mx-2 mt-2 rounded-lg text-[#a7a7a7] cursor-pointer">
          <p className="text-white font-bold text-lg mt-2 ml-2">
            Playlist Tracks
          </p>
          {playlist.tracks.map((track, index) => (
            <div
              key={index}
              className="flex items-center hover:bg-[#333333a1] px-1 md:px-2 py-1 md:py-2 rounded"
              onClick={() => handleTrackUpdate(index)}
            >
              <img src={track.album.image} alt="" className="w-14 rounded-sm" />
              <div className="ml-2">
                <p className="text-white font-medium text-nowrap overflow-hidden mr-2 mt-1">
                  {track.name}
                </p>
                <p className="flex items-center gap-1 text-[#999999] font-light text-[14px]">
                  {track.artist.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PlaylistBar;
