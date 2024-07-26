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

  const playIconStyle = "h-auto w-5 md:w-4 cursor-pointer";

  return (
    <div className="h-auto md:h-[10%] rounded-t-xl md:rounded-t-none  w-full bg-[#86868649] md:bg-black backdrop-blur-lg fixed bottom-0 md:relative">
      {showLyrics && <LyricsBox />}
      {/* Responsive */}
      <div className="flex md:hidden gap-2 mx-6 mt-4 items-center">
        <img
          className="w-[25%] rounded"
          src={tracks[trackIndex].album.images[0].url}
          alt=""
        />
        <div className="text-nowrap overflow-hidden">
          <p className="text-white font-semibold text-lg">
            {tracks[trackIndex].name}
          </p>
          <p className="text-lightA font-light">
            {tracks[trackIndex].artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
      <ProgressBar />
      {/* Responsive */}
      <div className="w-full justify-between flex md:hidden items-center font-light text-sm text-light9 px-6 mb-6">
        <p className="inline-flex justify-center">
          {formatTime(time.currentTime)}
        </p>
        <p className="inline-flex justify-center">
          {formatTime(time.totalTime)}
        </p>
      </div>

      <div className="h-auto md:h-full flex justify-between items-center md:px-4 mx-7 md:mx-0">
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
        <div className="w-full flex flex-col items-center gap-1 mb-10 md:mb-0">
          <div className="w-full md:w-auto flex justify-between md:gap-4">
            <div
              className="cursor-pointer"
              onClick={() => setRandom((prev) => !prev)}
            >
              {random ? (
                <img
                  className={`${playIconStyle}`}
                  src={assets.randomBlue}
                  alt=""
                />
              ) : (
                <img
                  className={`${playIconStyle}`}
                  src={assets.random}
                  alt=""
                />
              )}
            </div>
            <img
              onClick={previous}
              className={`${playIconStyle}`}
              src={assets.playerPrev}
              alt=""
            />
            {playStatus ? (
              <img
                onClick={pause}
                className={`${playIconStyle}`}
                src={assets.playerPause}
                alt=""
              />
            ) : (
              <img
                onClick={play}
                className={`${playIconStyle}`}
                src={assets.playerPlay}
                alt=""
              />
            )}
            <img
              onClick={next}
              className={`${playIconStyle}`}
              src={assets.playerNext}
              alt=""
            />
            <div
              className="cursor-pointer"
              onClick={() => setLoop((prev) => !prev)}
            >
              {loop ? (
                <img
                  className={`${playIconStyle}`}
                  src={assets.loopBlue}
                  alt=""
                />
              ) : (
                <img className={`${playIconStyle}`} src={assets.loop} alt="" />
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
