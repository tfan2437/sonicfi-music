import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../auth/firebase";

const Test = () => {
  const createPlaylist = async () => {
    await setDoc(doc(db, "playlists", "tempUID000000"), {
      uid: "tempUID000000",
      name: "First Playlist",
      tracks: [
        {
          uri: "www.spotify.com/track/exampleid#1",
        },
      ],
    });
  };

  const updatePlaylist = async () => {
    const playlistRef = doc(db, "playlists", "tempUID000000");
    const playlistDoc = await getDoc(playlistRef);

    if (playlistDoc.exists()) {
      const playlistData = playlistDoc.data();
      const updatedTracks = [
        ...playlistData.tracks,
        {
          uri: "www.spotify.com/track/exampleid#2",
        },
      ];

      await setDoc(playlistRef, { ...playlistData, tracks: updatedTracks });
    } else {
      console.log("No such document!");
    }
  };

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    createPlaylist();
  };

  const handleUpdatePlaylist = (e) => {
    e.preventDefault();
    updatePlaylist();
  };

  return (
    <div className="w-full pt-20 text-white">
      <h1 className="text-4xl font-bold mb-4">Database Test</h1>
      <button
        className="bg-dark5 px-4 py-2 rounded-full text-white text-2xl mr-4"
        onClick={handleCreatePlaylist}
      >
        Create List
      </button>
      <button
        className="bg-dark5 px-4 py-2 rounded-full text-white text-2xl"
        onClick={handleUpdatePlaylist}
      >
        Update List
      </button>
    </div>
  );
};

export default Test;
