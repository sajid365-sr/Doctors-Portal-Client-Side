import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import { toast } from "react-hot-toast";

const MyAppointment = () => {
  const { user, logOut } = useContext(AuthContext);

  const url = `http://localhost:5000/bookings?email=${user?.email}`;
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("AccessToken")}`,
        },
      });
      const data = await res.json();
      if (data.message === "Forbidden access") {
        logOut()
          .then(() => {})
          .catch((err) => console.error(err));
      }
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  // console.log(bookings);

  function cancelBooking(id, treatment) {
    const result = window.confirm(
      "Are you sure you want to cancel the appointment?"
    );

    if (result) {
      fetch(`http://localhost:5000/bookings/cancel/${id}`, {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("AccessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0 && data.acknowledged) {
            refetch();
            toast.success(
              `Your appointment has been cancelled for the treatment ${treatment}`
            );
          }
        });
    }
  }

  return (
    <div>
      <h3 className="text-3xl mb-8">My Appointments: {bookings?.length}</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking, i) => (
              <tr key={booking._id} className="hover">
                <th>{i + 1}</th>
                <td>{booking.patientName}</td>
                <td>{booking.treatment}</td>
                <td>{booking.appointmentDate}</td>
                <td>{booking.slot}</td>
                <td>
                  <button
                    onClick={() => {
                      cancelBooking(booking._id, booking.treatment);
                    }}
                    className="btn btn-sm btn-error"
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  {booking.price && !booking.paid && (
                    <Link to={`/dashboard/payment/${booking._id}`}>
                      <button className="btn btn-sm btn-success">Pay</button>
                    </Link>
                  )}
                  {booking.price && booking.paid && (
                    <span className="text-success">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;
