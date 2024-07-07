import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
import { options } from "../data/spotifyAPI";
import { getTracksResult } from "../data/fetchObjects";
export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const displayRef = useRef();

  const [track, setTrack] = useState(getTracksResult.tracks[0]);
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
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = async () => {
    await audioRef.current.pause();
    setPlayStatus(false);
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
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

  // Format Text

  const formatText = (apiText) => {
    const characterMap = {
      "&#34;": '"',
      "&#39;": "'",
      "&amp;": "&",
    };

    let cleanedText = apiText;

    // Replace HTML character codes with their corresponding characters
    for (const [charCode, char] of Object.entries(characterMap)) {
      const regex = new RegExp(charCode, "g");
      cleanedText = cleanedText.replace(regex, char);
    }

    // Format the text with proper punctuation and line breaks
    cleanedText = cleanedText.replace(/(?:\r\n|\r|\n)/g, " "); // Remove any existing line breaks
    cleanedText = cleanedText.replace(/(?<=\.|,|;|\?|\!)\s+/g, " "); // Ensure single spaces after punctuation
    cleanedText = cleanedText.replace(/\s*([.?!])\s*/g, "$1 "); // Ensure single space after punctuation
    cleanedText = cleanedText.replace(/\s+/g, " "); // Replace multiple spaces with a single space
    cleanedText = cleanedText.trim(); // Remove any leading or trailing whitespace

    return cleanedText;
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

  useEffect(() => {
    play();
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
    formatText,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
