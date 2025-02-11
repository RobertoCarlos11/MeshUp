import { useState } from "react";
import User_Posts from "../components/User_Posts";
import User_Collections from "./User_Collections";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

function Profile_Sections(){
    const [activeTab, setActiveTab] = useState("posts");

    return(
        <>
        <div className="flex justify-center border-b-2 border-solid m-10">
            <button
                onClick={() => setActiveTab("posts")}
                className={`cursor-pointer font-semibold rounded-t-sm p-4 pl-6 pr-6 m-2 mb-0 
                ${activeTab === "posts" ? "bg-[var(--primary-color)]" : "border-t-2 border-x-2 border-solid border-[var(--primary-color)]"}`}
            >
            <GridViewOutlinedIcon /> POSTS
            </button>
            <button
                onClick={() => setActiveTab("collections")}
                className={`cursor-pointer font-semibold rounded-t-sm p-4 pl-6 pr-6 m-2 mb-0 
                ${activeTab === "collections" ? "bg-[var(--primary-color)]" : "border-t-2 border-x-2 border-solid border-[var(--primary-color)]"}`}
            >
            <DashboardOutlinedIcon /> COLLECTIONS
            </button>
        </div>

        {activeTab === "posts" && (
            <div className="flex flex-wrap justify-center space-x-auto m-10">
                <User_Posts/>
                <User_Posts/>
                <User_Posts/>
            </div>
        )}

        {activeTab === "collections" && (
            <div className="flex flex-wrap justify-center space-x-auto m-10">
                <User_Collections/>
                <User_Collections/>
                <User_Collections/>
            </div>
        )}

        </>
    )
}
export default Profile_Sections;