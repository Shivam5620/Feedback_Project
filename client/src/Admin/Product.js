import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Product()
{
    const [tdata,setTdata]=useState([]);    //State variables include tdata (for storing product data), 
    const [product_id,setProduct_id]=useState('')
    const [product_name,setProduct_name]=useState('')
    const [product_img_path,setProduct_img_path]=useState('')
    const [brand_id,setBrand_id]=useState('')
    const [product_price,setProduct_price]=useState()
    const [product_description,setProduct_description]=useState()
    const [currentPage,setCurrentPage]=useState(1);
    const [itemsPerPage,setItemsPerPage]=useState(5)
    const [errormsg,setErrormsg]=useState();
    const indexOfLastItem=currentPage*itemsPerPage;
    const indexOfFirstItem=indexOfLastItem-itemsPerPage;
    const displayproducts=tdata.slice(indexOfFirstItem,indexOfLastItem)

    const totalPages=Math.ceil(tdata.length/itemsPerPage)
const next=()=>
{
    if(currentPage===totalPages)
    {
        setCurrentPage(1)
    }
    else if(currentPage<totalPages)
    {
        setCurrentPage(currentPage+1)
    }
}
const prev=()=>
{
    if(currentPage>1)
    {
        setCurrentPage(currentPage-1)
    }
}
    // It checks for a user session in the sessionStorage. If there's no session, it redirects the user to "adminlogin."
    useEffect(()=>
    {
        const s=sessionStorage.getItem("uid")
        console.log("session",s)
        if(s===null)
        {
            window.location="adminlogin"
        }
        else
        {
            //If there is a session, it makes an HTTP GET request to retrieve brand data from "http://127.0.0.1:2000/productlist" and sets the response data in the tdata state.
            axios.get("http://127.0.0.1:2000/productlist").then((res)=>
            {
                setTdata(res.data)
            })
        }
    },[])
    // This function is called when the "Add Products" button is clicked.
    const postdata4=(e)=>
    {
        if(!product_id||!brand_id||!product_name||!product_img_path||!product_price)
        {
            setErrormsg('All fields are mandatory')
            return;
        }
        axios.post('http://127.0.0.1:2000/productlist',{
            product_id,product_name,product_img_path,brand_id,product_price
        }).then(()=>
        {
            alert("Product added successfully");
        }).catch((error)=>
        {
            setErrormsg("error occured while adding product")
            console.log(error)
        })
        alert(product_id)           //After making the request, it displays an alert with the product_id.
        e.preventDefault()          //prevents the default form submission behavior.
    }
  return(<>


<section className="object-fit-contain border rounded body5">
<h3>Add Products</h3>
    {/* Add Products menu starts  */}
<div>
        <h5>Brand Id:</h5>
        <input type="text" name="brand_id"className="cursor-left" id="name"placeholder="Enter Brand_id"  onChange={(e) => setBrand_id(e.target.value)}/>
    </div>






<div>
        <h5>Product Id:</h5>
        <input type="text" name="product_id" id="name"placeholder="Enter Product_id" className="cursor-left" onChange={(e) => setProduct_id(e.target.value)}/>
    </div>


    <div>
        <h5>Product Name:</h5>
        <input type="text" name="product_name"className="cursor-left" id="name"placeholder="Enter Product Name"  onChange={(e) => setProduct_name(e.target.value)}/>
    </div>


    <div>
        <h5>Product Image:</h5>
        <input type="text" name="product_img" id="name"placeholder="Enter Product Img path"className="cursor-left"  onChange={(e) => setProduct_img_path(e.target.value)}/>
    </div>


    <div>
        <h5>Product Price:</h5>
        <input type="text" name="product_price" id="name"placeholder="Enter Product Price"className="cursor-left"  onChange={(e) => setProduct_price(e.target.value)}/>
    </div>



    <button type="button" className="btn btn-success" onClick={(e) => postdata4(e)}> Add Products</button>
    {errormsg && <div className="error">{errormsg}</div>}

</section>
{/* Add products menu ends */}








    <h1 className="display-6">List of Products</h1> 
    <div className="container table-responsive">


    

    <table className=" table-bordered  ">
    <thead>
    <tr>
    <th scope="col">Product ID</th>
    <th scope="col">Product Name</th>
    <th scope="col">Product Images</th>
    <th scope="col">Product Price</th>
    <th scope="col">Brand ID</th>
    <th scope="col">Operation</th>
    </tr>
    </thead>

    <tbody>
    {/* product data is displayed using a map function. It iterates through the tdata array and generates table rows for each product. */}

    {displayproducts.map((s,index)=>
    (

   
    <tr key={index}>
      
    <td>{s.product_id}</td>
    <td>{s.product_name}</td>
    <td><img src={s.product_img_path} width="100" height="100"/></td>
    <td>{s.product_price}</td>
    <td>{s.brand_id}</td>

    <td>
    <div className="grid2 gap-3">
        <Link to={`/updateproduct/${s.product_id}`}><button type="button" className="btn btn-danger ">Update</button></Link>
    <Link to={`/deleteproduct/${s.product_id}`}><button type="button" className="btn btn-info">Delete</button></Link></div>
    </td>
    </tr>
     ))}
   
    </tbody>
    </table>
    </div>
    <div className="pagination">
    <button type="button" class="btn btn-primary page"onClick={prev} disabled={currentPage===1}>Previous</button>
<span id="page1">Page {currentPage} of {totalPages}</span>
<button type="button" class="btn btn-primary page"onClick={next}>Next</button>


    </div>
    </>)
}
export default Product;