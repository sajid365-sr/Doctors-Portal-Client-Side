import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  
  const handleLogin = data =>{
      console.log(data)
  }

  return (
    <div className="h-[800px]  flex justify-center items-center">
      <div className="w-96 p-7 shadow-xl rounded-2xl"> 
        <h2 className="text-3xl text-center">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>

          <div className="form-control w-full max-w-xs">
            <label className="label"> <span className="label-text text-lg">Email</span> </label>
            <input type='text' className="input input-bordered w-full max-w-xs" {...register("email")} />            
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label"> <span className="label-text text-lg">Password</span> </label>
            <input type='password' className="input input-bordered w-full max-w-xs" {...register("password")} />   
            <label className="label"> <span className="label-text mb-4 text-sm">Forgot Password ?</span> </label>         
          </div>

         
          <input className="btn btn-accent w-full" value='Login' type="submit" />
        </form>
        <p className="text-sm mt-3">New to Doctors Portal? <Link to='/signup' className="text-secondary">Create new account</Link></p>
        <div className="divider my-4">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default Login;
