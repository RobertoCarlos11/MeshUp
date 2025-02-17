import Header from "../components/Header"
import Footer from "../components/Footer"
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import Button_Style from "../components/Button_Style";
import Button_Style2 from "../components/Button_Style2";

function Home(){
    
    return (
        <div className="">
            <Header/>
            <div className="flex text-sm space-x-auto mr-5 ml-5">
                <Button_Style className="m-2 p-3 pb-1 pt-1" > Category </Button_Style>
                <Button_Style inverted className="m-2 p-3 pb-1 pt-1"> Category </Button_Style>
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