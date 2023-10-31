import { useEffect } from "react";

function Adminlogout()
{
    useEffect(()=>
    {
        sessionStorage.removeItem("uid")
        window.location='adminlogin'
    },[])
    return(<>
    </>)
}
export default Adminlogout;