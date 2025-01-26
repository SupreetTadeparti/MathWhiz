interface QuestionsProps {
  questionData: object;
}

const Questions: React.FC<QuestionsProps> = ({ questionData }) => {
  return (
    <div>
      <div className="question">questionData</div>
      <div className="options">
        <div className="option"></div>
        <div className="option"></div>
        <div className="option"></div>
        <div className="option"></div>
      </div>
    </div>
  );
};

export default Questions;
