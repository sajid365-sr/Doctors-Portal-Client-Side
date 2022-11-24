import React from "react";
import chair from '../../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';


const AppointmentBanner = ({selectedDate, setSelectedDate}) => {

  return (
    <header>
      <div className="hero my-24">
        <div className="hero-content mx-auto flex-col lg:gap-32 gap-16 lg:flex-row-reverse">
          <img
            src={chair}
            className="lg:w-1/2 rounded-lg shadow-2xl"
            alt="Dentist Chair"
          />
          <div>
            <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppointmentBanner;
