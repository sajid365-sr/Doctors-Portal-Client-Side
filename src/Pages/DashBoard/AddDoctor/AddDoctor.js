import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const AddDoctor = () => {

  const { logOut } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const { data: specialties = [], isLoading } = useQuery({
    queryKey: ["specialty"],
    queryFn: async () => {
      const res = await fetch("https://doctors-portal-server-side-gray.vercel.app/appointmentSpecialty");
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleAddDoctor = (data) => {
    const { name, email, specialty } = data;
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          

          const doctor = {
            name,
            email,
            specialty,
            image: imgData.data.url,
          };

          // Save the doctor to the db
          fetch("https://doctors-portal-server-side-gray.vercel.app/doctors", {
            method: "post",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((result) => {
              if(result.message === 'Forbidden access'){
                logOut()
                .then( () =>{
        
                })
                .catch(err => console.error(err))
              }
              if (result.acknowledged) {
                toast.success(`${name} added successfully and a new doctor`);
                navigate("/dashboard/manageDoctors");
              }
            });
        }
      });
  };

  return (
    <div className="w-96 p-7">
      <h2 className="text-4xl">Add A Doctor</h2>

      <form onSubmit={handleSubmit(handleAddDoctor)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            {" "}
            <span className="label-text text-lg">Name</span>{" "}
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            {...register("name", { required: true })}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            {" "}
            <span className="label-text text-lg">Email</span>{" "}
          </label>
          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-error">{errors.email?.message}</span>
          )}
          {}
        </div>

        {/* Photo upload */}
        <div className="flex flex-col mt-5 w-full">
          <span className="text-lg mb-2">Photo</span>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointe hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload Doctors photo</span>
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden"  {...register("image", { required: true })} />
          </label>
          {errors.image && (
            <span className="text-error">{errors.image?.message}</span>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            {" "}
            <span className="label-text text-lg">Specialty</span>{" "}
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            {...register("specialty", { required: true })}
          >
            {specialties?.map((specialty) => (
              <option key={specialty._id} value={specialty.name}>
                {specialty.name}
              </option>
            ))}
          </select>
        </div>
        {/* {signUpError && <span className="text-error">{signUpError}</span>} */}
        <input
          className="btn mt-8 btn-accent w-full"
          value="Add"
          type="submit"
        />
      </form>
    </div>
  );
};

/* 
3 places to store images

 1. Image hosting server (Third party image server)
 2. File system of your server (own server)
 3. mongoDB (database)
*/
export default AddDoctor;
