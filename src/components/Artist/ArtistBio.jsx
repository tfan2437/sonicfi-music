import { useContext } from "react";
import { getArtistOverview } from "../../data/artistOverview";
import { PlayerContext } from "../../context/PlayerContext";
import { assets } from "../../assets/assets";

const ArtistAlbums = () => {
  const { formatText } = useContext(PlayerContext);

  const artistInfo = getArtistOverview.data.artist;

  artistInfo.visuals.gallery.items[0].sources[0].url;
  artistInfo.visuals.avatarImage.sources[0].url;
  artistInfo.profile.name;
  artistInfo.profile.biography.text;
  artistInfo.profile.externalLinks.items; // array

  return (
    <div className="w-full h-auto pb-8 mt-6">
      {/* <p className="text-white font-semibold text-2xl mt-4 mb-2 pl-7">About</p> */}
      <div className="w-full flex flex-col md:flex-row">
        <img
          src={artistInfo.visuals.gallery.items[0].sources[0].url}
          alt=""
          className="h-[400px] w-auto ml-6 object-cover"
        />
        <div className="ml-4 flex flex-col justify-between">
          <div>
            <p className="text-white text-[40px] font-bold text-nowrap">
              {artistInfo.profile.name}
            </p>
            <p className="h-[260px] w-full overflow-hidden pr-12 text-[#aaaaaa] mb-6">
              {formatText(artistInfo.profile.biography.text)}
            </p>
          </div>
          <div>
            <hr className="opacity-50 mr-12" />
            <div className="flex justify-between mr-12 items-center">
              <p className="text-[#aaaaaa] text-[20px] font-semibold">
                Follow On:
              </p>
              <div className="flex gap-3 mt-2">
                <a
                  href={artistInfo.profile.externalLinks.items[0].url}
                  target="_blank"
                >
                  <div className="w-8 h-8 bg-[#aaaaaa] hover:bg-[#ffffff] rounded-full flex justify-center items-center ">
                    <img src={assets.facebook} alt="" className="w-5" />
                  </div>
                </a>
                <a
                  href={artistInfo.profile.externalLinks.items[1].url}
                  target="_blank"
                >
                  <div className="w-8 h-8 bg-[#aaaaaa] hover:bg-[#ffffff] rounded-full flex justify-center items-center ">
                    <img src={assets.instagram} alt="" className="w-[18px]" />
                  </div>
                </a>
                <a
                  href={artistInfo.profile.externalLinks.items[2].url}
                  target="_blank"
                >
                  <div className="w-8 h-8 bg-[#aaaaaa] hover:bg-[#ffffff] rounded-full flex justify-center items-center ">
                    <img src={assets.x} alt="" className="w-4" />
                  </div>
                </a>
                <a
                  href={artistInfo.profile.externalLinks.items[3].url}
                  target="_blank"
                >
                  <div className="w-8 h-8 bg-[#aaaaaa] hover:bg-[#ffffff] rounded-full flex justify-center items-center ">
                    <img src={assets.wikipedia} alt="" className="w-[18px]" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistAlbums;
