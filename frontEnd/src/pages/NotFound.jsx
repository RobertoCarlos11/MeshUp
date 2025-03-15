import Logo from '../assets/Logo.png';
import {Link} from "react-router-dom";

function NotFound()
{
    return(
        <div className="flex justify-center m-100 items-center">
            <img src={Logo} alt="LogoName" className='w-1/10'/>
            <h1 className='text-xl'>404 Oops!! Page Not Found :( <Link to={"/Home"} className='underline'>Go back home.</Link></h1>
        </div>
    )
}

export default NotFound;