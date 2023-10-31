import axios from "axios";
import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Userreviewform()
{
  // Component state variables
    const [rating,setRating]=useState('')
    const [comment,setComment]=useState('')
    const [fullname,setFullname]=useState('')
    const { product_id } = useParams();
    const [product_name, setProductName] = useState("");
    const [selectedRating, setSelectedRating] = useState('');
    useEffect(() => {
      const s = sessionStorage.getItem('uid');
      console.log("session", s);
      if (s === null) {
        // Redirect to login page if session is not available
        window.location='/loginpage';
      }
    }, []);
    // The ratings function updates the rating state when the user selects a rating.  
    const ratings=(event)=>
    {
    setRating(event.target.value)
    setSelectedRating(event.target.value)
    }
    
    // The reviewdata function is called when the user submits the form. It sends a POST request to a specific API endpoint with the review data.

    const reviewdata=(e)=>
    {
    e.preventDefault();
    axios.post(`http://127.0.0.1:2000/review/`,{
    fullname,rating,comment,  product_id, product_name
    })
    alert("Product Review Submitted!!") 
    }


     // The useEffect hook is used to fetch the product name from an API endpoint when the component mounts.
    useEffect(() => {
        axios.get(`http://127.0.0.1:2000/product/${product_id}`).then((res) => {
          setProductName(res.data.product_name);
        });
      }, [product_id]);


      
      
    return(<>
        <section className="object-fit-contain border rounded ">


        <form className="reviews">
        <h4>COMPLETE REVIEW FORM</h4>
    <h5>Welcome {sessionStorage.getItem("uid")}</h5>
    <h4>Product Review</h4>
        <div>
        <label>Product Id:</label>
        <input type="text" name="productid" id="name1"placeholder="Enter Full Name" value={product_id} readOnly/>
    </div>
        

    <div>
      <label>Product Name:</label> 
      <input type="text" name="productname" id="name1" className="cursor-left" placeholder="Product Name" value={product_name} readOnly/>
      </div>


        <div>
        <label>Full Name:</label>
        <input type="text" name="fullname" id="name1"className="cursor-left" placeholder="Enter Full Name" required  onChange={(e) => setFullname(e.target.value)}/>
    </div>


    
        <label>How satisfied are you with your purchase?</label>

 
        <div className="star-rating"><label>Select Ratings:</label><br/>
  {(() => {
    const stars = [];
    for (let value = 1; value <= 5; value++) {
      stars.push(
        <div className="form-check form-check-inline" key={value}>
          
          <input className="form-check-input"
            type="checkbox"
            id={`inlineCheckbox${value}`}
            value={value}
            onChange={ratings}
            checked={selectedRating >= value}
          />
          <label
            className={`form-check-label star-label ${
              selectedRating >= value ? "selected-star" : ""
            }`}
            htmlFor={`inlineCheckbox${value}`}
          >
            <i className="bi bi-star-fill"></i>
          </label>
        </div>
      );
    }
    return stars;
  })()}
</div>












       

  

  

  

  


    Selected Rating:
    <span>{selectedRating}</span>
    <h6>Add a written review (Optional)</h6>

    <textarea placeholder="What did you like or dislike?"onChange={(e)=>setComment(e.target.value)}></textarea>
    <br/>
   
    <button type="button" className="btn btn-warning" onClick={(e) => reviewdata(e)}>Post a Feedback</button>

</form>
</section>
    
</>)
}
export default Userreviewform;