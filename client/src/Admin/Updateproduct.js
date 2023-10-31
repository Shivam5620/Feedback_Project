import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Updateproduct()
{
    const {id}=useParams();
    
    const [product_name,setProduct_name]=useState('')
    const [product_img_path,setProduct_img_path]=useState('')
    const navigate=useNavigate()
    const postdata4=(e)=>
    {
        axios.put(`http://127.0.0.1:2000/productlist/${id}`,{
            product_name,product_img_path
        })
        
        navigate('/products')
        e.preventDefault()
    }
    return(<>
    
    <div className="container">
    <div className="container2">
    <div className="text-bg-primary p-3">
    <h3>Update Product</h3>
    <h4>Product Id {`${id}`}</h4>
    <div className="mb-3">
    <input type="text" className="form-control cursor-left" id="exampleFormControlInput1" placeholder="Update product_name"  onChange={(e) => setProduct_name(e.target.value)}/>
    </div>

    <div className="mb-3">
    <input type="text" className="form-control cursor-left" id="exampleFormControlInput1" placeholder="Update product_image"  onChange={(e) => setProduct_img_path(e.target.value)}/>
    </div>
    <button type="button" className="btn btn-warning" onClick={(e) => postdata4(e)}>Update Brands</button></div>
    </div>
    </div>
    </>)
}
export default Updateproduct;