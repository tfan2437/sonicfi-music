import { useContext, useEffect, useState } from "react";
import { formatArtistsName, randomInt } from "../../utils/format";
import { PlayerContext } from "../../context/PlayerContext";
import { genreTracksPlaceholder } from "../../data/placeholder";
import { genresList } from "../../data/genresList";
import { assets } from "../../assets/assets";
import DropdownMenu from "../DropdownMenu";

const GenreTracks = ({ genreIndex }) => {
  const {
    getTracksByGenre,
    setTracks,
    setTrackIndex,
    hippopTracks,
    setHippopTracks,
    popTracks,
    setPopTracks,
    kpopTracks,
    setKpopTracks,
  } = useContext(PlayerContext);

  const genreMap = [
    {
      tracks: hippopTracks,
      setTracks: setHippopTracks,
    },
    {
      tracks: popTracks,
      setTracks: setPopTracks,
    },
    {
      tracks: kpopTracks,
      setTracks: setKpopTracks,
    },
  ];

  const genreTracks = genreMap[genreIndex].tracks;
  const genreTracksLess = genreMap[genreIndex].tracks.slice(0, 7);
  const genreSetTracks = genreMap[genreIndex].setTracks;

  const [showMore, setShowMore] = useState(false);
  const [activedIndex, setActivedIndex] = useState(null);

  useEffect(() => {
    const getGenreTracks = async () => {
      try {
        const randomIndex = randomInt(5);
        const result = await getTracksByGenre(
          30,
          genresList[genreIndex].items[randomIndex].trackId,
          genresList[genreIndex].items[randomIndex].artistID,
          genresList[genreIndex].genre
        );

        const popularityLimit = genreIndex === 2 ? 50 : 65;
        // Filter out the low popularity tracks
        const filteredTracks = result.tracks.filter(
          (track) => track.popularity >= popularityLimit
        );
        const tracks = [...filteredTracks];
        genreSetTracks(tracks);
      } catch (error) {
        console.log(error);
      }
    };

    if (genreTracks === genreTracksPlaceholder.tracks) {
      getGenreTracks();
    }
  }, []);

  const handleMenu = (index) => {
    if (activedIndex === index) {
      setActivedIndex(null);
    } else {
      setActivedIndex(index);
    }
  };

  const handlePlayTrack = (index) => {
    setTracks(genreTracks);
    setTrackIndex(index);
  };

  const responsiveGrid =
    "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 pr-5 gap-y-6";

  return (
    <div className="w-full h-auto">
      <div className="w-full flex justify-between items-end mt-2 mb-5">
        <p className="font-bold text-2xl">{genresList[genreIndex].title}</p>
        <p
          className="text-light7 hover:text-lightB font-medium cursor-pointer pr-5"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? "Show Less" : "Show More"}
        </p>
      </div>
      <div className={`${responsiveGrid}`}>
        {(showMore ? genreTracks : genreTracksLess).map((track, index) => (
          <div key={index} className="col-span-1 relative">
            <div
              className="absolute top-[4px] right-[4px] opacity-30 hover:opacity-100 bg-[#00000051] backdrop-blur-xl p-1 rounded-full cursor-pointer"
              onClick={() => handleMenu(index)}
            >
              <img src={assets.more} alt="" className="w-4" />
            </div>
            {activedIndex === index ? (
              <DropdownMenu track={track} />
            ) : (
              <div></div>
            )}

            <div
              className="cursor-pointer text-lightC hover:text-white"
              onClick={() => handlePlayTrack(index)}
            >
              <img
                src={track.album.images[0].url}
                alt=""
                className="w-full aspect-square object-cover rounded-md"
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

export default GenreTracks;
