import TopArtists from "./TopArtists";
import GenreKpop from "./GenreTracks";

const DisplayRecommendations = () => {
  return (
    <div className="w-full h-full pt-[65px]">
      <hr className="opacity-25" />
      <TopArtists />
      <hr className="opacity-25 mt-10" />
      <GenreKpop />
      <hr className="opacity-25 mt-10" />

      <hr className="opacity-25 mt-10" />
    </div>
  );
};

export default DisplayRecommendations;
