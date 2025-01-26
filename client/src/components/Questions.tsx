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
      <div className="h-full px-25 py-25 flex flex-col gap-15 items-center justify-center">
        <div className="text-6xl text-white font-bold">
          Your Score: {score} / {questionData.length}
        </div>
        <button
          onClick={handleHomeRedirect}
          className="text-3xl mt-5 px-8 py-5 cursor-pointer text-white rounded border-[var(--primary)] border-4 hover:bg-[var(--primary)] transition-colors hover:border-transparent"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="question-container px-25 py-25 flex flex-col gap-15">
      <div className="question">{questionData[currQuestion].question}</div>
      <div className="options grid grid-cols-2 place-items-center gap-y-15">
        <div onClick={() => selectOption("a")} className={getOptionClass("a")}>
          {questionData[currQuestion].options.a}
        </div>
        <div onClick={() => selectOption("b")} className={getOptionClass("b")}>
          {questionData[currQuestion].options.b}
        </div>
        <div onClick={() => selectOption("c")} className={getOptionClass("c")}>
          {questionData[currQuestion].options.c}
        </div>
        <div onClick={() => selectOption("d")} className={getOptionClass("d")}>
          {questionData[currQuestion].options.d}
        </div>
      </div>
    </div>
  );
};

export default Questions;
