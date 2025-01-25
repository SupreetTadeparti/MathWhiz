import Background from "../components/Background";
import CoverButton from "../components/CoverButton";

const Landing: React.FC = () => {
  return (
    <>
      <Background />
      <div className="w-full h-full flex flex-col items-center justify-center gap-10">
        <img src="/img/logo.svg" alt="Mathwhiz.biz" />
        <CoverButton content="Join the Fun!" />
      </div>
    </>
  );
};

export default Landing;
