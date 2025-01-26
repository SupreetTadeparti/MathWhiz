import React, { useEffect, useState } from "react";

interface BackgroundProps {
  monochrome: boolean;
  progress?: boolean;
}

const phrases = [
  "Crunching numbers faster than a hungry squirrel.",

  "Rendering your reality, one pixel at a time.",

  "Quantum computing, one uncertainty at a time.",

  "Calibrating the space-time continuum...almost there.",

  "Summoning the laws of physics, please stand by.",

  "Triangulating the meaning of life, 3.14% complete.",

  "Searching the universe for more RAM, be patient.",

  "Consulting the oracle of mathematics, the answer is...42.",

  "Compiling your dreams into executable code.",

  "Channeling the ghost in the machine, please hold.",

  "Negotiating with the laws of nature, compromise pending.",

  "Harnessing the power of imagination, standby for liftoff.",

  "Recalculating the universe, GPS signal lost.",

  "Optimizing the fabric of reality, one thread at a time.",
];

const Background: React.FC<BackgroundProps> = ({ monochrome, progress }) => {
  let [progressNums, setProgressNums]: [number[], any] = useState([]);
  let [currProgressNum, setCurrProgressNum] = useState(0);
  let [phraseIndex, setPhraseIndex] = useState(0);
  let [fadeClass, setFadeClass] = useState("animate-fade-in");

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

      return () => {
        clearInterval(birthInterval);
      };
    }
  }, [progress, currProgressNum]);

  useEffect(() => {
    if (progress) {
      let phraseInterval = setInterval(() => {
        setFadeClass("animate-fade-out");
        setTimeout(() => {
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
          setFadeClass("animate-fade-in");
        }, 2000);
      }, 4100);

      return () => clearInterval(phraseInterval);
    }
  }, [progress]);

  return (
    <div
      className={`${
        monochrome && "monochrome"
      } background fixed w-full h-full overflow-hidden -z-1 bg-gray-800`}
    >
      <div
        className={`${
          !progress ? "hidden" : ""
        } phrase text-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-white text-7xl ${fadeClass}`}
      >
        {phrases[phraseIndex]}
      </div>
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
