import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Deleteproduct()
{
    const [product_id,setProduct_id]=useState()
    const {id}=useParams()
    const navigate=useNavigate()
    const deletedata=(e)=>
    {
        const confirmed=window.confirm("Are you sure you want to delete this product?")
        if(confirmed)
        {
            axios.delete(`http://127.0.0.1:2000/productlist/${id}`,{
                product_id,
            })
            e.preventDefault()
            navigate('/products')
        }
    }
    return(<>
    <div className="container">
    <div className="container2">
    <div className="text-bg-success p-3">
    <h3>Delete Product</h3>
    <input className="form-control" type="text" value={`${id}`} aria-label="readonly input example"onChange={(e) => setProduct_id(e.target.value)} readonly/>

    <button type="button" className="btn btn-danger button1"onClick={(e)=>deletedata(e)}>Delete</button>
    </div>
    </div>
    </div>
    </>)
}
export default Deleteproduct;