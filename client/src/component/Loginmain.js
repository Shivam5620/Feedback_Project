import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Loginmain = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Renamed errormessage to errorMessage
    const handleInput = (e) => {
        if (e.target.id === "username") {
            setEmail(e.target.value);
        } else if (e.target.id === "password") {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        alert(email + "," + password)
        axios
            .post("http://127.0.0.1:2000/userlogin", {
                'email': email,
                password: password,
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "1") {
                    sessionStorage.setItem("uid", email);
                    window.location = 'homepage';
                } else {
                    setErrorMessage("Invalid email or password");
                }
            })
            .catch((error) => {
                console.error("Error during login:", error);
                setErrorMessage("An error occurred during login");
            });
    };

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}> {/* Use onSubmit event for form submission */}
                <div className="avatar">
                    <i className="material-icons"></i>
                </div>
                <h4 className="modal-title">Login to Your Account</h4>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        required
                        onChange={handleInput}
                        id="username"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required
                        onChange={handleInput}
                        id="password"
                    />
                </div>
                <div className="form-group small clearfix">
                    <label className="checkbox-inline">
                        <input type="checkbox" /> Remember me
                    </label>
                    <Link to="#" className="forgot-link">
                        Forgot Password?
                    </Link>
                </div>
                <p className="error-message">{errorMessage}</p> {/* Display error message */}
                <input
                    type="submit"
                    className="btn btn-primary btn-block btn-lg"
                    value="Login"
                />
            </form>
            <div className="text-center small">
                Don't have an account? <a href="/register">Sign up</a>
            </div>
        </div>
    );
};

export default Loginmain;

