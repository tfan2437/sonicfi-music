import ArtistsList from "./ArtistsList";
import Recommendation from "./Recommendation";
import Recommendation2 from "./Recommendation2";

const DisplayRecommendations = () => {
  return (
    <div className="w-full h-full pt-[65px]">
      <hr className="opacity-25" />
      <ArtistsList />
      <hr className="opacity-25 mt-10" />
      <Recommendation2 />
      <hr className="opacity-25 mt-10" />
      <Recommendation />
      <hr className="opacity-25 mt-10" />
      <Recommendation />
    </div>
  );
};

export default DisplayRecommendations;
