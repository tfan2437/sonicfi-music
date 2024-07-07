import { useContext } from "react";
import { getArtistOverview } from "../data/artistOverview";
import { PlayerContext } from "../context/PlayerContext";
import { options } from "../data/spotifyAPI";
import { albumsData, assets, songsData } from "../assets/assets";
import playIcon from "../assets/icon-play-black.png";
import ArtistAlbums from "./Artist/ArtistAlbums";
import ArtistBio from "./Artist/ArtistBio";

const DisplayArtist = () => {
  const { getTrackPreviewById } = useContext(PlayerContext);

  const formatPlayCount = (count) => {
    const number = Number(count);
    return new Intl.NumberFormat().format(number);
  };

  const convertToMinutesAndSeconds = (totalMilliseconds) => {
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const artistId = getArtistOverview.data.artist.id;
  const artistName = getArtistOverview.data.artist.profile.name;
  const artistBiography = getArtistOverview.data.artist.profile.biography.text;
  const artistProfileImage =
    getArtistOverview.data.artist.visuals.avatarImage.sources[0].url;
  const artistHeaderImage =
    getArtistOverview.data.artist.visuals.headerImage.sources[0].url;

  const artistTopTracks =
    getArtistOverview.data.artist.discography.topTracks.items;
  getArtistOverview.data.artist.discography.topTracks.items[0].track.id;
  // pass the id to gettrackbyid
  getArtistOverview.data.artist.discography.topTracks.items[0].track.name;
  getArtistOverview.data.artist.discography.topTracks.items[0].track.playcount;
  getArtistOverview.data.artist.discography.topTracks.items[0].track.duration
    .totalMilliseconds;

  getArtistOverview.data.artist.discography.topTracks.items[0].track.album
    .coverArt.sources[0].url;

  getArtistOverview.data.artist.discography.popularReleases.items[0].releases
    .items[0].coverArt.sources[0].url;

  return (
    <div className="w-full h-full">
      {/* <img src={artistProfileImage} alt="" className="w-[100px] rounded-full" /> */}
      <div className="relative">
        <img
          src={artistHeaderImage}
          alt=""
          className="w-full h-[350px] object-cover relative"
        />
        <div className="absolute bottom-0 left-4 w-[100%] flex items-center justify-between">
          <p className="text-white font-black text-[70px]">{artistName}</p>
          <div className="mr-8 bg-[#0032ff] rounded-full w-16 h-16 flex justify-center items-center cursor-pointer hover:opacity-75">
            <img src={playIcon} alt="" className="w-5" />
          </div>
        </div>
      </div>
      <div className="pl-4 grid grid-cols-3 sm:grid-cols-6 mt-4 mb-2 text-[#7a7a7a] text-sm">
        <p className="col-span-4 inline-flex">
          <b className="mr-4 text-[#a7a7a7] font-bold w-[30px] inline-flex justify-center">
            #
          </b>
          <div className="w-14 mr-5"></div>
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
          className="pl-4 grid grid-cols-3 sm:grid-cols-6 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff26] cursor-pointer"
          key={index}
          onClick={() => getTrackPreviewById(item.track.id)}
        >
          <p className="text-white col-span-4 font-semibold text-nowrap">
            <b className="mr-4 text-[#a7a7a7] font-bold w-[30px] inline-flex justify-center">
              {index + 1}
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
            {convertToMinutesAndSeconds(item.track.duration.totalMilliseconds)}
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
