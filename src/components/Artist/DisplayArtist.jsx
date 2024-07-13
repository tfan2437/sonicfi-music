import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../../context/PlayerContext";
import { assets } from "../../assets/assets";
import { formatPlayCount, formatMinutesAndSeconds } from "../../utils/format";

import ArtistAlbums from "./ArtistAlbums";
import ArtistBio from "./ArtistBio";

const DisplayArtist = () => {
  const { id } = useParams();
  const { getTrackPreviewById, getArtist, artist } = useContext(PlayerContext);
  const [hoveredTrackIndex, setHoveredTrackIndex] = useState(null);

  useEffect(() => {
    getArtist(id);
  }, []);

  const artistData = artist.data.artist;
  const artistHeaderImage = artistData.visuals.headerImage.sources[0].url;
  const artistName = artistData.profile.name;
  const artistTopTracks = artistData.discography.topTracks.items;

  return (
    <div className="w-full h-full">
      <div className="relative">
        <img
          src={artistHeaderImage}
          alt=""
          className="w-full h-[350px] object-cover relative"
        />
        <div className="absolute bottom-0 left-4 w-[100%] flex items-center justify-between">
          <p className="text-white font-black text-[70px]">{artistName}</p>
          <div className="mr-8 bg-[#0032ff] rounded-full w-16 h-16 flex justify-center items-center cursor-pointer hover:opacity-75">
            <img src={assets.playBlack} alt="" className="w-5" />
          </div>
        </div>
      </div>
      <div className="pl-4 grid grid-cols-3 sm:grid-cols-6 mt-4 mb-2 text-[#7a7a7a] text-sm">
        <p className="col-span-4 inline-flex">
          <b className="mr-4 text-[#a7a7a7] font-bold w-[30px] inline-flex justify-center">
            #
          </b>
          Title
        </p>
        <div className="w-[150px] hidden md:block">
          <p className="text-[15px] hidden md:block text-right">Plays</p>
        </div>
        <div className="w-full  items-center justify-end hidden md:flex">
          <img
            className="w-[14px] opacity-55 text-right mr-10 hidden md:block"
            src={assets.clock_icon}
            alt=""
          />
        </div>
      </div>
      <hr className="opacity-25" />
      {artistTopTracks.map((item, index) => (
        <div
          className="relative pl-4 grid grid-cols-3 sm:grid-cols-6 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff26] cursor-pointer"
          key={index}
          onClick={() => getTrackPreviewById(item.track.id)}
          onMouseEnter={() => setHoveredTrackIndex(index)}
          onMouseLeave={() => setHoveredTrackIndex(null)}
        >
          <p className="text-white col-span-4 font-semibold text-nowrap">
            <b className="mr-4 text-[#a7a7a7] font-bold w-[30px] inline-flex justify-center">
              {hoveredTrackIndex === index ? "▶" : index + 1}
            </b>
            <img
              className="inline h-14 mr-5"
              src={item.track.album.coverArt.sources[0].url}
              alt=""
            />
            {item.track.name}
          </p>
          <div className="w-[150px]">
            <p className="text-[15px] hidden md:block text-right">
              {formatPlayCount(item.track.playcount)}
            </p>
          </div>

          <p className="text-[15px] text-right pr-6 hidden md:block">
            {formatMinutesAndSeconds(item.track.duration.totalMilliseconds)}
          </p>
        </div>
      ))}
      <hr className="opacity-25" />
      <ArtistAlbums />
      <hr className="opacity-25" />
      <ArtistBio />
    </div>
  );
};

export default DisplayArtist;
