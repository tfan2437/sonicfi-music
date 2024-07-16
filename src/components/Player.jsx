import { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import VolumeControl from "./Player/VolumeControl";

const Player = () => {
  const {
    seekBar,
    seekBg,
    play,
    pause,
    playStatus,
    track,
    time,
    previous,
    next,
    seekSong,
    audioRef,
    formatTime,
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
  } = useContext(PlayerContext);

  // const trackImage = tracks[trackIndex].album.images[0].url;
  // const trackName = tracks[trackIndex].name;
  // const trackArtists = tracks[trackIndex].artists.map((artist) => artist.name).join(", ");

  useEffect(() => {
    play();
  }, [tracks, trackIndex]);

  return (
    <div className="h-[10%] bg-black">
      <div className="flex items-center gap-5">
        {/* Player Progress Bar */}
        <div
          onClick={seekSong}
          ref={seekBg}
          className="w-full bg-[#616161] rounded-full cursor-pointer"
        >
          <hr
            ref={seekBar}
            className="h-1 border-none w-0 bg-[#0032ff] rounded-full"
          />
        </div>
        {/* Player Progress Bar */}
      </div>
      <div className="h-full bg-black flex justify-between items-center text-white px-4">
        <div className="hidden lg:flex items-center gap-4">
          <img
            className="w-12"
            src={tracks[trackIndex].album.images[0].url}
            alt=""
          />
          <div>
            <p>{tracks[trackIndex].name}</p>
            <p>
              {tracks[trackIndex].artists
                .map((artist) => artist.name)
                .join(", ")}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 m-auto">
          <div className="flex gap-4">
            <img
              className="w-4 cursor-pointer"
              src={assets.shuffle_icon}
              alt=""
            />
            <img
              onClick={previous}
              className="w-4 cursor-pointer"
              src={assets.prev_icon}
              alt=""
            />
            {playStatus ? (
              <img
                onClick={pause}
                className="w-4 cursor-pointer"
                src={assets.pause_icon}
                alt=""
              />
            ) : (
              <img
                onClick={play}
                className="w-4 cursor-pointer"
                src={assets.play_icon}
                alt=""
              />
            )}
            <img
              onClick={next}
              className="w-4 cursor-pointer"
              src={assets.next_icon}
              alt=""
            />
            <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center font-normal text-[#7e7e7e]">
            <p className="w-[45px] inline-flex justify-center">
              {formatTime(time.currentTime)}
            </p>
            <p>/</p>
            <p className="w-[45px] inline-flex justify-center">
              {formatTime(time.totalTime)}
            </p>
          </div>

          <img className="w-5" src={assets.volume} alt="" />
          <div className="w-[100px] h-[4px]">
            <VolumeControl />
          </div>

          <img className="w-5" src={assets.handThick} alt="" />
        </div>
        <audio
          ref={audioRef}
          src={tracks[trackIndex].preview_url}
          preload="auto"
          onEnded={next}
        ></audio>
      </div>
    </div>
  );
};

export default Player;
