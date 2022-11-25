import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useState } from "react";
import BookingModal from "../BookingModal/BookingModal";
import AppointmentOption from "./AppointmentOption";

const AvailableAppointments = ({ selectedDate }) => {
  
  const [treatment, setTreatment] = useState(null);

  const {data: appointmentOptions = []} = useQuery({
    queryKey:['appointmentOptions'],
    queryFn: async() => {
      const res = await fetch('http://localhost:5000/appointmentOptions');
      const data = await res.json();
      return data
    }
  })



  return (
    <section className="mt-16">
      <h4 className="text-secondary text-lg font-bold text-center">
        Available Services on {format(selectedDate, "PP")}
      </h4>
      <div className="grid my-24 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {appointmentOptions.map((option) => (
          <AppointmentOption
            key={option._id}
            appointmentOption={option}
            setTreatment={setTreatment}
          ></AppointmentOption>
        ))}
      </div>

      {treatment && 
      <BookingModal 
      selectedDate={selectedDate} 
      treatment={treatment}
      setTreatment={setTreatment}
      ></BookingModal>}
    </section>
  );
};

export default AvailableAppointments;
