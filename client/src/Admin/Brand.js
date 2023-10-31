import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function Brand() {
  const [tdata, setTdata] = useState([]);             //It's a state variable initialized as an empty array using useState. It's used to store data about brands.
  const [brand_id,setBrand_id]=useState('')           //These state variables are used to capture user input for brand ID.
    const [brand_name,setBrand_name]=useState('')   
      //These state variables are used to capture user input for brand name.

    const [error, setError] = useState("");

// It checks for a user session in the sessionStorage. If there's no session, it redirects the user to "adminlogin."

  useEffect(() => {
    const s = sessionStorage.getItem("uid");
    console.log("session", s);
    if (s === null) {
      window.location = "adminlogin";
    } else {

      //If there is a session, it makes an HTTP GET request to retrieve brand data from "http://127.0.0.1:2000/brands" and sets the response data in the tdata state.

      axios.get("http://127.0.0.1:2000/brands").then((res) => {
        setTdata(res.data);
      });
    }
  }, []);

  // This function is used to add a new brand.
  const postdata3=(e)=>{
    if (!brand_id || !brand_name) {
      setError("Both Brand ID and Brand Name are required.");
      return;
    }
   
    axios.post('http://127.0.0.1:2000/brands',{
        brand_id,brand_name
          
    }).then(() => {
      // Clear input fields and error message
     
      alert("Brand added successfully!");
    })
    .catch((error) => {
      setError("An error occurred while adding the brand.");
      console.error(error);
    });
    alert(brand_id)         //displays an alert with the brand_id
    e.preventDefault()
          //prevents the default form submission behavior.
  }
  
  
  return (
    <>

    {/* Add brands menu starts */}

<section className="body5">
<h3>Add Brands</h3>

<div>
        <h5>Brand Id:</h5>
        <input type="text" name="brand_id" id="name"className="cursor-left" placeholder="Enter Brand id"  onChange={(e) => setBrand_id(e.target.value)}/>
    </div>


    <div>
        <h5>Brand Name:</h5>
        <input type="text" name="brand_id"className="cursor-left" id="name"placeholder="Enter Brand Name"onChange={(e) => setBrand_name(e.target.value)}/>
    </div>


    <button type="button" className="btn btn-success" onClick={(e) => postdata3(e)}> Add Brand</button>
    {error && <div className="error">{error}</div>}

</section>
 {/* Add Brands Menu ends */}

    <div className="container table-responsive">
    
    {/* display brands in tabular form */}
    <h1 className="display-6">List of Brands</h1>      
    <table className="table table-bordered ">
    <thead>
    <tr>
    <th scope="col">Brand Id</th>
    <th scope="col">Brand Name</th>
    <th scope="col">Operation</th>
    </tr>
    </thead>
    
    
    <tbody>   
      
    {/* The brand data from the tdata state is mapped to table rows. */}
    {tdata.map((s, index) => (
    <tr key={index}>
    <td>{s.brand_id}</td>
    <td>{s.brand_name}</td>

    {/* update and delete links to go to their respective locations */}
    <td>
    <div className="grid1 gap-3">
    <Link to={`/updatebrand/${s.brand_id}`}><button type="button" className="btn btn-danger ">Update</button></Link>
              
    <Link to={`/delete/${s.brand_id}`}><button type="button" className="btn btn-info button2">Delete</button></Link></div>
    </td>
    </tr>
    ))}
    </tbody>
    </table>
    </div>
    </>
  )
}
export default Brand;
