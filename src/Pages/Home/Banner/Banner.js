import React from "react";
import chair from "../../../assets/images/chair.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import bannerBg from '../../../assets/images/bg.png';

const Banner = () => {
  return (
    <div className="hero h-[75vh]"
    style={{
      background:`url(${bannerBg})`,
      backgroundPosition:'center',
      backgroundSize:'cover'
    }}
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={chair}
          className="rounded-lg shadow-2xl lg:w-1/2 w-full"
          alt=""
        />
        <div>
          <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <PrimaryButton>Get Started</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Banner;
