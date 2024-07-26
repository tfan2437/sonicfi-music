import { useState } from "react";
import { topArtists } from "../../data/topArtists";
import { useNavigate } from "react-router-dom";
import { responsiveGrid } from "../../data/tailwindStyle";

const TopArtists = () => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const topArtistsLess = topArtists.slice(0, 7);

  return (
    <div className="w-full h-auto">
      <div className="w-full flex justify-between items-end mt-2 mb-5">
        <p className="font-bold text-2xl">Top Artists</p>
        <p
          className="text-light7 hover:text-lightB font-medium cursor-pointer pr-5"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? "Show Less" : "Show More"}
        </p>
      </div>
      <div className={`${responsiveGrid}`}>
        {(showMore ? topArtists : topArtistsLess).map((artist, index) => (
          <div
            key={index}
            className="col-span-1 text-lightC hover:text-white cursor-pointer px-4"
            onClick={() => navigate(`/artist/${artist.id}`)}
          >
            <img
              src={artist.avatarImage}
              alt=""
              className="w-full aspect-square rounded-full object-cover opacity-100 hover:opacity-55"
            />
            <p className="font-medium text-md text-nowrap overflow-hidden mt-2">
              {artist.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
