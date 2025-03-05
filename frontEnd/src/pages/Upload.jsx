import Header from "../components/Header";
import Footer from "../components/Footer";
import Scene from "../components/Three/Scene";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import Button_Style from "../components/Button_Style";
import { useEffect, useRef, useState } from "react";
import { GetAllCategories } from "../services/categoryService";
import { CreateModel } from "../services/modelService";
import { CreatePost } from "../services/PostService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Upload() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate(); 
    const [postInfo, setPostInfo] = useState({
        title: "",
        model: null,
        texture: null,
        categorySelected: 1,
        description: "",
        email: user.Email,
    });
    const [categoriesFound, setCategoriesFound] = useState();
    const modelRef = useRef();
    const textureRef = useRef();


    useEffect(() => {
        const FetchCategories = async () => {
            const response = await GetAllCategories();
            setCategoriesFound(response.data);
        }
        FetchCategories();
    }, []);

    const handleUploadModel = () => {
        modelRef.current.click();
    }

    const handleUploadTexture = () => {
        textureRef.current.click();
    }

    const isPostInfoComplete = () => {
        Object.keys(postInfo).every(key => {
            const value = postInfo[key];
            console.log(postInfo[key]);
            return value !== null || value !== "";
        }
        )
    }

    const IsPostComplete = () => {
        return Object.values(postInfo).every(x => x !== null && x !== "");
    }
    const handleUploadPost = async (e) => {

        e.currentTarget.disabled = true;
        if (!IsPostComplete()) {
            e.currentTarget.disabled = false;

            return Swal.fire({
                title: "Warning",
                text: "Please fill out the entire post",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }

        const formData = new FormData();
        formData.append("model", postInfo.model);
        formData.append("texture", postInfo.texture);
        const response = await CreateModel(formData);

        delete postInfo.model;
        delete postInfo.texture;

        const PostInfo = {
            ...postInfo,
            modelId: response.data,
        }
        console.log(PostInfo);

        const responsePost = await CreatePost(PostInfo);

        if (responsePost.status)
            {
                await Swal.fire({
                title: "Success",
                text: "Post succesfully created!",
                timer: 2000,
                icon: "success",
            });

            await navigate(`/Post/${responsePost.data.PostId}`);
        }

        console.log(responsePost);
        e.currentTarget.disabled = false;
    }

    const handlePostChange = (e) => {
        const { name, value } = e.target;
        setPostInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setPostInfo((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        }
    }

    return (
        <>
            <Header />
            <div className="space-x-auto h-screen flex justify-center">
                <div className="w-1/2 flex flex-col space-y-4">
                    <input type="text" name="title" placeholder="Add Title..." onChange={handlePostChange} className="text-comp-1 font-bold text-2xl w-full border-b-2 border-solid border-[var(--primary-color)]" />
                    <Scene className="h-1/2" model={postInfo.model && URL.createObjectURL(postInfo.model)} texture={postInfo.texture && URL.createObjectURL(postInfo.texture)} />
                    <div className="flex w-full justify-between">
                        <div className="flex flex-row">
                            <Button_Style inverted onClick={handleUploadModel} className="cursor-pointer m-1 px-3 py-1">
                                <ViewInArIcon />
                                <span className="text-xs">{postInfo.model ? postInfo.model.name : "Add a model..."}</span>
                                <input type="file" ref={modelRef} onChange={handleFileChange} name="model" hidden />
                            </Button_Style>

                            <Button_Style inverted onClick={handleUploadTexture} className="cursor-pointer m-1 px-3 py-1">
                                <AddPhotoAlternateIcon />
                                <span className="text-xs">{postInfo.texture ? postInfo.texture.name : "Add a texture..."}</span>
                                <input type="file" ref={textureRef} onChange={handleFileChange} name="texture" hidden />
                            </Button_Style>
                        </div>

                        <select name="categorySelected" onChange={handlePostChange} className="w-1/3 text-sm bg-[var(--background-color)] border-1 border-solid border-[var(--primary-color)] rounded-sm p-1 m-1">
                            {categoriesFound && categoriesFound.map((category) => (

                                <option key={category.CategoryId} value={category.CategoryId}>{category.Category_Name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold text-comp-1">Description:</h2>
                        <textarea placeholder="Add a description..." name="description" onChange={handlePostChange} className="w-full h-40 rounded-sm border-2 border-[var(--primary-color)] text-xs p-2"></textarea>
                    </div>

                    <div className="flex justify-center">
                        <Button_Style onClick={handleUploadPost} className="text-sm m-2 p-3 py-1 w-1/3"> Upload </Button_Style>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Upload;