import axios from "axios";
import { useEffect, useState } from "react";
function Adminreview()
{
    const [tdata, setTdata] = useState([]);   //tdata is an array that will hold customer review data fetched from server,and setTdata is the function to update this state.
    const [currentPage,setCurrentPage]=useState(1);
    const [itemsPerPage,setItemsPerPage]=useState(5);

    const indexOfLastItem=currentPage*itemsPerPage;
    const indexOfFirstItem=indexOfLastItem-itemsPerPage;
    const displayreview=tdata.slice(indexOfFirstItem,indexOfLastItem)

    const totalPages=Math.ceil(tdata.length/itemsPerPage)

    const previous=()=>
    {
      if(currentPage>1)
      {
        setCurrentPage(currentPage-1)
      }

    }
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
    //useEffect is used for making an HTTP request to fetch customer reviews. 
    useEffect(()=>    
    {
        const s=sessionStorage.getItem("uid")
        console.log("session",s);

        //If there's no "uid" in the session storage, it redirects the user to the "adminlogin" page. Otherwise, it proceeds to fetch customer reviews.
        if(s===null)
        {
            window.location='adminlogin'
        }
        else
        {
          //It sends an HTTP GET request to "http://127.0.0.1:2000/review" to fetch customer review data. The retrieved data is then stored in the tdata state using setTdata.
            axios.get("http://127.0.0.1:2000/review").then((res)=>
            {
              setTdata(res.data)
            })
        }
    },[])


// Function to sort data by rating (ascending order)

    const sortByRating = () => {
      const sortedData = [...tdata].sort((a, b) => a.rating - b.rating);
      setTdata(sortedData);
    }


    // Function to sort data by rating (descending order)
  const sortByRatingDescending = () => {
    const sortedData = [...tdata].sort((a, b) => b.rating - a.rating);
    setTdata(sortedData);
  };


    return(<>
    
<h1 className="display-6">List of Customer Reviews on Products</h1> 
  
<div className="container table-responsive ">
{/* sorting buttons */}
<div className="btn-group btn-asc" role="group" aria-label="Basic example">




<button type="button" className="btn btn-success btn-sm btn-asc1 "onClick={sortByRating}>Sort by Min Rating</button>

<button type="button" className="btn btn-warning btn-sm"onClick={sortByRatingDescending}>Sort by Max Rating</button>
</div>



    {/* receive product review data from user */}
    <table className=" table table-bordered object-fit-contain border rounded ">
    <thead>
    <tr>
    <th scope="col">Product Name</th>
    <th scope="col">Product Id</th>
    <th scope="col">Full Name</th>
    <th scope="col">Rating</th>
    <th scope="col">Comment</th>
    </tr>
  </thead>

  {/* mapping of product review data */}
  <tbody>
    
  {displayreview.map((s,index)=>
    (
    <tr key={index}>
    <td>{s.product_name}</td>
    <td>{s.product_id}</td>
    <td>{s.fullname}</td>
    <td>{s.rating}</td>
    <td>{s.comment}</td>
    </tr>

    ))}
    </tbody>
    </table>
    </div>
    <div className="pagination">
    <button type="button" class="btn btn-primary page"onClick={previous} disabled={currentPage===1}>Previous</button>
    <span id="page1">Page {currentPage} of {totalPages}</span>
    <button type="button" class="btn btn-primary page"onClick={next}>Next</button>




    </div>
    </>)
}
export default Adminreview;