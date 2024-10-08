import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../auth/firebase";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const DropdownMenu = ({ track }) => {
  const navigate = useNavigate();

  const { currentUser, setPlaylist, setShowLyrics } = useContext(PlayerContext);

  const menuSelection = [
    [assets.plus, "Add to playlist"],
    [assets.artist, "Go to artist"],
    [assets.album, "Go to album"],
    [assets.hand, "View lyrics"],
  ];

  const targetTrack = {
    album: {
      id: track.album.uri.slice(14, 36),
      name: track.album.name,
      images: [
        {
          url: track.album.images[0].url,
        },
      ],
    },
    artists: [
      {
        id: track.artists[0].id,
        name: track.artists[0].name,
      },
    ],
    duration_ms: track.duration_ms,
    id: track.id,
    name: track.name,
    popularity: track.popularity,
    preview_url: track.preview_url,
  };

  const addToPlaylist = async () => {
    if (currentUser) {
      // Query playlist
      const playlistRef = doc(db, "playlists", currentUser.uid);
      const playlistDoc = await getDoc(playlistRef);

      // if No playlist, create one
      if (!playlistDoc.exists()) {
        await setDoc(doc(db, "playlists", currentUser.uid), {
          uid: currentUser.uid,
          name: "My Playlist",
          tracks: [],
        });
      }

      // get new playlist data
      const newPlaylistDoc = await getDoc(playlistRef);
      const playlistData = newPlaylistDoc.data();

      // add the target track to playlist
      const updatedTracks = [...playlistData.tracks, targetTrack];
      await setDoc(playlistRef, { ...playlistData, tracks: updatedTracks });
      setPlaylist({ ...playlistData, tracks: updatedTracks });
    }
  };

  const handleSelect = (index) => {
    if (index === 0) {
      console.log("Add to playlist");
      addToPlaylist();
    } else if (index === 1) {
      console.log("Navigate to: " + targetTrack.artists[0].id);
      navigate(`/artist/${targetTrack.artists[0].id}`);
    } else if (index === 2) {
      console.log("Navigate to: " + targetTrack.album.id);
      navigate(`/album/${targetTrack.album.id}`);
    } else {
      setShowLyrics((prev) => !prev);
    }
  };

  return (
    <div className="absolute top-[32px] right-[4px] w-auto h-auto bg-[#00000071] backdrop-blur-2xl rounded-md">
      {menuSelection.map((selection, index) => (
        <div
          key={index}
          className="flex items-center bg-transparent hover:bg-[#00000040] opacity-60 hover:opacity-100 rounded-md cursor-pointer px-3 py-[6px]"
          onClick={() => handleSelect(index)}
        >
          <img src={selection[0]} alt="" className="w-4 mr-2" />
          <p className="text-white font-light">{selection[1]}</p>
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
