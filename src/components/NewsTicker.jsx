import React from "react";

const NewsTicker = ({ text }) => {
  return (
    <div
      className="w-full overflow-hidden bg-yellow-100 text-black border-orange-300
 border-y-4 py-3"
    >
      <div className="ticker-track">
        <span className="ticker-text">{text}</span>
        <span className="ticker-text">{text}</span>
        <span className="ticker-text">{text}</span>
      </div>
    </div>
  );
};

export default NewsTicker;
