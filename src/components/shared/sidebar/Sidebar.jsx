import "./sidebar.css";
import React from "react";
import {
  LineStyle,
  SupervisorAccount
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/admins" className="link">
              <li className="sidebarListItem">
                <SupervisorAccount className="sidebarIcon" />
                Admins
              </li>
            </Link>
            <Link to="/patients" className="link">
              <li className="sidebarListItem">
                <img src="/public/icons/patient.png" className="sidebarIcon" />
                Patients
              </li>
            </Link>
            <Link to="/doctors" className="link">
            <li className="sidebarListItem">
              <img src="/public/icons/doctor.png" className="sidebarIcon" />
              Doctors
            </li>
            </Link>
        </ul>
        </div>
      </div>
    </div>
  );
}