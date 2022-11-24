import React from "react";
import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form';

const SignUp = () => {

const {register, handleSubmit, formState: {errors}} = useForm();
const handleSignUP = (data) =>{
    console.log(data)
}


  return (
    <div className="h-[800px]  flex justify-center items-center">
      <div className="w-96 p-7 shadow-xl rounded-2xl">
        <h2 className="text-3xl text-center">SignUp</h2>
        <form onSubmit={handleSubmit(handleSignUP)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text text-lg">Name</span>{" "}
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...register('name', {required: true})}
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
              {...register('email', {required: 'Email is required'})}
            />
            {errors.email && <span className="text-error">{errors.email?.message}</span>}
            {}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text text-lg">Password</span>{" "}
            </label>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              {...register('password', {required: 'Password is required', minLength:{value: 6, message:'Password must be at least 6 character long'}})}
            />
            {errors.password && <span className="text-error">{errors.password?.message}</span>}
          </div>

          <input
            className="btn mt-8 btn-accent w-full"
            value="Login"
            type="submit"
          />
        </form>
        <p className="text-sm mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary font-semibold">
            Please login
          </Link>
        </p>
        <div className="divider my-4">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default SignUp;
