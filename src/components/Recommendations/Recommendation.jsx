import { recommendationsResult } from "../../data/recommendationObject";
import { formatMinutesAndSeconds, formatArtistsName } from "../../utils/format";

recommendationsResult.tracks; // tracks array

recommendationsResult.tracks[0].artists; // artists array
recommendationsResult.tracks[0].artists[0].name;

recommendationsResult.tracks[0].duration_ms;

recommendationsResult.tracks[0].name;
recommendationsResult.tracks[0].id;

recommendationsResult.tracks[0].album.images[0].url;

const Recommendation = () => {
  const tracksArray1 = recommendationsResult.tracks.slice(0, 2);
  const tracksArray2 = recommendationsResult.tracks.slice(2, 6);
  const tracksArray3 = recommendationsResult.tracks.slice(6, 10);
  const tracksArray4 = recommendationsResult.tracks.slice(10, 16);

  return (
    <div className="w-full h-auto ">
      <p className="font-bold text-2xl my-2">Hip-Hop</p>
      <div className="grid grid-cols-10 gap-4 pr-5">
        {tracksArray1.map((track, index) => (
          <div key={index} className="col-span-2 text-lightC hover:text-white">
            <div className="relative h-[292px] bg-black cursor-pointer">
              <img
                src={track.album.images[0].url}
                alt=""
                className="w-full h-full object-cover opacity-100 hover:opacity-70"
              />
              <div className="absolute w-full bottom-0 left-0 px-4 pt-2 pb-3">
                <div className="flex justify-between">
                  <p className="font-semibold text-xl text-nowrap overflow-hidden">
                    {track.name}
                  </p>
                  <p className="font-normal text-sm text-light7">
                    {formatMinutesAndSeconds(track.duration_ms)}
                  </p>
                </div>
                <p className="font-light text-sm text-light7 text-nowrap overflow-hidden">
                  {formatArtistsName(track.artists)}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="col-span-3 space-y-3">
          {tracksArray2.map((track, index) => (
            <div
              key={index}
              className="bg-dark2 hover:bg-dark3 h-16 rounded flex items-center cursor-pointer text-lightC hover:text-white"
            >
              <img
                src={track.album.images[0].url}
                alt=""
                className="h-full w-auto object-cover opacity-100 hover:opacity-70 p-1"
              />
              <div className="w-full flex justify-between items-center">
                <div className="w-[300px] ml-1 text-nowrap overflow-hidden">
                  <p className="font-semibold text-xl">{track.name}</p>

                  <p className="font-light text-sm text-light7">
                    {formatArtistsName(track.artists)}
                  </p>
                </div>

                <p className="font-normal text-sm text-light7 pr-2">
                  {formatMinutesAndSeconds(track.duration_ms)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-3 space-y-3">
          {tracksArray3.map((track, index) => (
            <div
              key={index}
              className="bg-dark2 hover:bg-dark3 h-16 rounded flex items-center cursor-pointer text-lightC hover:text-white"
            >
              <img
                src={track.album.images[0].url}
                alt=""
                className="h-full w-auto object-cover opacity-100 hover:opacity-70 p-1"
              />
              <div className="w-full flex justify-between items-center">
                <div className="w-[300px] ml-1 text-nowrap overflow-hidden">
                  <p className="font-semibold text-xl">{track.name}</p>

                  <p className="font-light text-sm text-light7">
                    {formatArtistsName(track.artists)}
                  </p>
                </div>

                <p className="font-normal text-sm text-light7 pr-2">
                  {formatMinutesAndSeconds(track.duration_ms)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-6 gap-3 pr-5 mt-3">
        {tracksArray4.map((track, index) => (
          <div
            key={index}
            className="bg-dark2 hover:bg-dark3 h-auto rounded flex flex-col cursor-pointer text-lightC hover:text-white"
          >
            <img
              src={track.album.images[0].url}
              alt=""
              className="h-full w-auto object-cover opacity-100 hover:opacity-70 px-1 pt-1"
            />
            <p className="font-semibold text-xl text-nowrap overflow-hidden pl-1 mr-2 py-1">
              {track.name}
            </p>
            <p className="font-light text-sm text-light7 text-nowrap overflow-hidden pl-1 pb-2 mr-2">
              {formatArtistsName(track.artists)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
