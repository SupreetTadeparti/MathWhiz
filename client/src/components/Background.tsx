import React, { useEffect, useState } from "react";

interface BackgroundProps {
  monochrome: boolean;
  progress?: boolean;
}

const Background: React.FC<BackgroundProps> = ({ monochrome, progress }) => {
  let [progressNums, setProgressNums]: [number[], any] = useState([]);
  let [currProgressNum, setCurrProgressNum] = useState(0);

  useEffect(() => {
    if (progress) {
      let birthInterval = setInterval(() => {
        setProgressNums((prev: number[]) => {
          let newNums: number[] = [...prev];
          newNums.push(currProgressNum);
          setCurrProgressNum((currProgressNum % 8) + 1);
          return newNums.slice(-3);
        });
      }, 300);

      return () => clearInterval(birthInterval);
    }
  }, [progress, currProgressNum]);

  return (
    <div
      className={`${
        monochrome && "monochrome"
      } background fixed w-full h-full overflow-hidden -z-1 bg-gray-800`}
    >
      <div
        className={`${
          progressNums.includes(1) ? "active" : ""
        } absolute text-red-500 text-[30rem] transform -translate-x-1/2 -translate-y-1/2 top-1/10 left-1/10 rotate-10`}
      >
        -
      </div>
      <div
        className={`${
          progressNums.includes(2) ? "active" : ""
        } absolute text-yellow-500 text-[30rem] transform -translate-x-1/2 -translate-y-1/2 top-2/3 left-3/4 rotate-30`}
      >
        (
      </div>
      <div
        className={`${
          progressNums.includes(3) ? "active" : ""
        } absolute text-purple-500 text-[22rem] transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/30 rotate-15`}
      >
        Δ
      </div>
      <div
        className={`${
          progressNums.includes(4) ? "active" : ""
        } absolute text-pink-500 text-[30rem] transform -translate-x-1/2 -translate-y-1/2 top-1/4 left-2/3 -rotate-75`}
      >
        ∫
      </div>
      <div
        className={`${
          progressNums.includes(5) ? "active" : ""
        } absolute text-red-500 text-[30rem] transform -translate-x-1/2 -translate-y-1/2 top-5/6 left-1/5 rotate-45`}
      >
        +
      </div>
      <div
        className={`${
          progressNums.includes(6) ? "active" : ""
        } absolute text-yellow-500 text-[30rem] transform -translate-x-1/2 -translate-y-1/2 top-1/8 left-2/6 rotate-30`}
      >
        ÷
      </div>
      <div
        className={`${
          progressNums.includes(7) ? "active" : ""
        } absolute text-green-400 text-[30rem] transform -translate-x-1/2 -translate-y-1/2 top-1/5 left-11/12 rotate-30`}
      >
        =
      </div>
      <div
        className={`${
          progressNums.includes(8) ? "active" : ""
        } absolute text-gray-300 text-[15rem] transform -translate-x-1/2 -translate-y-1/2 top-4/5 left-11/12 -rotate-30`}
      >
        dx
      </div>
    </div>
  );
};

export default Background;
