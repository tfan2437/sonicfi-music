import TopArtists from "./TopArtists";
import GenreTracks from "./GenreTracks";

const HomePage = () => {
  return (
    <div className="w-full h-full pt-[65px]">
      <hr className="opacity-25" />
      <TopArtists />
      <hr className="opacity-25 mt-10" />
      <GenreTracks genreIndex={0} />
      <hr className="opacity-25 mt-10" />
      <GenreTracks genreIndex={1} />
      <hr className="opacity-25 mt-10" />
      <GenreTracks genreIndex={2} />
    </div>
  );
};

export default HomePage;
