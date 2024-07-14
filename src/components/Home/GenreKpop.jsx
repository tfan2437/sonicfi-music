import { useContext, useEffect, useState } from "react";
import { formatArtistsName, randomInt } from "../../utils/format";
import { PlayerContext } from "../../context/PlayerContext";
import { genreTracksPlaceholder } from "../../data/placeholder";
import { genresList } from "../../data/genresList";
import { assets } from "../../assets/assets";
import DropdownMenu from "../DropdownMenu";

const GenreKpop = () => {
  const { getTracksByGenre, getTrackPreviewById } = useContext(PlayerContext);

  const [showMore, setShowMore] = useState(false);
  const [tracksData, setTracksData] = useState(genreTracksPlaceholder.tracks);
  const tracksLess = tracksData.slice(0, 7);

  // useEffect(() => {
  //   const genreTracks = async () => {
  //     try {
  //       const randomIndex = randomInt(5);
  //       const result = await getTracksByGenre(
  //         35,
  //         genresList.kpop.tracksAndArtists[randomIndex][0],
  //         genresList.kpop.tracksAndArtists[randomIndex][1],
  //         genresList.kpop.genre
  //       );

  //       // Filter out the low popularity tracks
  //       const filteredTracks = result.tracks.filter(
  //         (track) => track.popularity >= 50
  //       );
  //       const tracks = [...filteredTracks];
  //       setTracksData(tracks);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   genreTracks();
  // }, []);

  return (
    <div className="w-full h-auto">
      <div className="w-full flex justify-between items-end mt-2 mb-5">
        <p className="font-bold text-3xl">K-Pop</p>
        <p
          className="text-light7 hover:text-lightB font-medium cursor-pointer pr-5"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? "Show Less" : "Show More"}
        </p>
      </div>
      <div className="grid grid-cols-7 gap-4 pr-5 ">
        {(showMore ? tracksData : tracksLess).map((track, index) => (
          <div key={index} className="col-span-1 relative">
            <DropdownMenu />
            <div
              className="cursor-pointer group text-lightC hover:text-white"
              onClick={() => getTrackPreviewById(track.id)}
            >
              <img
                src={track.album.images[0].url}
                alt=""
                className="w-full aspect-square object-cover rounded-md opacity-100 group-hover:opacity-60"
              />
              <div className="w-full">
                <p className="font-medium text-md text-nowrap overflow-hidden">
                  {track.name}
                </p>
                <p className="font-light text-xs text-nowrap overflow-hidden text-light7">
                  {formatArtistsName(track.artists)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreKpop;
