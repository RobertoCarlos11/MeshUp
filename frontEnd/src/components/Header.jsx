import LogoName from "../assets/LogoName.png";
import DefaultPfp from "../assets/no-user.png";
import HeaderComponent from "./HeaderComponent";
import {Link} from "react-router-dom";
function Header(){
    return(
    <>
        <nav className="flex flex-row justify-center items-center p-3 text-xl">
            <Link to="/Home" className="w-1/8 m-2">
            <img src={LogoName} alt="LogoName"/>
            </Link>
            <input type="text" placeholder="Search" className="w-400 text-base text-opacity-10 border-2 border-solid border-[var(--primary-color)] rounded-sm m-2 p-2 pb-1 pt-1"/> |
            <HeaderComponent/>
            <img src={DefaultPfp} alt="ProfilePic" className="h-10 w-auto m-2 rounded-full"/>
        </nav>
    </>
    )
}
export default Header;