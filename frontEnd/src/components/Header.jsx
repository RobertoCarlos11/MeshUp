import { Popover,PopoverButton, PopoverPanel } from "@headlessui/react";
import LogoName from "../assets/LogoName.png";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DefaultPfp from "../assets/no-user.png";
import HeaderComponent from "./HeaderComponent";
import {Link} from "react-router-dom";

function Header(){
    return(
    <>
       <nav className="flex flex-row justify-between items-center p-3 text-xl ml-5 mr-5">
            <Link to="/Home" className="m-2"><img src={LogoName} alt="LogoName"/></Link> |
            
            <div className="relative m-2 w-[380vw] max-w-[90%]"> 
                <SearchOutlinedIcon className="absolute transform left-2 translate-y-1 text-[var(--primary-color)]"/>
                <input type="text" placeholder="Search" className="w-full text-sm text-opacity-10 border-2 border-solid border-[var(--primary-color)] rounded-sm p-1 pl-9"/>
            </div> |
            
            <HeaderComponent/>

            <Popover className="relative">
                <PopoverButton className="h-10 w-10 m-2">
                <img src={DefaultPfp} alt="ProfilePic" className="cursor-pointer rounded-full"/>
                </PopoverButton>

                <PopoverPanel className="absolute right-0 w-40 h-auto bg-[var(--background-color)] shadow-sm border-2 border-solid border-[var(--primary-color)] rounded-sm p-2 z-50 text-xs flex flex-col space-y-2">
                    <Link to="/Profile">See Profile</Link>
                    <Link  to="/Search_History">History</Link>
                    <Link to="/">Log Out</Link>
                </PopoverPanel>
            </Popover> 
            
        </nav>
    </>
    )
}
export default Header;