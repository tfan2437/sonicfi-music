import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
import { options } from "../utils/spotifyAPI";
import { getTracksResult } from "../data/fetchObjects";
import {
  albumMetaPlaceholder,
  albumPlaceholder,
  artistPlaceholder,
  trackPlaceholder,
} from "../data/placeholder";
export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const displayRef = useRef();

  const [currentUser, setCurrentUser] = useState(null);
  const [playlist, setPlaylist] = useState(null);

  const [track, setTrack] = useState(trackPlaceholder.tracks[0]);
  const [tracks, setTracks] = useState(null);

  const [trackIndex, setTrackIndex] = useState(0);

  const [playStatus, setPlayStatus] = useState(false);

  const [artist, setArtist] = useState(artistPlaceholder);
  const [album, setAlbum] = useState(albumPlaceholder);
  const [albumMeta, setAlbumMeta] = useState(albumMetaPlaceholder);

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

  // new
  // new

  const next = () => {
    console.log(tracks.tracks.length);
    setTrackIndex((prevIndex) => (prevIndex + 1) % tracks.tracks.length);
  };

  const previous = () => {
    setTrackIndex(
      (prevIndex) =>
        (prevIndex - 1 + tracksObject.tracks.length) %
        tracksObject.tracks.length
    );
  };

  // new
  // new

  // const previous = async () => {
  //   if (track.id > 0) {
  //     await setTrack(songsData[track.id - 1]);
  //     await play();
  //   }
  // };

  // const next = async () => {
  //   if (track.id < songsData.length - 1) {
  //     await setTrack(songsData[track.id + 1]);
  //     await play();
  //   }
  // };

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

  // track
  // play
  // section

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
    const handlePlay = async () => {
      await play();
    };
    handlePlay();
  }, [track]);

  // track
  // play
  // section

  // Spotify API Fetching

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

  const getAlbum = async (id) => {
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/albums/?ids=${id}`,
        options
      );

      if (!response.ok) {
        throw new Error("Could not fetch the album data.");
      }

      const result = await response.json();
      setAlbum(result);
    } catch (error) {
      console.error(error);
    }
  };

  const getAlbumMeta = async (id) => {
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/album_metadata/?id=${id}`,
        options
      );

      if (!response.ok) {
        throw new Error("Could not fetch the album data.");
      }

      const result = await response.json();
      setAlbumMeta(result);
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
    getAlbum,
    album,
    setAlbum,
    getAlbumMeta,
    albumMeta,
    setAlbumMeta,
    getTracksByGenre,
    currentUser,
    setCurrentUser,
    playlist,
    setPlaylist,
    tracks,
    setTracks,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
