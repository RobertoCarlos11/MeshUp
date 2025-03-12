import Header from "../components/Header"
import Footer from "../components/Footer"
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import Button_Style from "../components/Button_Style";
import { useEffect, useState } from "react";
import { GetAllCategories } from "../services/categoryService";
import { GetAllPosts } from "../services/postService";
import Logo from "../assets/Logo.png";


function Home() {

    const postsPerPage = 6;
    const [categoriesFound, setCategoriesFound] = useState();
    const [postsFound, setPostsFound] = useState();
    const [displayedPosts, setDisplayedPosts] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [categorySelected, setCategorySelected] = useState(0);

    const FetchCategories = async () => {
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
    }, []);

    useEffect(() => {
        FetchPosts(categorySelected.CategoryId);
    }, [categorySelected]);

    const handleSearch = (word) => {
        setSearch(word);
    }

    const handleCategoryChange = (category) => {
        setCategorySelected(prevCategory => prevCategory === category ? 0 : category);
        console.log(category);
    }

    const handleIndexChanged = async (index) => {
        setCurrentPage(index);
    }

    useEffect(() => {
        const startIndex = (currentPage - 1) * postsPerPage;
        setDisplayedPosts(postsFound?.slice(startIndex, startIndex + postsPerPage));
    }, [currentPage, postsFound]);

    return (
        <div className="">
            <Header SearchChanged={handleSearch} />
            <div className="flex text-sm space-x-auto mx-5">
                {categoriesFound && categoriesFound.map((category) => (
                    <Button_Style
                        onClick={() => handleCategoryChange(category)}
                        key={category.CategoryId}
                        className="m-2 p-3 pb-1 pt-1"
                        inverted={categorySelected === category}
                    >{category.Category_Name}
                    </Button_Style>
                ))}
            </div>
            {categorySelected !== 0 && (
                <div className="mx-10">
                    <h2 className="text-md font-bold">
                        Category Description:
                    </h2>
                    <p className="text-xs">{categorySelected.Category_Description}</p>
                </div>
            )
            }
            <div className="flex flex-wrap justify-center space-x-auto m-5">
                {displayedPosts ? (
                    displayedPosts.length > 0 ? (
                        displayedPosts
                            .map(item => item && <PostCard key={item.PostId} Post={item} />)
                    ) : (
                        <p className="text-center text-xl text-gray-500">No posts found.</p>
                    )
                ) : (
                    <div className="text-4xl animate-bounce flex items-center justify-center">
                        <img src={Logo} className="w-1/4" alt="LogoName" />
                        <p>Loading...</p>
                    </div>
                )}
            </div>
            <Pagination Pages={postsFound?.length && Math.ceil(postsFound?.length / postsPerPage)} indexSelectedChanged={handleIndexChanged} />
            <Footer />
        </div>
    )
}
export default Home;