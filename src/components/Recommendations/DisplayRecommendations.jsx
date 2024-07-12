import Recommendation from "./Recommendation";

const DisplayRecommendations = () => {
  return (
    <div className="w-full h-full pt-[65px]">
      <hr className="opacity-25" />
      <Recommendation />
      <hr className="opacity-25 mt-10" />
      <Recommendation />
      <hr className="opacity-25 mt-10" />
      <Recommendation />
    </div>
  );
};

export default DisplayRecommendations;
