import { createContext, useEffect, useRef, useState } from "react";
import { options } from "../utils/spotifyAPI";
import { filterSearchResult } from "../utils/format";
import {
  albumMetaPlaceholder,
  albumPlaceholder,
  artistPlaceholder,
  genreTracksPlaceholder,
  searchPlaceholder,
  trackPlaceholder,
} from "../data/placeholder";
export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const displayRef = useRef();

  const [currentUser, setCurrentUser] = useState(null);
  const [userImage, setUserImage] = useState("");
  const [playlist, setPlaylist] = useState(null);

  const [track, setTrack] = useState(trackPlaceholder.tracks[0]);
  const [tracks, setTracks] = useState(trackPlaceholder.tracks);
  const [trackIndex, setTrackIndex] = useState(0);

  const [showLyrics, setShowLyrics] = useState(false);
  const [lyrics, setLyrics] = useState("");

  const [artist, setArtist] = useState(artistPlaceholder);
  const [album, setAlbum] = useState(albumPlaceholder);
  const [albumMeta, setAlbumMeta] = useState(albumMetaPlaceholder);

  const [kpopTracks, setKpopTracks] = useState(genreTracksPlaceholder.tracks);
  const [hippopTracks, setHippopTracks] = useState(
    genreTracksPlaceholder.tracks
  );
  const [popTracks, setPopTracks] = useState(genreTracksPlaceholder.tracks);

  const [showSearch, setShowSearch] = useState(false);
  const [searchResult, setSearchResult] = useState(searchPlaceholder);

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

  // new

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

  const next = () => {
    if (tracks.length === 1) {
      audioRef.current.currentTime = 0;
      play();
    } else {
      setTrackIndex((prev) => (prev + 1) % tracks.length);
    }
  };

  const previous = () => {
    if (tracks.length === 1) {
      audioRef.current.currentTime = 0;
      play();
    } else {
      setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    }
  };

  // new

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

  // GET

  const getSearch = async (keyword) => {
    try {
      const formatedKeyword = keyword.toLowerCase().replace(/ /g, "%20");
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/search/?q=${formatedKeyword}&type=multi&offset=0&limit=20&numberOfTopResults=10`,
        options
      );
      if (!response.ok) {
        throw new Error("Could not fetch the search data.");
      }
      const result = await response.json();
      const filteredResult = await filterSearchResult(result);
      setSearchResult(filteredResult);
    } catch (error) {
      console.error(error);
    }
  };

  const getTrack = async (id) => {
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/tracks/?ids=${id}`,
        options
      );
      if (!response.ok) {
        throw new Error("Could not fetch the track data.");
      }
      const result = await response.json();
      setTracks(result.tracks);
      setTrackIndex(0);
    } catch (error) {
      console.error(error);
    }
  };

  const getLyrics = async (id) => {
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/track_lyrics/?id=${id}`,
        options
      );

      if (!response.ok) {
        throw new Error("Could not fetch the track data.");
      }

      const result = await response.json();
      console.log(result);

      const formatLyrics = (result) => {
        const lines = result.lyrics.lines;
        const formattedLyrics = lines.map((line) => line.words).join("\n");
        return formattedLyrics;
      };

      const formattedLyrics = formatLyrics(result);
      setLyrics(formattedLyrics);
    } catch (error) {
      console.error(error);
    }
  };

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
      const updateSeekBar = () => {
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

      if (audioRef.current) {
        audioRef.current.ontimeupdate = updateSeekBar;
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.ontimeupdate = null;
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
    getTrack,
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
    trackIndex,
    setTrackIndex,
    getLyrics,
    showLyrics,
    setShowLyrics,
    lyrics,
    setLyrics,

    hippopTracks,
    setHippopTracks,
    popTracks,
    setPopTracks,
    kpopTracks,
    setKpopTracks,

    userImage,
    setUserImage,
    showSearch,
    setShowSearch,
    getSearch,
    searchResult,
    setSearchResult,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
