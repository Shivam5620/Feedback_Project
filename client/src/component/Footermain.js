import { Link } from "react-router-dom";
let Footer = () => {

    var d=new Date();
    var year=d.getFullYear();
    
    return (
        <>

            {/* footer section start */}
            <footer id="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <Link to="index.html">

                            </Link>
                            <div className="footer-about">
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text
                                    ever since the 1500s,
                                </p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="useful-link">
                                <h2>Useful Links</h2>
                                <img
                                    src="./assets/images/about/home_line.png"
                                    alt=""
                                    className="img-fluid"
                                />
                                <div className="use-links">
                                    <li>
                                        <Link to="home">
                                            <i className="fa-solid fa-angles-right" /> Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="about">
                                            <i className="fa-solid fa-angles-right" /> About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="gallery">
                                            <i className="fa-solid fa-angles-right" /> Gallery
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="contact">
                                            <i className="fa-solid fa-angles-right" /> Contact
                                        </Link>
                                    </li>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="social-links">
                                <h2>Follow Us</h2>
                                <img src="./assets/images/about/home_line.png" alt="" />
                                <div className="social-icons">
                                    <li>
                                        <Link to="https://www.facebook.com/r.php">
                                            <i className="fa-brands fa-facebook-f" /> Facebook
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://www.instagram.com/accounts/emailsignup/">
                                            <i className="fa-brands fa-instagram" /> Instagram
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://www.linkedin.com/signup">
                                            <i className="fa-brands fa-linkedin-in" /> Linkedin
                                        </Link>
                                    </li>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="address">
                                <h2>Address</h2>
                                <img
                                    src="./assets/images/about/home_line.png"
                                    alt=""
                                    className="img-fluid"
                                />
                                <div className="address-links">
                                    <li className="address1">
                                        <i className="fa-solid fa-location-dot" /> Kolathur ramankulam-
                                        Malappuram Dt Kerala 679338
                                    </li>
                                    <li>
                                        <Link to="">
                                            <i className="fa-solid fa-phone" /> +91 90904500112
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="">
                                            <i className="fa-solid fa-envelope" /> mail@1234567.com
                                        </Link>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <section id="copy-right">
                <div className="copy-right-sec">
                    <i className="fa-solid fa-copyright" />&nbsp;
                    {year} All Rights Reserved, Created  🖤 by
                    Shivam Birla.
                </div>
            </section>
        </>


    )
}
export default Footer;