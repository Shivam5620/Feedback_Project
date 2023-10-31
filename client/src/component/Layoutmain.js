import { Outlet } from "react-router-dom";


import Head from "./Head";
import Footermain from "./Footermain";

function Layoutmain()
{
    return(<>
    <Head/>
    <section>
        <Outlet/>
    </section>
    <Footermain/>
    </>)
}
export default Layoutmain;