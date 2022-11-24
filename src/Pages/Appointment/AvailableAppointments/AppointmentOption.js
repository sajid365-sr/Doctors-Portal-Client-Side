import React from "react";
import SecondaryButton from "../../../components/SecondaryButton/SecondaryButton";
import SecondaryText from "../../../components/SecondaryText/SecondaryText";

const AppointmentOption = ({ appointmentOption }) => {
  const { name, slots } = appointmentOption;

  return (
    <div className="card lg:w-[425px] w-10/12 mx-auto shadow-xl">
      <div className="card-body ">
        <h2 className="card-title justify-center"><SecondaryText>{name}</SecondaryText> </h2>
        <p className="text-center">
            {slots.length > 0 ? slots[0] : 'Try Another Day'}
        </p>
        <p className="text-center"> {slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
        <div className="card-actions mt-8 justify-center">
          <SecondaryButton>Book Appointment</SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
