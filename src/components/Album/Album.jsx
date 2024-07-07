import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { assets } from "../../assets/assets";
import { formatMinutesAndSeconds, formatPlayCount } from "../../utils/format";
import { albumResult, albumMetaResult } from "../../data/albumObject";

const Album = () => {
  const { getTrackPreviewById, setTrack } = useContext(PlayerContext);

  const albumData = albumResult.albums[0];
  const albumTracks = albumResult.albums[0].tracks.items;

  const albumColor =
    albumMetaResult.data.album.coverArt.extractedColors.colorRaw.hex;
  const startingColor = albumColor + "c1";

  albumData.album_type;
  albumResult.albums[0].release_date;

  albumResult.albums[0].artists[0].id;
  albumResult.albums[0].artists[0].name;

  albumResult.albums[0].copyrights[0].text;
  albumResult.albums[0].label;

  albumResult.albums[0].images[0].url;

  // traks url

  albumResult.albums[0].tracks.items; // tracks array

  albumResult.albums[0].tracks.items[0].artists; // artists array

  albumResult.albums[0].tracks.items[0].name; // song name
  albumResult.albums[0].tracks.items[0].duration_ms; // duration need to format
  albumResult.albums[0].tracks.items[0].preview_url;
  albumResult.albums[0].tracks.items[0].id;

  // onClick={() => getTrackPreviewById(item.track.id)}

  return (
    <div
      className="w-full h-full"
      style={{
        background: `linear-gradient(to bottom, ${startingColor}, #000000)`,
      }}
    >
      <div className="w-full h-[350px] flex items-end">
        <div className=" w-full flex">
          <img
            src={albumData.images[0].url}
            alt=""
            className="w-[290px] h-[290px] pl-4 pb-4 object-cover relative"
          />
          <div className="ml-4 relative w-full">
            <p className="text-white font-black text-[70px] absolute bottom-[-10px]">
              {albumData.name}
            </p>
          </div>
        </div>
        <div className="mr-5 mb-[10px] bg-[#ffffff] rounded-full w-16 h-16 flex justify-center items-center cursor-pointer hover:opacity-75">
          <img src={assets.play_black_icon} alt="" className="w-5" />
        </div>

        <div className="absolute bottom-[-10px] left-5 w-[100%] flex items-center justify-between"></div>
      </div>
      <div className="pl-4 grid grid-cols-3 sm:grid-cols-6 mt-4 mb-2 text-[#7a7a7a] text-sm">
        <p className="col-span-5 inline-flex">
          <b className="mr-4 text-[#a7a7a7] font-bold w-[30px] inline-flex justify-center">
            #
          </b>
          <div className="w-14 mr-5"></div>
          Title
        </p>
        <div className="w-full  items-center justify-end hidden md:flex">
          <img
            className="w-[14px] opacity-55 text-right mr-10 hidden md:block"
            src={assets.clock_icon}
            alt=""
          />
        </div>
      </div>
      <hr className="opacity-25" />
      {albumTracks.map((item, index) => (
        <div
          className="pl-4 grid grid-cols-3 sm:grid-cols-6 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff26] cursor-pointer"
          key={index}
          onClick={() => getTrackPreviewById(item.id)}
        >
          <div className="col-span-5 flex items-center">
            <b className="mr-4 text-[#a7a7a7] font-bold w-[30px] inline-flex justify-center">
              {item.track_number}
            </b>
            <div>
              <p className="text-white font-semibold text-nowrap">
                {item.name}
              </p>
              <p className="text-[#717171] font-light text-[14px] text-nowrap ">
                {item.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </div>

          <p className="text-[15px] text-right pr-6 hidden md:block">
            {formatMinutesAndSeconds(item.duration_ms)}
          </p>
        </div>
      ))}
      <hr className="opacity-25" />
    </div>
  );
};

export default Album;
