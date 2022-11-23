import React from "react";

const PatientSayCard = ({comment}) => {

    const {feedback, img, name, address} = comment;

  return (
    <div className="card shadow-lg">
      <div className="card-body items-center text-center">
        <p className="text-start mb-5">{feedback}</p>
        <div className="flex w-full justify-start items-center gap-5 ">
          <img src={img} className='w-[75px] border-primary rounded-full border-2' alt="" />
          <div className="text-start">
              <p className="text-xl font-semibold text-accent">{name}</p>
              <p>{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSayCard;
