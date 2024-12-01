import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "../components/Animation.css";

export const Animation: React.FC = () => {
  return (
    <div className="animation-container">
      <DotLottieReact
        src="https://lottie.host/6e207fce-11d0-41f0-bab8-c89075cabd3a/3eSHcVskSv.json"
        loop
        autoplay
        className="lottie-animation"
      />
    </div>
  );
};
