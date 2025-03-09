import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import Rating from './Rating';
import Scene from './Three/Scene';
import Button_Style from './Button_Style';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetLikes, InsertLike, UpdateLike } from '../services/likeService';
import Like_Button from './Like_Button';
import { Modal } from "@mui/material";
import Swal from 'sweetalert2';
import { getSavesOfPost } from '../services/collectionService';
import { GetAllCategories } from '../services/categoryService';
import { UpdatePost } from '../services/postService';
import AddCollection from './AddCollection';

function PostCard({ Post }) {
    const navigate = useNavigate();
    const userLoggedIn = JSON.parse(localStorage.getItem("user"));
    const location = useLocation();
    const [updatedPost, setUpdatedPost] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));
    const [categories, setCategories] = useState(null);
    const [modelUrl, setModelUrl] = useState(null);
    const [likes, setLikes] = useState();
    const [saves, setSaves] = useState();
    const [userLiked, setUserLiked] = useState();
    const [textureUrl, setTextureUrl] = useState(null);
    
    const [open, setOpen] = useState(false);
    
    const handleOpen = ()=> setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const { model } = Post;
        let modelObjectURL, textureObjectURL;
        if (model.Model) {
            const modelArray = new Uint8Array(model.Model.data);
            const modelBlob = new Blob([modelArray], { type: 'application/octet-stream' });
            modelObjectURL = URL.createObjectURL(modelBlob);
            setModelUrl(modelObjectURL);
        }
        if (model.Texture) {
            const textureArray = new Uint8Array(model.Texture.data);
            const textureBlob = new Blob([textureArray], { type: 'image/png' });
            textureObjectURL = URL.createObjectURL(textureBlob);
            setTextureUrl(textureObjectURL);
        }
        return () => {
            if (modelObjectURL) URL.revokeObjectURL(modelObjectURL);
            if (textureObjectURL) URL.revokeObjectURL(textureObjectURL);
        };
    }, [Post]);

    useEffect(() => {
        const getLikesOfPost = async () => {
                const LikesFound = await GetLikes("post", Post.PostId, userLoggedIn.Email);
                setLikes(LikesFound.data.count);
                setUserLiked(LikesFound?.UserLiked.Status);
            }
        getLikesOfPost();
    }, []);

    useEffect(() => {
        const getSaves = async () => {
                const SavesFound = await getSavesOfPost(Post.PostId);
                setSaves(SavesFound.data.count);
        }
        getSaves();
    });
    useEffect(() => {
        if (open) {
            const FetchCategories = async () => {
                const categoriesFound = await GetAllCategories();
                setCategories(categoriesFound.data);
            }
            FetchCategories();
        }
    }, [open]);

    useEffect(() => {
        setUpdatedPost({
            postId: Post.PostId,
            post_Name: Post.Post_Name,
            post_Description: Post.Post_Description,
            post_Status: Post.Post_Status,
            categoryId: Post.CategoryId,
        });
    },[Post]);

    const handlePostLike = async () => {
        let response;

        if(userLoggedIn === null)
            return Swal.fire({
                title:"You need to log in.",
                text:"Please log in to like the post!",
                icon:"error",
                timer:2000,
            });
        if (userLiked === undefined) {
            response = await InsertLike("post", Post.PostId, userLoggedIn.Email);
            setLikes(likes + 1);
            setUserLiked(true);
        }
        else {
            response = await UpdateLike("post", Post.PostId, userLoggedIn.Email, !userLiked);
            setLikes(userLiked ? likes - 1 : likes + 1);
            setUserLiked(!userLiked);
        }
    }

    const postRating = () => {
        let rating = Post.comments.reduce((acc, comment) => acc + comment.Rating, 0);
        rating /= Post.comments.length;
        return rating;
    }

    const handleUpdatePost = async() => {
        const UpdatedPost = await UpdatePost(updatedPost);
        if(UpdatedPost.status)
        {
            handleClose();
            await Swal.fire({
                title:"Post Updated Successfully!",
                text:`The Post ${Post.Post_Name} has been updated successfully!`,
                icon:"success",
                timer:2000,
            }).then(() => {
                navigate(`/Post/${Post.PostId}`);
            });
        }
    }

    const handleUpdateChange = (e) => 
    {
        const {name,type, checked, value} = e.target;
        setUpdatedPost((prev) => 
        ({
            ...prev,
            [name]:type === "checkbox" ? checked : value,
        }));
    }
    return (
        <>
            <div className="relative flex flex-col m-2 bg-white shadow-sm rounded-sm w-140">
                <Scene className="h-75 rounded-sm relative" model={modelUrl} texture={textureUrl}>
                    {user?.Email === Post.Email && location.pathname.includes("/Profile") &&
                        <EditOutlinedIcon onClick={handleOpen} className='cursor-pointer text-[var(--background-color)] text-lg absolute top-0 left-0 m-2' />
                    }
                    <Rating stars={postRating} className="absolute top-2 right-2 text-yellow-400" />
                </ Scene>
                <div className="cursor-pointer mx-3 flex justify-between border-t pb-2 pt-2 px-1">
                    <span onClick={() => { navigate(`/Post/${Post.PostId}`) }} className="text-base text-[var(--secondary-color)] m-1">
                        {Post.Post_Name}
                    </span>
                    <div className='flex flex-row text-[var(--secondary-color)]'>
                        <div className="flex items-center">
                            <Like_Button status={userLiked} onClick={handlePostLike} />
                            <p className="text-base m-1">{likes ? likes : 0}</p>
                        </div>
                        <div className="flex items-center">
                            <BookmarkBorderIcon className='cursor-pointer'/>
                            <p className="text-base m-1">{saves}</p>
                        </div>
                        <AddCollection userLoggedIn={userLoggedIn} Post={Post} > 
                            <MoreVertOutlinedIcon className='cursor-pointer' />
                        </AddCollection>
                    </div>
                </div>
            </div>


            <Modal open={open} onClose={handleClose} className='flex items-center justify-center'>
                <div className='bg-color flex flex-col w-1/3 p-4 rounded-md'>
                    <div className='w-auto'>
                        <h3 className='text-xl font-semibold'>Post Title:</h3>
                        <input name="post_Name" onChange={handleUpdateChange} value={updatedPost.post_Name} className="shadow appearance-none border border-[var(--primary-color)] rounded w-full py-2 px-3 text-comp-1 leading-tight focus:outline-none focus:shadow-outline"  type="text" />
                    </div>
                    <div>
                        <h3 className='text-xl font-semibold'>Post Description:</h3>
                        <textarea name="post_Description" onChange={handleUpdateChange} value={updatedPost.post_Description} className="shadow appearance-none border border-[var(--primary-color)] rounded w-full py-2 px-3 text-comp-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <h3 className='text-xl font-semibold'>Active</h3>
                        <input type="checkbox" name="post_Status" onChange={handleUpdateChange} checked={updatedPost.post_Status} />
                    </div>
                    <div className=''>
                        <h3 className='text-xl font-semibold'>Category</h3>
                        <select name="categoryId" onChange={handleUpdateChange} value={updatedPost.categoryId} className="w-full text-sm bg-[var(--background-color)] border-1 border-solid border-[var(--primary-color)] rounded-sm p-1 my-2">
                            {   
                                categories && categories.map(category =>
                                    <option key={category.CategoryId} value={category.CategoryId}>{category.Category_Name}</option>
                                )}
                        </select>
                    </div>
                    <div className='w-full justify-evenly flex'>
                    <Button_Style onClick={handleUpdatePost} className='w-1/3'>Update</Button_Style>
                    <Button_Style onClick={handleClose} className='w-1/3'>Cancel</Button_Style>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default PostCard;