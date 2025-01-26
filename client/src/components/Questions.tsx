interface QuestionsProps {
  questionData: object;
}

const Questions: React.FC<QuestionsProps> = ({ questionData }) => {
  return (
<<<<<<< HEAD
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
=======
    <div>
      <div className="question">questionData</div>
      <div className="options">
        <div className="option"></div>
        <div className="option"></div>
        <div className="option"></div>
        <div className="option"></div>
>>>>>>> 0c3fa9e06bde70f1d9621cc4717ad151d5033f68
      </div>
    </div>
  );
};

export default Questions;
