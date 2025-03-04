import { Popover,PopoverButton, PopoverPanel } from "@headlessui/react";
import LogoName from "../assets/LogoName.png";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DefaultPfp from "../assets/no-user.png";
import HeaderComponent from "./HeaderComponent";
import {Link, useNavigate} from "react-router-dom";
import { useEffect,useState } from "react";

function Header({SearchChanged, UserUpdated = true}){
    const userLoggedIn = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [photoUrl, setPhotoUrl] = useState(null);
    const handleLogOut = () => 
        {
            localStorage.clear("user");
            navigate("/");
        }
        
        useEffect(() => {
        if(!UserUpdated)
                return;
        setUser(userLoggedIn);
        console.log(userLoggedIn);

        if(!userLoggedIn?.Profile_Picture)
        {
            console.log("Photo does not exist");
            return;
        }

        const PhotoArray = new Uint8Array(userLoggedIn.Profile_Picture?.data);
        const PhotoBlob = new Blob([PhotoArray], {type:"image/png"});
        const PhotoUrl = URL.createObjectURL(PhotoBlob);
        setPhotoUrl(PhotoUrl);
        
    },[UserUpdated]);

    const handleWordChange = (e) => 
    {
        SearchChanged(e.currentTarget.value);
    }
    return(
    <>
       <nav className="flex flex-row justify-between items-center p-3 text-xl ml-5 mr-5">
            <Link to="/Home" className="m-2"><img src={LogoName} alt="LogoName"/></Link> |
            
            <div className="relative m-2 w-[380vw] max-w-[90%]"> 
                <SearchOutlinedIcon className="absolute transform left-2 translate-y-1 text-[var(--primary-color)]"/>
                <input type="text" placeholder="Search" onChange={handleWordChange} className="w-full text-sm text-opacity-10 border-2 border-solid border-[var(--primary-color)] rounded-sm p-1 pl-9"/>
            </div>
            
            <HeaderComponent />
            
            {user !== null && user !== undefined && (
                <>
                    <Popover className="relative">
                        <PopoverButton className="h-10 w-10 m-2">
                        <img src={photoUrl !== null ? photoUrl : DefaultPfp} className="cursor-pointer rounded-full w-10 h-10"/>
                        </PopoverButton>

                        <PopoverPanel className="absolute right-0 w-40 h-auto bg-[var(--background-color)] shadow-sm border-2 border-solid border-[var(--primary-color)] rounded-sm p-2 z-50 text-xs flex flex-col space-y-2">
                            <Link to={`/Profile/${userLoggedIn.Email}`}>See Profile</Link>
                            <Link  to="/Search_History">Search History</Link>
                            <p className="cursor-pointer" onClick={handleLogOut}>Log Out</p>
                        </PopoverPanel>
                    </Popover> 
                </>
            )}
        </nav>
    </>
    )
}
export default Header;