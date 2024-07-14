import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
import { options } from "../utils/spotifyAPI";
import { getTracksResult } from "../data/fetchObjects";
import { artistPlaceholder } from "../data/placeholder";
export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const displayRef = useRef();

  const [currentUser, setCurrentUser] = useState({
    email: "user@streamfi.com",
    name: "User",
    uid: "607DZlOZN1gkV0q3AxEfmGieoeu1",
    authProvider: "StreamFi",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocK64LPrMsp2AVJSU9q76jiZIaBwlu6iUlTiTi7Fdr01o5Queaxa=s96-c",
  });

  const [track, setTrack] = useState(getTracksResult.tracks[0]);
  const [artist, setArtist] = useState(artistPlaceholder);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = async () => {
    try {
      await audioRef.current.play();
      setPlayStatus(true);
    } catch (error) {
      console.error("Playback error:", error);
    }
  };

  const pause = async () => {
    await audioRef.current.pause();
    setPlayStatus(false);
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await play();
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await play();
    }
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  // Time Format Function
  const toTwoDigit = (n) => {
    return n < 10 ? `0${n}` : n.toString();
  };

  const formatTime = (time) => {
    if (isNaN(time.minute) || isNaN(time.second)) {
      return "00:00";
    }
    return `${toTwoDigit(time.minute)}:${toTwoDigit(time.second)}`;
  };

  // Spotify API Fetching
  const getTrackPreviewById = async (id) => {
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/tracks/?ids=${id}`,
        options
      );
      if (!response.ok) {
        throw new Error("Could not fetch the track data.");
      }
      const result = await response.json();
      setTrack(result.tracks[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getArtist = async (id) => {
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/artist_overview/?id=${id}`,
        options
      );

      if (!response.ok) {
        throw new Error("Could not fetch the track data.");
      }

      const result = await response.json();
      setArtist(result);
    } catch (error) {
      console.error(error);
    }
  };

  const getTracksByGenre = async (totalTracks, trackId, artistId, genre) => {
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/recommendations/?limit=${totalTracks}&seed_tracks=${trackId}&seed_artists=${artistId}&seed_genres=${genre}`,
        options
      );

      if (!response.ok) {
        throw new Error("Could not fetch the track data.");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handlePlay = async () => {
      await play();
    };
    handlePlay();
  }, [track]);

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          (
            (audioRef.current.currentTime / audioRef.current.duration) *
            100
          ).toFixed(1) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });

        if (audioRef.current.currentTime === audioRef.current.duration) {
          console.log("audio is over");
          setPlayStatus(false);
        }
      };
    }, 1000);
  }, [audioRef]);

  const contextValue = {
    audioRef,
    displayRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    previous,
    next,
    seekSong,
    getTrackPreviewById,
    formatTime,
    getArtist,
    artist,
    setArtist,
    getTracksByGenre,
    currentUser,
    setCurrentUser,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
