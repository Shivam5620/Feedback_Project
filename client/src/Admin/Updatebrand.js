import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Updatebrand()
{
  const { id } = useParams();
    
    const [brand_name,setBrand_name]=useState('')
    const navigate=useNavigate()        //The useNavigate hook from "react-router-dom" is used to get the navigate function, which can be used to programmatically navigate to different pages.


    //This function is called when the user clicks the "Update" button.

    //It sends an HTTP PUT request to the server at http://127.0.0.1:2000/brands/${id} with the brand data.
    
    const postdata3=(e)=>
    {
        axios.put(`http://127.0.0.1:2000/brands/${id}`,{
            brand_name
        })
        
        navigate('/brand')      //navigates to the "/brand" route.
        e.preventDefault()
    }
    return(<>
    
    <div className="container">
    <div className="container2">
    <div className="text-bg-primary p-3">
    <h3>Update Brand</h3>
    <h4>Brand Id { `${id}`}</h4>
    <div className="mb-3">
    <input type="text" className="form-control cursor-left" id="exampleFormControlInput1" placeholder="Update brand_name"  onChange={(e) => setBrand_name(e.target.value)}/></div>
        



        
    <button type="button" className="btn btn-warning" onClick={(e) => postdata3(e)}>Update Brands</button></div>
    </div>
    </div>
   
    </>)
}
export default Updatebrand;