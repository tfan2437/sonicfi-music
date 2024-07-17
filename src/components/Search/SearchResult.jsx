import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const SearchResult = () => {
  const navigate = useNavigate();
  const { searchResult } = useContext(PlayerContext);

  return (
    <div className="w-full h-full pt-[65px]">
      <hr className="opacity-25" />
      <div className="w-full h-auto">
        <div className="w-full">
          <p className="font-bold text-3xl mt-2 mb-5 text-light7">Top Result</p>
          {/* Artists */}
          <p className="font-bold text-2xl mt-2 mb-5">Artists</p>
          <div className="grid grid-cols-7 gap-4 pr-5 gap-y-6">
            {searchResult.artists.items
              .filter((artist) => artist.images && artist.images.length > 0)
              .slice(0, 7)
              .map((artist, index) => (
                <div
                  key={index}
                  className="col-span-1 text-lightC hover:text-white cursor-pointer px-4"
                  onClick={() => navigate(`/artist/${artist.id}`)}
                >
                  <img
                    src={artist.images}
                    alt=""
                    className="w-full aspect-square rounded-full object-cover opacity-100 hover:opacity-55"
                  />
                  <p className="font-medium text-md text-nowrap overflow-hidden mt-2">
                    {artist.name}
                  </p>
                </div>
              ))}
          </div>
          {/* Albums */}
          <p className="font-bold text-2xl mt-5 mb-5">Albums</p>
          <div className="grid grid-cols-7 gap-4 pr-5 ">
            {searchResult.albums.items.slice(0, 7).map((album, index) => (
              <div
                key={index}
                className="col-span-1"
                onClick={() => navigate(`/album/${album.id}`)}
              >
                <div className="cursor-pointer text-lightC hover:text-white">
                  <img
                    src={album.images}
                    alt=""
                    className="w-full aspect-square object-cover rounded-md hover:opacity-55"
                  />
                  <div className="w-full">
                    <p className="font-medium text-md text-nowrap overflow-hidden">
                      {album.name}
                    </p>
                    <p className="font-light text-xs text-nowrap overflow-hidden text-light7">
                      {album.artists.map((artist) => artist.name).join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Tracks */}
          <p className="font-bold text-2xl mt-5 mb-5">Songs</p>
          <div className="grid grid-cols-8 gap-2 pr-5 ">
            {searchResult.tracks.items.map((track, index) => (
              <div
                key={index}
                className="col-span-2"
                onClick={() => navigate(`/album/${track.album.id}`)}
              >
                <div className="flex items-center bg-dark2 hover:bg-dark3 text-lightC hover:text-white rounded-sm cursor-pointer p-1 ">
                  <img
                    src={track.album.images[0].url}
                    alt=""
                    className="w-20 aspect-square object-cover rounded-sm"
                  />
                  <div className="w-full pl-2">
                    <p className="font-medium text-md text-nowrap overflow-hidden">
                      {track.name}
                    </p>
                    <p className="font-light text-xs text-nowrap overflow-hidden text-light7">
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
