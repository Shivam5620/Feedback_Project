import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Customer()
{
    const [tdata,setTdata]=useState([]);    // //It's a state variable initialized as an empty array using useState. It's used to store data about customers.
   


    
// It checks for a user session in the sessionStorage. If there's no session, it redirects the user to "adminlogin."
    useEffect(()=>
    {
        const s=sessionStorage.getItem('uid')
        console.log("session,s")
        if(s===null)
        {
            window.location="adminlogin"
        }
        else
        {
          //If there is a session, it makes an HTTP GET request to retrieve brand data from "http://127.0.0.1:2000/userreg" and sets the response data in the tdata state.
            axios.get('http://127.0.0.1:2000/userreg').then((res)=>
            {
                setTdata(res.data)
            })
        }
    },[])
    return(<>
    <h1 className="display-6">List of Customers</h1> 
    <div className="container table-responsive">
      {/* display customers in tabular form */}
    <table className="table table-bordered">
    <thead>
    <tr>
      <th scope="col">Full Name</th>
      <th scope="col">Email Id</th>
      <th scope="col">Mobile Number</th>
      <th scope="col">Operation</th>
    </tr>
    </thead>
    <tbody>

    {/* The customer data from the tdata state is mapped to table rows. */}

    {tdata.map((s,index)=>
    (
    <tr key={index}>
      
      <td>{s.fullname}</td>
      <td>{s.email}</td>
      <td>{s.mobileno}</td>
      {/* delete customers link */}
      <td>
      <Link to={`/deletecustomer/${s.fullname}`}><button type="button" className="btn btn-info button1">Delete</button></Link>
    </td>
    </tr>
     ))}
    </tbody>
    </table>

    </div>










    </>)
}
export default Customer;