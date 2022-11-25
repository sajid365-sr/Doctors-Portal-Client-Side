import { format } from "date-fns";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";

const BookingModal = ({ treatment, selectedDate, setTreatment }) => {
  const { name, slots } = treatment; // treatment is appoint options, just different name
    const date = format(selectedDate, 'PP');
    const {user} = useContext(AuthContext);

    
    const handleBooking = (event) =>{
        event.preventDefault();
        const form = event.target;
        const patientName = form.name.value;
        const email = form.email.value;
        const slot = form.slot.value;
        const phone = form.phone.value;
        

        const booking = {
            appointmentDate : date,
            treatment:name,
            patientName,
            slot,
            email,
            phone,
        }

        fetch('http://localhost:5000/bookings', {
          method:'POST', 
          headers:{
            'content-type':'application/json',
          },
          body:JSON.stringify(booking)
        })
        .then(res => res.json())
          .then(data =>{
            console.log(data)
            if(data.acknowledged){
              setTreatment(null);
              toast.success('Booking confirmed')

            }

          })
        
        
    }

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl font-bold">{name}</h3>
          <form onSubmit={handleBooking} className="grid grid-cols-1 gap-3 mt-10" action="">
            <input
              
              type="text"
              value={date}
              disabled
              className="input w-full input-bordered"
            />
            <select name="slot" className="select select-bordered w-full">
              {slots.map((slot,i) => (
                <option value={slot} key={i}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              name="name"
              type="text"
              defaultValue={user?.displayName}
              placeholder="Your Name"
              className="input w-full input-bordered"
              required
              disabled
            />
            <input
              name="email"
              type="email"
              defaultValue={user?.email}
              placeholder="Email Address"
              className="input w-full input-bordered"
              required
              disabled
            />
            <input
              name="phone"
              type="phone"
              placeholder="Phone Number"
              className="input w-full input-bordered"
              required
            />
            <br />
            <input
              type="submit"
              className="w-full input-bordered btn btn-accent"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
