import { assets } from "../assets/assets";

const DropdownMenu = ({ artistId, albumId }) => {
  const menuSelection = [
    [assets.plus, "Add to playlist"],
    [assets.artist, "Go to artist"],
    [assets.album, "Go to album"],
    [assets.hand, "View lyrics"],
  ];

  const handleSelect = (index) => {
    if (index === 0) {
      console.log("Add to playlist");
    } else if (index === 1) {
      console.log("Navigate to: " + artistId);
    } else if (index === 2) {
      console.log("Navigate to: " + albumId);
    } else {
      console.log("Show Lyrics");
    }
  };

  return (
    <div className="absolute top-[32px] right-[4px] w-auto h-auto z-20 bg-[#00000071] backdrop-blur-2xl rounded-md">
      {menuSelection.map((selection, index) => (
        <div
          key={index}
          className="flex items-center bg-transparent hover:bg-[#00000040] opacity-60 hover:opacity-100 rounded-md cursor-pointer px-3 py-[6px]"
          onClick={() => handleSelect(index)}
        >
          <img src={selection[0]} alt="" className="w-4 mr-2" />
          <p className="text-white font-light">{selection[1]}</p>
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
