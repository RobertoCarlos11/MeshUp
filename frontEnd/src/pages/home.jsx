import Header from "../components/Header"
import Footer from "../components/Footer"
import PostCard from "../components/PostCard";

function Home(){
    
    return (
        <div className="bg-color">
            <Header/>
            <div className="text-secondary flex space-x-auto mr-5 ml-5">
                <button className="text-[var(--comp-1-color)] bg-[var(--primary-color)] cursor-pointer rounded-sm m-2 p-4 pb-2 pt-2">Category</button>
                <button className="text-[var(--comp-1-color)] border-2 border-solid border-[var(--primary-color)] cursor-pointer rounded-sm m-2 p-4 pb-2 pt-2">Category</button>
            </div>
            <div className="flex flex-wrap justify-center space-x-auto m-5">
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
            </div>
            <Footer/>
        </div>
    )
}
export default Home;