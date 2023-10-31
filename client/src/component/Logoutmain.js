import { useEffect } from "react";

function Logoutmain()
{
useEffect(()=>
{
    sessionStorage.removeItem("uid")
    window.location='loginpage'
},[])

    return(<>
    
    </>)
}
export default Logoutmain;