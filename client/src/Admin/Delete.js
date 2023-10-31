import axios from "axios";
import { useState } from "react";


import { useNavigate, useParams } from "react-router-dom";


function Delete()
{
    const[brand_id,setBrand_id]=useState('')
    const navigate=useNavigate()
    const { id } = useParams();
    const deletedata=(e)=>
    {
        const confirmed=window.confirm("Are you sure you want to delete this brand?")
        if(confirmed){
        axios.delete(`http://127.0.0.1:2000/brands/${id}`,{
        brand_id
        })
        e.preventDefault()
        navigate('/brand')
    }
    }
    return(<>
    <div className="container">
    <div className="container2">
    <div className="text-bg-success p-3">
    <h3>Delete Brand</h3>
    <input className="form-control" type="text" value={`${id}`} aria-label="readonly input example"onChange={(e) => setBrand_id(e.target.value)} readonly/>

    <button type="button" className="btn btn-danger button2"onClick={(e)=>deletedata(e)}>Delete</button>

    </div>
    </div>
    </div>
    </>)
}
export default Delete;