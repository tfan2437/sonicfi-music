import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { assets } from "../../assets/assets";
import { formatMinutesAndSeconds } from "../../utils/format";
import { useNavigate, useParams } from "react-router-dom";

const AlbumPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getAlbum,
    album,
    getAlbumMeta,
    albumMeta,
    getArtist,
    artist,
    setTracks,
    setTrackIndex,
  } = useContext(PlayerContext);

  const [formated, setFormated] = useState(false);

  // Album infomation
  const albumData = album.albums[0];
  const albumTracks = album.albums[0].tracks.items;
  const albumMetadata = albumMeta.data.album;
  const albumHexColor =
    albumMetadata.coverArt.extractedColors.colorRaw.hex + "c1";

  // Album and Single on sidebar
  const albums = artist.data.artist.discography.albums.items;
  const singles = artist.data.artist.discography.singles.items;
  const albumList = [...albums, ...singles];
  albumList.sort((a, b) => {
    const dateA = new Date(
      a.releases.items[0].date.year,
      a.releases.items[0].date.month - 1
    );
    const dateB = new Date(
      b.releases.items[0].date.year,
      b.releases.items[0].date.month - 1
    );
    return dateB - dateA;
  });

  const formatTracks = (albumResult) => {
    return new Promise((resolve, reject) => {
      try {
        const formattedItems = albumResult.albums[0].tracks.items.map(
          (track) => ({
            album: {
              id: albumResult.albums[0].id,
              name: albumResult.albums[0].name,
              images: [
                {
                  url: albumResult.albums[0].images[0].url,
                },
              ],
            },
            artists: track.artists.map((artist) => ({
              id: artist.id,
              name: artist.name,
            })),
            duration_ms: track.duration_ms,
            id: track.id,
            name: track.name,
            preview_url: track.preview_url,
          })
        );
        resolve(formattedItems);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handlePlayAlbumTracks = async (index) => {
    if (!formated) {
      const albumTracks = await formatTracks(album);
      setTracks(albumTracks);
      setFormated(true);
    }
    setTrackIndex(index);
  };

  useEffect(() => {
    const updateAlbumPage = async () => {
      await getAlbum(id);
      await getAlbumMeta(id);
    };

    updateAlbumPage();
    setFormated(false);
  }, [id]);

  useEffect(() => {
    const updateAlbumList = async () => {
      const artistId = album.albums[0].artists[0].id;
      await getArtist(artistId);
    };

    updateAlbumList();
  }, [album]);

  return (
    <div className="w-full flex">
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(to bottom, ${albumHexColor}, #000000)`,
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
          <div className="flex 2xl:hidden mr-5 mb-[10px] bg-[#ffffff] rounded-full w-16 h-16 justify-center items-center cursor-pointer hover:opacity-75">
            <img src={assets.playBlack} alt="" className="w-5" />
          </div>
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
            // onClick={() => getTrack(item.id)}
            onClick={() => handlePlayAlbumTracks(index)}
          >
            <div className="col-span-5 flex items-center">
              <b className="mr-4 text-[#a7a7a7] font-bold w-[30px] inline-flex justify-center">
                {item.track_number}
              </b>
              <div>
                <p className="text-white font-semibold text-nowrap">
                  {item.name}
                </p>
                <p className="text-[#999999] font-light text-[14px] text-nowrap ">
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
      <div className="hidden 2xl:flex w-auto h-[100%] flex-col">
        <div
          className="flex flex-col w-[400px] bg-dark2 hover:bg-[#333333e9] mx-2 mt-2 rounded-lg cursor-pointer"
          onClick={() => navigate(`/artist/${album.albums[0].artists[0].id}`)}
        >
          <img
            src={
              albumMetadata.artists.items[0].visuals.avatarImage.sources[0].url
            }
            alt=""
            className="bg-[#0032ff] w-[380px] h-[290px] mt-14 mx-auto object-cover"
          />
          <div className="mx-3 mt-1 text-[#777]">
            <p className="text-3xl font-bold text-white">
              {albumMetadata.artists.items[0].profile.name}
            </p>
            <div className="flex justify-between text-white mt-4 text-sm">
              <p>{albumMetadata.type}</p>
              <p>{albumMetadata.date.isoString.slice(0, 10)}</p>
            </div>

            <p className="text-white text-sm">{albumMetadata.label}</p>
            <hr className="opacity-30 mt-2 mb-1" />
            <p className="text-sm mb-3">
              {albumMetadata.copyright.items[0].text}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[400px] h-auto overflow-hidden bg-dark2  mx-2 mt-2 rounded-lg text-[#a7a7a7] cursor-pointer">
          <p className="text-white font-bold text-lg mt-2 ml-2">Recent</p>
          {albumList.slice(0, 8).map((album, index) => (
            <div
              key={index}
              className="flex items-center hover:bg-[#333333a1] px-1 md:px-2 py-1 md:py-2 rounded"
              onClick={() => navigate(`/album/${album.releases.items[0].id}`)}
            >
              <img
                src={album.releases.items[0].coverArt.sources[0].url}
                alt=""
                className="w-14 rounded-sm"
              />
              <div className="ml-2 w-full">
                <p className="text-white w-[300px] font-medium text-nowrap overflow-hidden mr-2 mt-1">
                  {album.releases.items[0].name}
                </p>
                <p className="flex items-center gap-1 text-[#999999] font-light text-[14px]">
                  {album.releases.items[0].date.year}{" "}
                  <span className="text-[8px]"> • </span>{" "}
                  {album.releases.items[0].type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
