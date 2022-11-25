import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";

const SignUp = () => {
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 
  const handleSignUP = (data) => {
    const { name, email, password } = data;
    setSignUpError("");
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        
        if (user) {
          toast.success("User created successfully");
          
        }
        const userInfo = {
          displayName: name,
        };
        updateUser(userInfo)
          .then(() => {
            navigate('/');
          })
          .catch((err) => {
            setSignUpError(err.message);
            
          });
      })
      .catch((err) => {
        setSignUpError(err.message);
      });
  };

  const handleGoogleSignIn = () =>{
    googleSignIn()
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch(err => {
      console.error(err)
      setSignUpError(err.message)
    })
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

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text text-lg">Password</span>{" "}
            </label>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 character long",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message: "Password must be strong",
                },
              })}
            />
            <p className="text-gray-700 mt-2 text-xs">
              Note: Password should be one Capital letter, one small letter, one
              special character and one number
            </p>
            {errors.password && (
              <span className="text-error">{errors.password?.message}</span>
            )}
          </div>
          {signUpError && <span className="text-error">{signUpError}</span>}
          <input
            className="btn mt-8 btn-accent w-full"
            value="Sign up"
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
        <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default SignUp;
