interface CoverButtonProps {
  content: string;
}

const CoverButton: React.FC<CoverButtonProps> = ({ content }) => {
  return (
    <button className="generate-btn w-80 text-lg text-white py-3 px-5 cursor-pointer border-white border-3">
      {content}
    </button>
  );
};

export default CoverButton;
