import { Outlet } from "react-router-dom";
import Adminheader from "./Adminheader";

function Adminlayout1()
{
    return(<>
    <Adminheader/>
    <section>
        <Outlet/>
    </section>
    </>)
}
export default Adminlayout1;