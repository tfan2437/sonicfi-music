import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { PlayerContext } from "../../context/PlayerContext";
import VolumeControl from "./VolumeControl";
import LyricsBox from "./LyricsBox";
import { trackPlaceholder } from "../../data/placeholder";
import ProgressBar from "./ProgressBar";

const Player = () => {
  const {
    play,
    pause,
    playStatus,
    time,
    previous,
    next,
    audioRef,
    formatTime,
    tracks,
    trackIndex,
    showLyrics,
    setShowLyrics,
  } = useContext(PlayerContext);

  const [random, setRandom] = useState(false);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    if (tracks != trackPlaceholder.tracks) play();
  }, [tracks, trackIndex]);

  return (
    <div className="h-[10%] bg-black relative">
      {showLyrics && <LyricsBox />}
      <ProgressBar />
      <div className="h-full bg-black flex justify-between items-center px-4">
        <div className="w-[350px] hidden lg:flex items-center gap-4 ">
          <img
            className="w-16"
            src={tracks[trackIndex].album.images[0].url}
            alt=""
          />
          <div className="text-nowrap overflow-hidden">
            <p className="text-white font-semibold">
              {tracks[trackIndex].name}
            </p>
            <p className="text-light9 font-light text-sm">
              {tracks[trackIndex].artists
                .map((artist) => artist.name)
                .join(", ")}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 m-auto">
          <div className="flex gap-4">
            <div
              className="cursor-pointer"
              onClick={() => setRandom((prev) => !prev)}
            >
              {random ? (
                <img className="w-4" src={assets.randomBlue} alt="" />
              ) : (
                <img className="w-4" src={assets.random} alt="" />
              )}
            </div>
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
            <div
              className="cursor-pointer"
              onClick={() => setLoop((prev) => !prev)}
            >
              {loop ? (
                <img className="w-4" src={assets.loopBlue} alt="" />
              ) : (
                <img className="w-4" src={assets.loop} alt="" />
              )}
            </div>
          </div>
        </div>
        <div className="w-[350px] hidden lg:flex lg:justify-end items-center gap-2">
          <div className="flex items-center font-normal text-light7">
            <p className="w-[48px] inline-flex justify-center">
              {formatTime(time.currentTime)}
            </p>
            <p>/</p>
            <p className="w-[48px] inline-flex justify-center">
              {formatTime(time.totalTime)}
            </p>
          </div>

          <img className="w-5" src={assets.volume} alt="" />
          <div className="w-[100px] h-[4px]">
            <VolumeControl />
          </div>

          <img
            className="w-5 cursor-pointer"
            src={assets.handThick}
            alt=""
            onClick={() => setShowLyrics((prev) => !prev)}
          />
        </div>
        <audio
          ref={audioRef}
          src={tracks[trackIndex].preview_url}
          onEnded={next}
        ></audio>
      </div>
    </div>
  );
};

export default Player;
