import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Homepage() {
  // Component state variables
  const [brand, setBrand] = useState([]);
  const [brandid, setBrandid] = useState();
  const [prod, setProd] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState();
  const [image, setImage] = useState([]);
  const [averageRatings, setAverageRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedImages = image.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(image.length / itemsPerPage);
  const handleNextPage = () => {
    if (currentPage === totalPages) {
      setCurrentPage(1)
    }
    else if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const generateStarIcons = (averageRating) => {
    const stars = [];
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa fa-star"></i>);
    }

    // Add half-star if needed
    if (hasHalfStar) {
      stars.push(<i key="half" className="fa fa-star-half-o"></i>);
    }

    // Add empty stars to reach a total of 5 stars
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      stars.push(<i key={i} className="fa fa-star-o"></i>);
    }

    return stars;
  };



  //useEffect hook is responsible for fetching data from a specific API(fetching brands) endpoint when the component is mounted or when certain dependencies change
  useEffect(() => {
    const s = sessionStorage.getItem('uid')
    console.log("session", s)
    if (s === null) {
      window.location = 'loginpage'
    }



  }, [])







  useEffect(() => {
    const getbrand = async () => {
      const res = await fetch("http://127.0.0.1:2000/brands");
      const getbr = await res.json();
      console.log(getbr);
      setBrand(await getbr)
    }
    getbrand();
  }, []);

  //to updates the brandid state variable based on the user's selection of a brand from a dropdown list..
  const handlebrand = (event) => {
    const getbrandid = event.target.value;
    console.log(getbrandid);
    setBrandid(getbrandid)
  };


  //useEffect hook is responsible for fetching data from a specific API(fetching products by brand_id) endpoint when the component is mounted or when certain dependencies change

  useEffect(() => {
    const getprod = async () => {
      const prodd = await fetch(`http://127.0.0.1:2000/productlist/${brandid}`);
      const getprod = await prodd.json();
      setProd(await getprod);
    };

    if (brandid) {
      getprod();
    }

  }, [brandid]);


  //useEffect hook is responsible for fetching data from a specific API(fetching all images by productlist) endpoint when the component is mounted or when certain dependencies change

  useEffect(() => {
    const getAllImages = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:2000/productlist`);
        const imageData = await response.json();
        setImage(imageData);
      }
      catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    getAllImages();
  }, []);

  //updates the selectedProductId state variable based on the user's selection of a product from a dropdown list.

  const handleproduct = (event) => {
    const selectedProductId = event.target.value;
    setSelectedProductId(selectedProductId);
    console.log(selectedProductId);
  };



  //This function is called when a button is clicked. It makes a request to an API endpoint with a selected product ID and updates the image state variable with the response data. This is likely used to display details of a specific product.
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedProductId) {
      try {
        const response = await fetch(
          `http://127.0.0.1:2000/productbyimg/${selectedProductId}`);
        const data = await response.json();
        setImage(data);
        console.log(data)
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };




  //useEffect hook fetches average ratings data from http://127.0.0.1:2000/averageRating and stores it in the averageRatings state variable. This hook runs once when the component is mounted ([] as the dependency array).

  useEffect(() => {
    const fetchAverageRatings = async () => {
      try {
        const response = await fetch("http://127.0.0.1:2000/averageRating"); // Use the relative URL
        const data = await response.json();
        setAverageRatings(data);
      } catch (error) {
        console.error("Error fetching average ratings:", error);
      }
    };
    fetchAverageRatings();
  }, []);






  return (
    <>
      <main className="content">
        <div className="d-flex justify-content-center align-items-center mt-5"> <button class="btn btn-dark">OUR PRODUCT</button> </div>
        <div className="d-flex justify-content-center mt-3"> <span class="text text-center">Feedback Best Products Now<br /> in Your Fingertips</span> </div>
        <section className="row justify-content-center mt-4 mb-4 ms-5">
          <div className="form-group col-md-3">
            <select className="form-select" aria-label="Default select example" name="brands" onChange={(e) => handlebrand(e)}>

              <option>Select Brand</option>
              {brand.map((brandget) => (
                <option key={brandget.brand_id} value={brandget.brand_id}>{brandget.brand_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-3">
            <select className="form-select" aria-label="Default select example" onChange={(e) => handleproduct(e)}>
              <option>Select Product</option>
              {prod.map((respr) => (
                <option key={respr.product_id} value={respr.product_id}>{respr.product_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-3">
            <div className="">
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Go for it
              </button>
            </div>
          </div>
        </section>
        <div className="row d-flex justify-content-center ">
          {displayedImages.map((item) => (
            <div className="card" style={{ width: "16rem", margin: "20px" }}>
              <img src={item.product_img_path} className="card-img-top" alt="..." style={{ width: "100px", height: "100px" }} />
              <div className="card-body">
                <h5 className="card-title">{item.product_name}</h5>
                <p className="card-text" >
                  {item.description}
                </p>
                <p className="card-text fw-bold">
                  INR {item.product_price}
                </p>
                {/* <div className="average-rating">
                  Average Rating: {averageRatings.map((rating) => {
                    if (rating.product_id === item.product_id) {
                      const stars = generateStarIcons(rating.averageRating);
                      return (
                        <span key={item.product_id}>
                          {stars}
                        </span>
                      );
                    }
                    return null;
                  })}
                </div> */}


                <Link to={`/userreview/${item.product_id}`}><button className="btn btn-primary review-button">Leave a Review</button></Link>
              </div>
            </div>

          ))}
        </div>
        <div className="container d-flex justify-content-center align-items-center mt-2">
          <div className="pagination text-center">
            <button className="btn btn-primary page" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <span id="page1">Page {currentPage} of {totalPages}</span>
            <button className="btn btn-primary page" onClick={handleNextPage}>Next</button>
          </div>
        </div>
      </main >

    </>
  );
}
export default Homepage;
