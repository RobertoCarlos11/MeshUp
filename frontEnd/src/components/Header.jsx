import LogoName from "../assets/LogoName.png";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DefaultPfp from "../assets/no-user.png";
import HeaderComponent from "./HeaderComponent";
import {Link} from "react-router-dom";
function Header(){
    return(
    <>
        <nav className="cursor-pointer flex flex-row justify-between items-center p-3 text-xl ml-5 mr-5">
            <img src={LogoName} alt="LogoName" className="h-10 w-auto m-2"/> |
            <div class="relative m-2">
                <SearchOutlinedIcon className="absolute transform left-2 translate-y-1 text-[var(--primary-color)]"/>
                <input type="text" placeholder="Search" className="w-380 text-sm text-opacity-10 border-2 border-solid border-[var(--primary-color)] rounded-sm p-1 pl-9"/>
            </div> |
            <HeaderComponent/>
            <img src={DefaultPfp} alt="ProfilePic" className="cursor-pointer h-10 w-auto m-2 rounded-full"/>
        </nav>
    </>
    )
}
export default Header;