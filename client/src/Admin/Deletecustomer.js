import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Deletecustomer()
{
    const [fullname,setFullname]=useState()
    const {id}=useParams()
    const deletedata=(e)=>
    {
        const confirmed=window.confirm("Are you sure you want to remove this customer?")
        if(confirmed)
        {
            axios.delete(`http://127.0.0.1:2000/userreg/${id}`,{
                fullname
            })
            e.preventDefault()
        }
    }
    return(<>
    <div className="container">
    <div className="container2">
    <div className="text-bg-success p-3">
    <h3>Remove Customer</h3>
    <input className="form-control" type="text" value={`${id}`} aria-label="readonly input example"onChange={(e) => setFullname(e.target.value)} readonly/>

    <button type="button" className="btn btn-danger button1"onClick={(e)=>deletedata(e)}>Delete</button>
    </div>

    </div>
    </div> 
    </>)
}
export default Deletecustomer;