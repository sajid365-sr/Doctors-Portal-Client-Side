
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../Shared/Loading/Loading";

const ManageDoctors = () => {
    const {logOut} = useContext(AuthContext);

    const [deletingDoctor, setDeletingDoctor] = useState(null);
    const closeModal = () =>{
        setDeletingDoctor(null);
    }


  const { data: doctors = [], isLoading, refetch } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/doctors", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          },
        });
        const data = res.json();
        
        // if(data.message){
        //     logOut()
        //     .then( () =>{
    
        //     })
        //     .catch(err => console.error(err))
        //   }
        return data;
      } catch (error) {}
    },
  });

  const handleDeleteDoctor = (doctor) =>{
        
    fetch(`http://localhost:5000/doctors/${doctor._id}`,{
        method:'delete',
        headers:{
            authorization: `Bearer ${localStorage.getItem('AccessToken')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.deletedCount > 0){
            refetch();
            toast.success(`Doctor ${doctor.name} deleted successfully`)
        }
    })
}

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="mb-[8%]">
      <h2 className="text-3xl mb-6">Manage Doctors: {doctors?.length}</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                doctors.length > 1 &&
                doctors.map((doctor, i) => (
                    <tr key={doctor._id} className="hover h-8">
                      <th>{i + 1}</th>
                      <th className="p-2">
                        <div className="avatar">
                          <div className="w-16 mask mask-squircle">
                            <img src={doctor.image} alt="doctor" />
                          </div>
                        </div>
                      </th>
                      <th>{doctor.name}</th>
                      <th>{doctor.email}</th>
                      <th>{doctor.specialty}</th>
                      <th>
                        <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-error btn-sm">
                        Delete
                        </label>
              
                      </th>
                    </tr>
                  ))
            }
          </tbody>
        </table>
      </div>
      {
          deletingDoctor &&
          <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingDoctor.name} it cant't be undone.`}
          closeModal={closeModal}
          successAction={handleDeleteDoctor}
          successBtnName={'Delete'}
          modalData={deletingDoctor}
          ></ConfirmationModal>
      }
    </div>
  );
};

export default ManageDoctors;
