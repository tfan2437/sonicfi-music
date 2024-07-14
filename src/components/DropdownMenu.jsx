import { assets } from "../assets/assets";

const DropdownMenu = () => {
  const menuSelection = [
    [assets.plus, "Add to playlist"],
    [assets.artist, "Go to artist"],
    [assets.album, "Go to album"],
    [assets.hand, "View lyrics"],
  ];

  return (
    <div className="absolute top-0 right-0 w-auto h-auto z-20 bg-[#00000071] backdrop-blur-2xl rounded-md py-1">
      {menuSelection.map((selection, index) => (
        <div
          key={index}
          className="flex items-center opacity-60 hover:opacity-100 cursor-pointer px-3 py-1"
        >
          <img src={selection[0]} alt="" className="w-4 mr-2" />
          <p className="text-white font-light">{selection[1]}</p>
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
