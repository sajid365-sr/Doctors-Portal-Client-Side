import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.error(err));
  };
  const menuItems = (
    <React.Fragment>
      <li>
        <Link className="btn btn-ghost" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="btn btn-ghost" to="/about">
          About
        </Link>
      </li>
      <li>
        <Link className="btn btn-ghost" to="/appointment">
          Appointment
        </Link>
      </li>

      <li>
        <Link className="btn btn-ghost" to="/contactUs">
          Contact Us
        </Link>
      </li>

      {user?.uid ? (
        <>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="w-10 rounded-full">
                <img
                  className="rounded-full w-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLavnf_WJPf90tUy9lDUy1y0tSlQDVc4TG0K1QExkL-A&s"
                  alt="user"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link className="btn btn-ghost" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogOut} className="btn btn-ghost">
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <li>
          <Link className="btn btn-ghost" to="/login">
            Login
          </Link>
        </li>
      )}
    </React.Fragment>
  );

  return (
    <div className="navbar lg:justify-around bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={1} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Doctors Portal
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      <label
        htmlFor="dashboard-drawer"
        tabIndex={2}
        className="btn btn-ghost lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
    </div>
  );
};

export default Navbar;
