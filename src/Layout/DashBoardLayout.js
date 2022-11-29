import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  

  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 gap-4 w-80 text-base-content">
            <li>
              <Link className="font-bold text-xl text-gray-600" to="/dashboard">My Appointments</Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link className="font-bold text-xl text-gray-600" to="/dashboard/allUsers">All Users</Link>
                </li>
                <li>
                  <Link className="font-bold text-xl text-gray-600" to="/dashboard/addDoctor">Add A Doctor</Link>
                </li>
                <li>
                  <Link className="font-bold text-xl text-gray-600" to="/dashboard/manageDoctors">Manage Doctors</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
