import { useContext } from "react";
import { getArtistOverview } from "../data/artistOverview";
import { PlayerContext } from "../context/PlayerContext";
import { options } from "../data/spotifyAPI";

const DisplayArtist = () => {
  const { setTrack, getTrackPreviewById } = useContext(PlayerContext);

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

  getArtistOverview.data.artist.discography.popularReleases.items[0].releases
    .items[0].coverArt.sources[0].url;

  return (
    <div className="w-full h-full">
      {/* <img src={artistProfileImage} alt="" className="w-[100px] rounded-full" /> */}
      <div className="relative">
        <img
          src={artistHeaderImage}
          alt=""
          className="w-full h-[250px] object-cover relative"
        />
        <div className="absolute bottom-0 left-4 ">
          <p className="text-white font-black text-[70px]">{artistName}</p>
        </div>
      </div>
      {artistTopTracks.map((item, index) => (
        <div
          key={index}
          className="text-white bg-[#333] hover:bg-[#666] cursor-pointer"
          onClick={() => getTrackPreviewById(item.track.id)}
        >
          <p className="text-gray-500">{item.track.id}</p>
          <p className="text-2xl">{item.track.name}</p>
          <p>{formatPlayCount(item.track.playcount)}</p>
          <p>
            {convertToMinutesAndSeconds(item.track.duration.totalMilliseconds)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DisplayArtist;
