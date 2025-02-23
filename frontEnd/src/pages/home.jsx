import Header from "../components/Header"
import Footer from "../components/Footer"
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import Button_Style from "../components/Button_Style";
import { useEffect, useState } from "react";
import { GetAllCategories } from "../services/categoryService";

function Home(){
    
    const [categoriesFound, setCategoriesFound] = useState();
    
    useEffect(() => {        
        const FetchCategories = async () => 
        {
            const categories = await GetAllCategories();
            console.log(categories);
             setCategoriesFound(categories.data);
        }

        FetchCategories();
    },[]);

    return (
        <div className="">
            <Header/>
            <div className="flex text-sm space-x-auto mr-5 ml-5">
                {categoriesFound && categoriesFound.map((category) => (
                        <Button_Style key={category.CategoryId} className="m-2 p-3 pb-1 pt-1" >{category.Category_Name} </Button_Style>
            ))}
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