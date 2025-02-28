import Header from "../components/Header"
import Footer from "../components/Footer"
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import Button_Style from "../components/Button_Style";
import { useEffect, useState } from "react";
import { GetAllCategories } from "../services/categoryService";
import { GetAllPosts } from "../services/postService";
import Logo from "../assets/Logo.png";


function Home(){
    
    const [categoriesFound, setCategoriesFound] = useState();
    const [postsFound, setPostsFound] = useState();
    const [search, setSearch] = useState("");
    const [categorySelected,setCategorySelected] = useState(0);
    
    const FetchCategories = async () => 
    {
        const categories = await GetAllCategories();
         setCategoriesFound(categories.data);
    }
    
    const FetchPosts = async (categoryId) => {
        setPostsFound(null);
        const posts = await GetAllPosts(categoryId);
        setPostsFound(posts.data);
    }
    useEffect(() => {        
        FetchCategories();
    },[]);

    useEffect(() => {
        FetchPosts(categorySelected);
    },[categorySelected]);

    const handleSearch = (word) => 
    {
        setSearch(word);
    }

    const handleCategoryChange = (CategoryId) => 
    {
        setCategorySelected(prevCategory => prevCategory === CategoryId ? 0 : CategoryId);
    }
    
    return (
        <div className="">
            <Header SearchChanged={handleSearch}/>
            <div className="flex text-sm space-x-auto mr-5 ml-5">
                {categoriesFound && categoriesFound.map((category) => (
                        <Button_Style 
                        onClick={() => handleCategoryChange(category.CategoryId)}
                        key={category.CategoryId} 
                        className="m-2 p-3 pb-1 pt-1"
                        inverted={categorySelected === category.CategoryId}
                        >{category.Category_Name} 
                        </Button_Style>
            ))}
            </div>
            <div className="flex flex-wrap justify-center space-x-auto m-5">
                {postsFound ? postsFound.filter(item => search === "" || item.Post_Name.toLowerCase().includes(search.toLowerCase())).map(item => {
                    return <PostCard key = {item.PostId} Post={item}/>
                }):
                <div className="text-4xl animate-bounce flex items-center justify-center">
                <img src={Logo} className="w-1/4" alt="LogoName"/>
                <p>Loading...</p>
                </div>}
            </div>
            <Pagination/>
            <Footer/>
        </div>
    )
}
export default Home;