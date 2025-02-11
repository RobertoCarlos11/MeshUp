import { Popover,PopoverButton, PopoverPanel } from "@headlessui/react";
import LogoName from "../assets/LogoName.png";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DefaultPfp from "../assets/no-user.png";
import HeaderComponent from "./HeaderComponent";
import {Link} from "react-router-dom";

function Header(){
    return(
    <>
       {/* <nav className="cursor-pointer flex flex-row justify-between items-center p-3 text-xl ml-5 mr-5">
            <img src={LogoName} alt="LogoName" className="h-10 w-auto m-2"/> |
            
            <div className="relative m-2 w-[380vw] max-w-[90%]"> 
                <SearchOutlinedIcon className="absolute transform left-2 translate-y-1 text-[var(--primary-color)]"/>
                <input type="text" placeholder="Search" className="w-full text-sm text-opacity-10 border-2 border-solid border-[var(--primary-color)] rounded-sm p-1 pl-9"/>
            </div> 
            
            <HeaderComponent/>
            
            <img src={DefaultPfp} alt="ProfilePic" className="cursor-pointer h-10 w-auto m-2 rounded-full"/>
        </nav> */}


            <nav className="flex flex-row justify-center items-center p-3 text-xl relative overflow-visible">
                <Link to="/Home" className="w-1/8 m-2"><img src={LogoName} alt="LogoName"/></Link>
                <input type="text" placeholder="Search" className="w-400 text-base text-opacity-10 border-2 border-solid border-[var(--primary-color)] rounded-sm m-2 p-2 pb-1 pt-1"/> |
                <HeaderComponent/>
                <Popover className="relative">
                <PopoverButton >
                <img src={DefaultPfp} alt="ProfilePic" className="h-10 w-auto m-2 rounded-full"/>
                </PopoverButton>
                <PopoverPanel className="absolute right-0 w-40 h-auto bg-primary rounded-md p-2 z-50 text-xs flex flex-col space-y-2">
                    <Link to="/Profile">
                        See Profile
                    </Link>
                    <Link>
                        History
                    </Link>
                    <Link to="/">
                        Log Out
                    </Link>
                </PopoverPanel>
                </Popover> 
            </nav>

    </>
    )
}
export default Header;