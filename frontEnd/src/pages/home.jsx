import Header from "../components/Header"
import Footer from "../components/Footer"
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";

function Home(){
    
    return (
        <div className="">
            <Header/>
            <div className="flex text-sm space-x-auto mr-5 ml-5">
                <button className="bg-[var(--primary-color)] cursor-pointer rounded-sm m-2 p-3 pb-1 pt-1">Category</button>
                <button className="border-2 border-solid border-[var(--primary-color)] cursor-pointer rounded-sm m-2 p-3 pb-1 pt-1">Category</button>
            </div>
            <div className="flex flex-wrap justify-center space-x-auto m-5">
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
            </div>
            <Pagination/>
            <Footer/>
        </div>
    )
}
export default Home;