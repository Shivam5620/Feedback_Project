import { BrowserRouter, Route, Routes } from "react-router-dom";
// user routing starts

import Layoutmain from './component/Layoutmain'
import Homepage from "./component/Homepage";
import Loginmain from "./component/Loginmain";
import Registermain from "./component/Registermain";
import Userreviewform from "./component/Userreviewform";
// import './reg.css'
import Logoutmain from "./component/Logoutmain";
// user routing ends

// ______________________________________________________

// admin routing starts

import Adminlayout1 from "./Admin/Adminlayout1";
import Adminlogin from "./Admin/Adminlogin";
import Adminlogout from "./Admin/Adminlogout";
import Product from "./Admin/Product";
import Brand from "./Admin/Brand";
import Customer from "./Admin/Customer";
import Updatebrand from "./Admin/Updatebrand";
import Delete from "./Admin/Delete";
import Updateproduct from "./Admin/Updateproduct";
import Deleteproduct from "./Admin/Deleteproduct";
import Deletecustomer from "./Admin/Deletecustomer";
import Adminreview from "./Admin/Adminreview";

// admin routing ends
function Appmain() {
    return (<>
        <BrowserRouter>
            <Routes>
                {/* user routing starts */}

                <Route path="/" element={<Layoutmain />}>
                    <Route index element={<Registermain />} />
                    <Route path="userreview/:product_id" element={<Userreviewform />} />
                    <Route path="homepage" element={<Homepage />} />
                <Route path="registrationpage" element={<Registermain />} />
                <Route path="loginpage" element={<Loginmain />} />
                <Route path="logoutpage" element={<Logoutmain />} />
                </Route>

                {/* user routing ends */}


                {/* admin routing starts */}


                <Route path="/" element={<Adminlayout1 />}>
                    <Route index element={<Product />} />
                    <Route path="products" element={<Product />} />
                    <Route path="brand" element={<Brand />} />
                    <Route path="customer" element={<Customer />} />
                    <Route path="adminreview" element={<Adminreview />} />
                    <Route path="delete/:id" element={<Delete />} />
                    <Route path="deleteproduct/:id" element={<Deleteproduct />} />
                    <Route path="deletecustomer/:id" element={<Deletecustomer />} />
                    <Route path="updateproduct/:id" element={<Updateproduct />} />
                    <Route path="updatebrand/:id" element={<Updatebrand />} />
                </Route>
                <Route path="adminlogin" element={<Adminlogin />} />
                <Route path="adminlogout" element={<Adminlogout />} />



                {/* admin routing ends */}
            </Routes>
        </BrowserRouter>
    </>)
}
export default Appmain;