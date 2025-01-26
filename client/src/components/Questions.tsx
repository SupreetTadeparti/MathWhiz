import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  answer: string;
}

interface QuestionsProps {
  questionData: Question[];
}

const Questions: React.FC<QuestionsProps> = ({ questionData }) => {
  const navigate = useNavigate();
  let [currQuestion, setCurrQuestion] = useState(0);
  let [selectedOption, setSelectedOption] = useState<string | null>(null);
  let [score, setScore] = useState(0);

  const selectOption = (option: string) => {
    setSelectedOption(option);
    const correct = option === questionData[currQuestion].answer;
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currQuestion === questionData.length - 1) {
        setCurrQuestion(currQuestion + 1);
      } else {
        setCurrQuestion(currQuestion + 1);
        setSelectedOption(null);
      }
    }, 3000);
  };

  const getOptionClass = (option: string) => {
    if (selectedOption === null) return "option";
    if (option === questionData[currQuestion].answer)
      return "option bg-green-500";
    if (option === selectedOption) return "option bg-red-500";
    return "option bg-red-500";
  };

  const handleHomeRedirect = () => {
    navigate("/generator");
  };

  if (currQuestion >= questionData.length) {
    return (
      <div className="min-h-screen w-full flex flex-col gap-8 items-center justify-center bg-gray-800/50">
        <div className="text-6xl text-white font-bold text-center">
          Your Score: {score} / {questionData.length}
        </div>
        <button
          onClick={handleHomeRedirect}
          className="text-3xl px-8 py-5 cursor-pointer text-white rounded border-[var(--primary)] border-4 hover:bg-[var(--primary)] transition-colors hover:border-transparent"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-800/50 py-10">
      <div className="w-full max-w-7xl px-4">
        <div className="text-white text-3xl md:text-4xl font-bold text-center mb-16">
          {questionData[currQuestion].question}
        </div>
        <div className="grid grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
          {Object.entries(questionData[currQuestion].options).map(([key, value]) => (
            <div
              key={key}
              onClick={() => selectOption(key)}
              className={`${getOptionClass(key)} p-8 rounded-lg text-white text-xl text-center cursor-pointer transition-all duration-300 hover:scale-105 w-full min-h-[120px] flex items-center justify-center`}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;