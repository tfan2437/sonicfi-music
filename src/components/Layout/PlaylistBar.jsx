import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { assets } from "../../assets/assets";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";

const PlaylistBar = () => {
  const { playlist, setPlaylist, setTracks, setTrackIndex, currentUser } =
    useContext(PlayerContext);

  const tracksUpdate = (index) => {
    return new Promise((resolve, reject) => {
      try {
        setTracks(playlist.tracks);
        setTrackIndex(index);
        resolve("playlist tracks updated");
      } catch (error) {
        reject("playlist tracks update failed");
      }
    });
  };

  const handleTrackUpdate = async (index) => {
    try {
      await tracksUpdate(index);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromPlaylist = async (targetIndex) => {
    if (currentUser) {
      const playlistRef = doc(db, "playlists", currentUser.uid);
      const playlistDoc = await getDoc(playlistRef);
      if (!playlistDoc.exists()) {
        return;
      }

      const playlistData = playlistDoc.data();

      const originalTracks = [...playlistData.tracks];
      console.log(originalTracks);

      const updatedTracks = originalTracks.filter((_, i) => i !== targetIndex);
      console.log(updatedTracks);

      await setDoc(playlistRef, { ...playlistData, tracks: updatedTracks });
      setPlaylist({ ...playlistData, tracks: updatedTracks });
    }
  };

  return (
    <div className="flex flex-col w-full h-auto bg-black ml-3 mr-2 mt-2 rounded-lg text-[#a7a7a7] cursor-pointer">
      {playlist &&
        playlist.tracks.map((track, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-black hover:bg-dark3 text-lightC hover:text-white p-1 rounded-sm mr-4 relative"
          >
            <div
              className="flex items-center"
              onClick={() => handleTrackUpdate(index)}
            >
              <img
                src={track.album.images[0].url}
                alt=""
                className="w-12 rounded-sm z-200"
              />
              <div className="ml-2">
                <p className="w-[120px] 2xl:w-[200px] font-medium text-sm text-nowrap overflow-hidden mr-2 mt-1">
                  {track.name}
                </p>
                <p className="flex items-center gap-1 text-light7 font-light text-xs">
                  {track.artists[0].name}
                </p>
              </div>
            </div>
            <div
              className="z-50 opacity-10 hover:opacity-60 p-1 cursor-pointer"
              onClick={() => removeFromPlaylist(index)}
            >
              <img src={assets.trashCan} alt="" className="w-4" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlaylistBar;
