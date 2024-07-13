import { useContext, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const ArtistBio = () => {
  const { artist } = useContext(PlayerContext);
  const [showAll, setShowAll] = useState(false);
  const artistDiscography = artist.data.artist.discography;
  const albums = artistDiscography.albums.items;
  const singles = artistDiscography.singles.items;
  const AlbumsAndSingles = [...albums, ...singles];

  AlbumsAndSingles.sort((a, b) => {
    const dateA = new Date(
      a.releases.items[0].date.year,
      a.releases.items[0].date.month - 1
    );
    const dateB = new Date(
      b.releases.items[0].date.year,
      b.releases.items[0].date.month - 1
    );
    return dateB - dateA;
  });

  return (
    <div className="w-full h-auto">
      <div className="flex justify-between items-end">
        <p className="text-white font-semibold text-2xl mt-4 mb-2 pl-7">
          Albums
        </p>
        <p
          className="mr-6 mb-1 text-[#a7a7a7] cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "Show All"}
        </p>
      </div>
      <div className="pl-6 pr-4 grid grid-cols-3 xl:grid-cols-6 gap-1 md:gap-2 items-center text-[#a7a7a7] cursor-pointer pb-4">
        {(showAll ? AlbumsAndSingles : AlbumsAndSingles.slice(0, 6)).map(
          (album, index) => (
            <div
              key={index}
              className="hover:bg-[#ffffff26] px-1 md:px-2 py-1 md:py-2 rounded"
            >
              <img
                src={album.releases.items[0].coverArt.sources[0].url}
                alt=""
                className="w-full"
              />
              <p className="text-white font-medium text-nowrap overflow-hidden mr-2 mt-1">
                {album.releases.items[0].name}
              </p>
              <p className="flex items-center gap-1 text-sm text-[#888888]">
                {album.releases.items[0].date.year}{" "}
                <span className="text-[8px]"> • </span>{" "}
                {album.releases.items[0].type}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ArtistBio;
