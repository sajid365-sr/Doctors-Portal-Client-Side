import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const DisplayError = () => {
  const error = useRouteError();
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex justify-center h-[80vh] items-center">
      <div>
        <p className="text-accent text-4xl">Something went wrong !!</p>
        <p className="text-error text-lg">
          Error: {error.statusText || error.message}
        </p>
        <h4 className="text-2xl">
          Please{" "}
          <button onClick={handleLogOut}>
            {" "}
            <span className="text-blue-700 font-medium underline">SignOut</span>
          </button>{" "}
          and login back again.
        </h4>
      </div>
    </div>
  );
};

export default DisplayError;
