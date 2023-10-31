import { Link } from "react-router-dom";

function Adminheader()
{
    return(<>

<div className="sticky-top">
    <nav className="navbar navbar-expand-lg bg-body-tertiary  ">
  <div className="container-fluid heads1 ">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNavDropdown">
      <ul className="navbar-nav ">
        <li className="nav-item">
          <a className="nav-link" href="/brand">Brands</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/products">Products</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/customer">Customers</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/adminreview">Review</a>
        </li>




        <li className="nav-item">{sessionStorage.uid==null ?
          <Link className="nav-link"to="/adminlogin">Login</Link>:
          <Link className="nav-link"to="/adminlogout">Logout</Link>}
        </li>
      
       
      </ul>
    </div>
  </div>
</nav>
    

</div>













    

    </>)
}
export default Adminheader;