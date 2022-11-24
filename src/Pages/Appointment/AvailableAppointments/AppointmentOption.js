import React from "react";
import SecondaryText from "../../../components/SecondaryText/SecondaryText";

const AppointmentOption = ({ appointmentOption, setTreatment}) => {
  const { name, slots } = appointmentOption;

  return (
    <div className="card lg:w-[425px] w-10/12 mx-auto shadow-xl">
      <div className="card-body ">
        <p className="card-title justify-center"><SecondaryText>{name}</SecondaryText> </p>
        <p className="text-center">
            {slots.length > 0 ? slots[0] : 'Try Another Day'}
        </p>
        <p className="text-center"> {slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
        <div className="card-actions mt-8 justify-center">

        <label 
        htmlFor="booking-modal" 
        className="btn btn-primary bg-gradient-to-r from-secondary to-primary text-white"
        onClick={() => setTreatment(appointmentOption)}
        >BOOK APPOINTMENT</label>
          
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
