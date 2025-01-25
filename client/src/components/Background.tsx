import React from "react";

const Background: React.FC = () => {
  return (
    <div className="fixed w-full h-full overflow-hidden -z-1 bg-gray-800">
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-orange-500 transform -translate-x-1/4 -translate-y-1/4 rotate-45"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-500 transform translate-x-1/2 translate-y-1/2 rotate-30"></div>
      <div className="absolute top-1/3 left-1/3 w-1/4 h-1/4 bg-green-500 transform -translate-x-1/2 -translate-y-1/2 rotate-60"></div>
      <div className="absolute text-red-500 text-9xl transform -translate-x-1/2 -translate-y-1/2 top-5/6 left-1/12">+</div>
      <div className="absolute text-yellow-500 text-9xl transform -translate-x-1/2 -translate-y-1/2 top-3/4 left-9/12">-</div>
      <div className="absolute text-purple-500 text-9xl transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-2/3">+</div>
      <div className="absolute text-pink-500 text-9xl transform -translate-x-1/2 -translate-y-1/2 top-1/4 left-3/4">-</div>
    </div>
  );
};

export default Background;
