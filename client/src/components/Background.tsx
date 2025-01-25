import React from "react";

const Background: React.FC = () => {
  return (
    <div className="fixed w-full h-full overflow-hidden -z-1 bg-gray-800">
      <div className="absolute text-red-500 text-[30rem] transform -translate-x-1/2 -translate-y-1/2 top-1/10 left-1/10 rotate-10">-</div>
      <div className="absolute text-yellow-500 text-[30rem] transform -translate-x-1/2 -translate-y-1/2 top-2/3 left-3/4 rotate-30">(</div>
      <div className="absolute text-purple-500 text-[22rem] transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-0 rotate-15">Δ</div>
      <div className="absolute text-pink-500 text-[30rem] transform -translate-x-1/2 -translate-y-1/2 top-1/4 left-2/3 -rotate-15">∫</div>
      <div className="absolute text-red-500 text-[30rem] transform -translate-x-1/2 -translate-y-1/2 top-5/6 left-1/5 rotate-45">+</div>
      <div className="absolute text-yellow-500 text-[30rem] transform -translate-x-1/2 -translate-y-1/2 top-1/8 left-2/5 rotate-30">÷</div>
      <div className="absolute text-green-400 text-[30rem] transform -translate-x-1/2 -translate-y-1/2 top-1/5 left-11/12 rotate-30">=</div>
      <div className="absolute text-gray-300 text-[15rem] transform -translate-x-1/2 -translate-y-1/2 top-4/5 left-11/12 -rotate-30">dx</div>
    </div>
  );
};

export default Background;
