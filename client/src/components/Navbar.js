import React from "react";
import style from "../Style/NavbarStyle.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const myUserId = localStorage.getItem("userId");
  const navAddTask = location === "/add-task" ? "active" : "";
  const navToday = location === "/today" || location === "/" ? "active" : "";
  const navUpcoming = location === "/upcoming" ? "active" : "";
  const navOverdue = location === "/overdue" ? "active" : "";

  const handleClick = () => {
    try {
      localStorage.clear();
      navigate("/login");
    } catch (error) {}
  };

  return (
    //
    <>
      {myUserId && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/today">
              Task Management
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${navAddTask}`}
                    aria-current="page"
                    to="/add-task"
                  >
                    Add Task
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${navToday}`}
                    aria-current="page"
                    to="/today"
                  >
                    Today
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${navUpcoming}`} to="/upcoming">
                    Upcoming
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${navOverdue}`} to="/overdue">
                    OverDue
                  </Link>
                </li>
                <div className="myButton">
                  <button
                    id="myButton"
                    type="button"
                    class="btn btn-light"
                    onClick={handleClick}
                  >
                    Logout
                  </button>
                </div>
                {/* <li className="nav-item buttonLi">
                  <button
                    id="myButton"
                    type="button"
                    class="btn btn-light"
                    onClick={handleClick}
                  >
                    Logout
                  </button>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
    //
  );
};

export default Navbar;
