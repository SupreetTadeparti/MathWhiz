interface QuestionsProps {
  questionData: object;
}

const Questions: React.FC<QuestionsProps> = ({ questionData }) => {
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
