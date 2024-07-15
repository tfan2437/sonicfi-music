import React, { useState, useRef } from "react";

const SlideBar = ({ min = 0, max = 100, onChange }) => {
  const [value, setValue] = useState(min);
  const barRef = useRef(null);
  const handleRef = useRef(null);

  const handleDrag = (event) => {
    const bar = barRef.current;
    const handle = handleRef.current;
    const rect = bar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;

    let newValue = Math.round((offsetX / rect.width) * (max - min) + min);
    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;

    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  const startDrag = () => {
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", stopDrag);
  };

  const stopDrag = () => {
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("mouseup", stopDrag);
  };

  return (
    <div className="w-full h-10 flex items-center">
      <div
        ref={barRef}
        className="relative w-full h-2 bg-gray-300 rounded"
        onMouseDown={(e) => {
          handleDrag(e);
          startDrag();
        }}
      >
        <div
          ref={handleRef}
          className="absolute top-0 left-0 w-4 h-4 bg-blue-500 rounded-full cursor-pointer"
          style={{
            transform: `translateX(${((value - min) / (max - min)) * 100}%)`,
          }}
        ></div>
      </div>
      <span className="ml-4">{value}</span>
    </div>
  );
};

export default SlideBar;
