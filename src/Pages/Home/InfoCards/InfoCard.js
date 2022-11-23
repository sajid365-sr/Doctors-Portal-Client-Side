import React from "react";

const InfoCard = ({card}) => {

    const {name, description, icon, bgClass} = card;

  return (
    <div className={`card text-white lg:p-6 p-5 md:card-side shadow-xl ${bgClass}`}>
      <figure>
        <img src={icon} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
