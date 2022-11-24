import { format } from "date-fns";
import React from "react";

const BookingModal = ({ treatment, selectedDate }) => {
  const { name, slots } = treatment; // treatment is appoint options, just different name
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
          <form className="grid grid-cols-1 gap-3 mt-10" action="">
            <input
              type="text"
              value={format(selectedDate, "PP")}
              disabled
              className="input w-full input-bordered"
            />
            <select className="select select-bordered w-full">
             {
                 slots.map(slot => <option value={slot} key={slot}>{slot}</option>)
             }
            </select>
            <input
              type="text"
              placeholder="Type here"
              className="input w-full input-bordered"
            />
            <input
              type="text"
              placeholder="Type here"
              className="input w-full input-bordered"
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
