import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Login = () => {
  const { register, formState:{ errors }, handleSubmit } = useForm();
  const {signIn} = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');

  const handleLogin = data =>{
     const {email, password} = data;
    setLoginError('');
     signIn(email, password)
     .then((result) => {
         const user = result.user;
         console.log(user);
     })
     .catch(err => {
        setLoginError(err.message) 
        console.error(err)});
  }

  return (
    <div className="h-[800px]  flex justify-center items-center">
      <div className="w-96 p-7 shadow-xl rounded-2xl"> 
        <h2 className="text-3xl text-center">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>

          <div className="form-control w-full max-w-xs">
            <label className="label"> <span className="label-text text-lg">Email</span> </label>
            <input type='email' 
            className="input input-bordered w-full max-w-xs" 
            {...register("email", {required:"Email Address is required"})} 
            />            
            {errors.email && <p className="text-error" role="alert">{errors.email?.message}</p>}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label"> <span className="label-text text-lg">Password</span> </label>
            <input type='password' 
            className="input input-bordered w-full max-w-xs" 
            {...register("password", {required:'Password is required', minLength:{value:6,message:'Password must be at lease 6 character'}})} 
            />   
            <label className="label"> <Link className="label-text mb-4 text-blue-600 text-sm">Forgot Password ?</Link> </label> 
            {errors.password && <p className="text-error" role="alert">{errors.password?.message}</p>}        
          </div>
            {loginError && <span className="text-error">{loginError}</span>}
         
          <input className="btn btn-accent w-full" value='Login' type="submit" />
        </form>
        <p className="text-sm mt-3">New to Doctors Portal? <Link to='/signup' className="text-secondary font-semibold">Create new account</Link></p>
        <div className="divider my-4">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default Login;
