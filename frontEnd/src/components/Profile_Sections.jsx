import { useEffect, useState } from "react";
import User_Posts from "../components/User_Posts";
import User_Collections from "./User_Collections";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PostCard from "./PostCard";
import { getCollections } from "../services/collectionService";

function Profile_Sections({Posts = null}){
    const userLoggedIn = JSON.parse(localStorage.getItem("user"));
    const [activeTab, setActiveTab] = useState("posts");
    const [collections, setCollections] = useState();

    useEffect(() => {
        const FetchCollectionsUser = async () => {
            const CollectionsFound = await getCollections(userLoggedIn.Email);
            setCollections(CollectionsFound.data);
        }
        FetchCollectionsUser();
    }, [userLoggedIn.Email]);

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

        {activeTab === "posts" && Posts?.length > 0 && (
            <div className="flex flex-wrap justify-center space-x-auto m-10">
                {Posts && Posts.map(post => 
                    <PostCard Post={post}/>
                )}
            </div>
        )}

        {activeTab === "collections" && collections?.length > 0 &&(
            <div className="flex flex-wrap justify-center space-x-auto m-10">
                {collections && collections.map(collection =>
                    <User_Collections Collection = {collection}/>
                )}
            </div>
        )}

        </>
    )
}
export default Profile_Sections;