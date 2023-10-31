
import React from 'react';
import { Link } from 'react-router-dom';
function Head() {
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <input type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1" />
          <span className="line line2" />
          <span className="line line3" />
        </div>
        <ul className="menu-items">
          <li>
            <Link to="homepage">Home</Link>
          </li>
          <li className="nav-item">
            {sessionStorage.uid == null ?
              <Link className="nav-link" to="/loginpage"> Login</Link> :
              <Link className="nav-link" to="/logoutpage">Logout</Link>}
          </li>
          <li>

            <Link to="registrationpage">Register</Link>
          </li>

          {/* <li><Link to="/admin">Dashboard</Link>
      <ul className='subclass'>
        <li>Admin</li>
        <li>Logout</li>
        </ul>
        </li> */}
        </ul>
        <h1 className="logo"><img src="../img/logo.png" width={60} style={{ marginTop: "-25px" }} alt="" /></h1>
      </div>
    </nav>

  );
}

export default Head;