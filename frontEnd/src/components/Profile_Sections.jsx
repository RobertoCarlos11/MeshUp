import { useEffect, useState } from "react";
import User_Collections from "./User_Collections";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import Pagination from "./Pagination";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PostCard from "./PostCard";
import { Link, useParams } from "react-router-dom";
import { getCollections } from "../services/collectionService";

function Profile_Sections({ Posts = null, Collections = null,UserProfile }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const { ProfileId } = useParams();
    const postsPerPage = 6;
    const [activeTab, setActiveTab] = useState("posts");
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedPosts, setDisplayedPosts] = useState();

    useEffect(() => {
        if(activeTab !== "collections")
            return;
        const FetchCollectionsUser = async () => {
            const CollectionsFound = await getCollections(ProfileId);
            setCollections(CollectionsFound.data);
        }
        FetchCollectionsUser();
    }, [ProfileId, activeTab]);

    const handleIndexChanged = (index) => {
        setCurrentPage(index);
    }

    useEffect(() => {
    const startIndex = (currentPage -1) * postsPerPage;
    setDisplayedPosts(Posts?.slice(startIndex,startIndex + postsPerPage))
    },[currentPage,Posts, UserProfile]);
    
    return (
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

            {activeTab === "posts" ? displayedPosts?.length > 0 ? (
                <>
                    <div className="flex flex-wrap justify-center space-x-auto m-10">
                        {displayedPosts && displayedPosts.map(post =>
                            <PostCard key={post.Post_Id} Post={post} />
                        )}
                    </div>
                    {Posts && <Pagination Pages={Math.ceil(Posts?.length / postsPerPage)} indexSelectedChanged={handleIndexChanged} />}

                </>
            ):(
                <div className="flex items-center flex-col">
                <h3 className='text-center text-gray-600'>No posts where found.</h3>
                {UserProfile === user?.Email && <Link to="/Upload" className="text-center text-[var(--primary-color)]">Upload a post.</Link>}
                </div>
            ):null}

            {activeTab === "collections" ? Collections?.length > 0 ? (
                <div className="flex flex-wrap justify-center space-x-auto m-10">
                    {Collections && Collections.map(collection =>
                        <User_Collections key={collection.CollectionId} Collection={collection} />
                    )}
                </div>
            ):(
                <h3 className='text-center text-gray-600'>No collections where found.</h3>
            ):null}

        </>
    )
}
export default Profile_Sections;