import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile_Sections from "../components/Profile_Sections";
import DefaultPfp from "../assets/no-user.png";
import Button_Style from "../components/Button_Style";
import { useState } from "react";

function Profile (){
        const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    
    return(
        <>
        <Header/>
        <div className="bg-[var(--secondary-color)] h-40"></div>

        <div className="flex flex-col justify-center">{/*User Profile info*/}
            <div className="flex justify-center transform -translate-y-1/2">
                <img src={DefaultPfp} alt="ProfilePicture" className="border-4 border-solid border-[var(--background-color)] rounded-full w-45 h-45"/>
            </div>
            <div className="flex flex-col -mt-18 mb-3">
                <span className="text-center text-2xl font-semibold">{user.Username}</span> 
                <div className="flex felx-row justify-center">
                    <div className="m-2">
                        <span className="text-base font-semibold mr-2">00</span>Posts
                    </div>
                    <div className="m-2">
                        <span className="text-base font-semibold mr-2">00</span>Collections
                    </div>
                </div>
            </div>
            <center><Button_Style name="Edit Profile" className="text-sm m-2 p-3 pt-1 pb-1"/></center>
        </div>

        <Profile_Sections/>

        <Footer/>
        </>
    )
}
export default Profile;