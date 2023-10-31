import axios from "axios";
import { useState } from "react";

function Adminlogin()
{
    const baseurl='http://127.0.0.1:2000/adminlogin';//calling api from nodejs
    const [email,setEmail]=useState('')             //set email
    const [password,setPassword]=useState('')       //setpassword
    const [errmsg,setErrmsg]=useState('')
            //seterrormessage

    //input function to handle input changes
    const input=(e)=>
    {
        if(e.target.id==="username")
        //e.target.id to determine which input field is changed and updates the corresponding state variable
        {
            setEmail(e.target.value)
        }
        else if(e.target.id==='password')
        {
            setPassword(e.target.value)
        }
    }

    //Create a changesubmit function to handle form submission
    const changesubmit=(e)=>
    {
    e.preventDefault();         // to prevent the page from reloading
    alert(email+","+password)       //It displays an alert with the current values of email and password.
    
    if (!email || !password) {
        setErrmsg('Please fill in all fields');
        
        return;
      }
      
    // sends a POST request to the specified baseurl with the email and password data.
    axios.post(baseurl,{
        "email":email,
        password:password
    }).then((res)=>
    {
        console.log(res.data)
        if(res.data.status==='1')           //it sets the user's email in the session storage and redirects to the 'brand' page.
        {
            sessionStorage.setItem('uid',email)
            window.location='brand'
        }
        else
        {
            setErrmsg('invalid email or password')
        }
    }).catch((error)=>
    {
        console.error("error during login",error)
        setErrmsg('error occuring during login')
    })
}
    return(<>
    
    <section className="object-fit-contain border rounded body6">
<div className="body2" >
    <form className="body1">
        <h3>Admin Login form</h3>
       
        
{/* admin username */}

    <div><label>Email:</label> <input type="email" name="email"required id="username" placeholder="Enter Email Id"className="cursor-left"  onChange={input} /></div>

    
{/* admin password  */}
    <div>
        <label for="password">Password:</label>
        <input type="password" name="Password" id="password"required placeholder="Enter Password" className="cursor-left"onChange={input}/>
    </div>

    {/* submit button */}
    <button type="submit" className="btn btn-warning al"onClick={changesubmit}>Submit</button>
    
    {/* error message */}
    
    <div>{errmsg}</div>
    </form>
</div>

</section>

    </>)
}

export default Adminlogin;