interface CoverButtonProps {
  content: string;
  onClick?: () => void;
}

const CoverButton: React.FC<CoverButtonProps> = ({ content, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="generate-btn w-80 text-2xl text-white py-3 px-5 cursor-pointer border-white border-3"
    >
      {content}
    </button>
  );
};

export default CoverButton;
