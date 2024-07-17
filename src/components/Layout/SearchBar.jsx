import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { PlayerContext } from "../../context/PlayerContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const { getSearch } = useContext(PlayerContext);

  let searchInput = null;

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = searchInput.value;
      getSearch(query);
      const formatedquery = query.toLowerCase().replace(/ /g, "%20");
      navigate(`/searchresult/${formatedquery}`);
    }
  };

  return (
    <div className="w-[220px] h-[33.5px] relative">
      <img
        src={assets.search}
        alt=""
        className="w-[15px] absolute top-[10px] left-[10px] "
      />
      <input
        type="text"
        placeholder="Search..."
        ref={(input) => (searchInput = input)}
        className="w-full h-full bg-black border-[1.5px] border-black hover:border-white pl-[30px] pr-4 rounded-full text-lightB font-normal focus:outline-none"
        onKeyPress={handleEnterPress}
      />
    </div>
  );
};

export default SearchBar;
