import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { assets } from "../../assets/assets";
import { formatBioText } from "../../utils/format";

const ArtistAlbums = () => {
  const { artist } = useContext(PlayerContext);

  const placeholderImage = assets.blackImage;

  const artistData = artist.data.artist;
  const artistName = artistData.profile.name;
  const artistBioImage =
    artistData.visuals.gallery.items[0]?.sources[0]?.url || placeholderImage;
  const artistBiography = artistData.profile.biography?.text;
  const artistSocialMediaLinks = artistData.profile.externalLinks?.items;

  return (
    <div className="w-full h-auto pb-8 mt-6">
      <div className="w-full grid grid-cols-10 gap-4">
        <div className="col-span-3 h-[450px]">
          <img
            src={artistBioImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-7 flex flex-col justify-between">
          <div className="">
            <p className="text-white text-[40px] font-bold text-nowrap">
              {artistName}
            </p>
            <p className="h-[260px] overflow-hidden pr-12 text-[#aaaaaa] mb-6">
              {formatBioText(artistBiography)}
            </p>
          </div>
          <div>
            <hr className="opacity-50 mr-12" />

            {artistSocialMediaLinks.length !== 0 && (
              <div className="flex justify-between mr-12 items-center">
                <p className="text-[#aaaaaa] text-[20px] font-semibold">
                  Follow On:
                </p>
                <div className="flex gap-3 mt-2">
                  <a href={artistSocialMediaLinks[0]?.url} target="_blank">
                    <div className="w-8 h-8 bg-[#aaaaaa] hover:bg-[#ffffff] rounded-full flex justify-center items-center ">
                      <img src={assets.facebook} alt="" className="w-5" />
                    </div>
                  </a>
                  <a href={artistSocialMediaLinks[1]?.url} target="_blank">
                    <div className="w-8 h-8 bg-[#aaaaaa] hover:bg-[#ffffff] rounded-full flex justify-center items-center ">
                      <img src={assets.instagram} alt="" className="w-[18px]" />
                    </div>
                  </a>
                  <a href={artistSocialMediaLinks[2]?.url} target="_blank">
                    <div className="w-8 h-8 bg-[#aaaaaa] hover:bg-[#ffffff] rounded-full flex justify-center items-center ">
                      <img src={assets.x} alt="" className="w-4" />
                    </div>
                  </a>
                  <a href={artistSocialMediaLinks[3]?.url} target="_blank">
                    <div className="w-8 h-8 bg-[#aaaaaa] hover:bg-[#ffffff] rounded-full flex justify-center items-center ">
                      <img src={assets.wikipedia} alt="" className="w-[18px]" />
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistAlbums;
