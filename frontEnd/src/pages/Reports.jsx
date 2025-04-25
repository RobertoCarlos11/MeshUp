import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { GetReports } from "../services/reportService";
import { GetLikes } from "../services/likeService";
import Logo from "../assets/Logo.png";
import { getComments } from "../services/commentService";
import { GetAllCategories } from "../services/categoryService";
import { getSavesOfPost } from "../services/collectionService";

function Reports() {

    const user = JSON.parse(localStorage.getItem("user"));
    const [categories, setCategories] = useState();
    const [posts, setPosts] = useState();
    const [activeTab, setActiveTab] = useState("likes");
    const [category, setCategory] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [finalDate, setFinalDate] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const FetchCategories = async () => {
            const CategoriesFound = await GetAllCategories();
            setCategories(CategoriesFound.data);
        }
        FetchCategories();
    }, []);
    useEffect(() => {
        setPosts(null);
        const FetchReport = async () => {
            const Report = await GetReports(user.Email, category, status, startDate === "" ? null : startDate, finalDate === "" ? null : finalDate);

            switch (activeTab) {
                case "likes":
                    const postsWithLikes = await Promise.all(
                        Report.data.map(async (data) => {
                            const LikesFound = await GetLikes("post", data.PostId, null);
                            return { ...data, count: LikesFound.data.count };
                        })
                    );
                    postsWithLikes.sort((a, b) => b.count - a.count);
                    setPosts(postsWithLikes);
                    break;

                case "comments":
                    const postsWithComments = await Promise.all(
                        Report.data.map(async (data) => {
                            const CommentsFound = await getComments(data.PostId);
                            return { ...data, count: CommentsFound.data.length };
                        })
                    );
                    postsWithComments.sort((a, b) => b.count - a.count);
                    setPosts(postsWithComments);
                    break;

                case "saves":
                    const postsWithSaves = await Promise.all(
                        Report.data.map(async (data) => {
                            const SavesFound = await getSavesOfPost(data.PostId);
                            return { ...data, count: SavesFound.data.count };
                        })
                    );

                    postsWithSaves.sort((a, b) => b.count - a.count);
                    setPosts(postsWithSaves);
                    break;
            }
        }

        FetchReport();
        console.log(posts);
    }, [activeTab, category, status, startDate, finalDate]);

    const handleTableTitle = () => {
        switch (activeTab) {
            case "likes":
                return "LIKED";
            case "saves":
                return "SAVED";
            case "comments":
                return "COMMENTED";
        }
    }
    return (
        <div className="h-screen">
            <Header />
            <div className="flex flex-row border-b-2 border-solid m-10 mt-0 mb-0">
                <div className="w-1/3"></div>
                <div className="text-base m-5 mb-0">
                    <button onClick={() => setActiveTab("likes")} className={`cursor-pointer ${activeTab === "likes" ? "bg-[var(--primary-color)]" : ""} border-t-2 border-x-2 border-solid border-[var(--primary-color)] font-semibold rounded-t-sm p-3 pl-8 pr-8 m-2 mb-0`}>LIKES</button>
                    <button onClick={() => setActiveTab("saves")} className={`cursor-pointer ${activeTab === "saves" ? "bg-[var(--primary-color)]" : ""} border-t-2 border-x-2 border-solid border-[var(--primary-color)] font-semibold rounded-t-sm p-3 pl-8 pr-8 m-2 mb-0`}>SAVES</button>
                    <button onClick={() => setActiveTab("comments")} className={`cursor-pointer ${activeTab === "comments" ? "bg-[var(--primary-color)]" : ""} border-t-2 border-x-2 border-solid border-[var(--primary-color)] font-semibold rounded-t-sm p-3 pl-8 pr-8 m-2 mb-0`}>COMMENTS</button>
                </div>
            </div>

            <div className="h-full flex m-10 mt-0">

                <div className="w-1/3 border-r-2 border-solid p-5">
                    <h1 className="text-base font-bold m-2">Filter By</h1>

                    <div className="flex flex-col m-2">

                        <div className="flex flex-col m-2">
                            <label htmlFor="Category" className="font-semibold">Date</label>
                            <div className="flex justify-between items-center space-x-1 mt-2 mb-2">
                                <input onChange={e => setStartDate(e.currentTarget.value)} type="date" className="text-sm border-1 border-solid border-[var(--primary-color)] rounded-sm p-1" />
                                <input onChange={e => setFinalDate(e.currentTarget.value)} type="date" className="text-sm border-1 border-solid border-[var(--primary-color)] rounded-sm p-1" />
                            </div>
                        </div>
                        <div className="flex flex-col m-2">
                            <label htmlFor="Category" className="font-semibold">Category</label>
                            <select value={category} onChange={e => setCategory(e.currentTarget.value)} id="Category" className="text-sm bg-[var(--background-color)] border-1 border-solid border-[var(--primary-color)] rounded-sm p-1 mt-2 mb-2">
                                <option value="0">All Categories</option>
                                {categories && categories.map(category =>
                                    <option key={category.CategoryId} value={category.CategoryId}>{category.Category_Name}</option>
                                )}
                            </select>
                        </div>
                        <div className="flex flex-col m-2">
                            <label htmlFor="Status" className="font-semibold">Status</label>
                            <div className="flex justify-left">
                                <div className="flex space-x-2 m-2">
                                    <label class="relative flex items-center cursor-pointer" for="active">
                                        <input checked={status === true} onClick={() => setStatus(prev => prev === true ? null : true)} name="framework" type="radio" className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border checked:border-comp-1 transition-all" id="active" />
                                        <span className="absolute bg-[var(--primary-color)] w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        </span>
                                    </label>
                                    <span>Public</span>
                                </div>
                                <div className="flex space-x-2 m-2">
                                    <label class="relative flex items-center cursor-pointer" for="inactive">
                                        <input checked={status === false} onClick={() => setStatus(prev => prev === false ? null : false)} name="framework" type="radio" className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border checked:border-comp-1 transition-all" id="inactive" />
                                        <span className="absolute bg-[var(--primary-color)] w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        </span>
                                    </label>
                                    <span>Private</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full p-10">
                    <div className="bg-[var(--transparent-color)] w-full rounded-sm p-10">
                        <div className="border-1 border-solid border-[var(--primary-color)] border-b-0 rounded-sm">
                            <h1 className="flex font-semibold justify-center text-xl m-4">MOST {handleTableTitle()} POSTS</h1>

                            <table className="w-full text-base">
                                <tr className="justify-evenly bg-secondary font-semibold flex py-2">
                                    <th className="text-center w-full">POST</th>
                                    <th className="text-center w-full">CATEGORY</th>
                                    <th className="text-center w-full">{activeTab.toUpperCase()}</th>
                                </tr>
                                {posts ?
                                    posts.length > 0 ?
                                        posts.map(post =>
                                            <tr key={post.PostId} className=" flex justify-evenly py-3 border-b-1 border-[var(--primary-color)]">
                                                <td className="text-center w-full">{post.Post_Name}</td>
                                                <td className="text-center w-full">{post.category.Category_Name}</td>
                                                <td className="text-center w-full">{post.count}</td>
                                            </tr>
                                        ) :
                                        (<div className="text-comp-1 border-b-1 border-[var(--primary-color)] text-center p-10">
                                            No Posts Found
                                        </div>):
                                        (

                                            <div className="text-4xl animate-bounce flex items-center justify-center">
                                                <img src={Logo} className="w-1/6" alt="LogoName" />
                                                <p>Loading...</p>
                                            </div>
                                        )
                                    }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Reports;