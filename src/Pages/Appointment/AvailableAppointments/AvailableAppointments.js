
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import AppointmentOption from './AppointmentOption';


const AvailableAppointments = ({selectedDate}) => {
const [appointmentOptions, setAppointmentOptions] = useState([]);
useEffect(() =>{
    fetch('AppointmentOptions.json')
    .then(res => res.json())
    .then(data => setAppointmentOptions(data))
},[])


    return (
        <section className='mt-16'>
            <h4 className="text-secondary text-lg font-bold text-center">
                Available Services on {format(selectedDate, 'PP')}
            </h4>
            <div className='grid my-24 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
        {
            appointmentOptions.map(option => <AppointmentOption
            key={option._id}
            appointmentOption={option}
            ></AppointmentOption>)
        }
            </div>
        </section>
    );
};

export default AvailableAppointments;