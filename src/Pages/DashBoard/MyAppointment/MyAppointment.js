import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const MyAppointment = () => {
  const { user, logOut } = useContext(AuthContext);

  const url = `http://localhost:5000/bookings?email=${user?.email}`;
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("AccessToken")}`,
        },
      });
      const data = await res.json();
      if(data.message === 'Forbidden access'){
        logOut()
        .then( () =>{

        })
        .catch(err => console.error(err))
      }
      return data;
    },
  });

  if(isLoading){
      return <Loading></Loading>
  }
 

  return (
    <div>
      <h3 className="text-3xl mb-8">My Appointments</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {
              bookings?.map((booking, i) => (
                <tr key={booking._id} className="hover">
                  <th>{i + 1}</th>
                  <td>{booking.patientName}</td>
                  <td>{booking.treatment}</td>
                  <td>{booking.appointmentDate}</td>
                  <td>{booking.slot}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;
