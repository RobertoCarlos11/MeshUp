import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Rating from './Rating';
import Scene from './Three/Scene';
import Button_Style from './Button_Style';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GetLikes, InsertLike, UpdateLike } from '../services/likeService';
import Like_Button from './Like_Button';
import { Modal } from "@mui/material";
import Swal from 'sweetalert2';
import { deleteElement, getSavesOfPost } from '../services/collectionService';
import { GetAllCategories } from '../services/categoryService';
import { UpdatePost } from '../services/postService';
import AddCollection from './AddCollection';

function PostCard({ Post, ElementDeleted = null }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [userId, setUserId] = useState();
    const { ProfileId, collectionId } = useParams();
    const location = useLocation();
    const [updatedPost, setUpdatedPost] = useState({});
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
        user === null ? setUserId("Guest") : setUserId(user.Email);
    },[]);

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
             URL.revokeObjectURL(modelObjectURL);
             URL.revokeObjectURL(textureObjectURL);
        };
    }, [Post]);

    useEffect(() => {
        const getLikesOfPost = async () => {
                const LikesFound = await GetLikes("post", Post.PostId, userId);
                setLikes(LikesFound.data.count);
                console.log(LikesFound);
                setUserLiked(LikesFound?.UserLiked.Status);
            }
        getLikesOfPost();
    }, [userId]);

    useEffect(() => {
        const getSaves = async () => {
                const SavesFound = await getSavesOfPost(Post.PostId);
                setSaves(SavesFound.data.count);
        }
        getSaves();
    },[Post]);
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

        if(userId === "Guest")
            return Swal.fire({
                theme: 'dark',
                title:"Oops!!",
                text:"You need log in to like the post!",
                icon:"error",
                timer:2000,
            });
        if (userLiked === undefined) {
            response = await InsertLike("post", Post.PostId, user.Email);
            setLikes(likes + 1);
            setUserLiked(true);
        }
        else {
            response = await UpdateLike("post", Post.PostId, user.Email, !userLiked);
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
                theme: 'dark',
                title:"Success!!",
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

    const handleDeleteElement = () => {
        Swal.fire({
            theme: 'dark',
            icon: "warning",
            title: "Hold On!!",
            text: "Are you sure you want to delete this post from your collection?",
            showConfirmButton: false,
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: "Cancel",
            denyButtonText: "Delete Post"
        }).then((result) => {
            if(result.isDenied){
                deletePostfromCollection();
            }
        })
    }

    const deletePostfromCollection = async () => {
        const response = await deleteElement(collectionId, Post.PostId);
        console.log(response);

        if (response.status == true){
            await Swal.fire({
                theme: 'dark',
                icon: "success",
                title: "Success!!",
                text: `Sucessfully deleted post from ${response.collection_name}`
            });

            ElementDeleted(Post.PostId);
        }else{
            Swal.fire({
                theme: 'dark',
                icon: "error",
                title: "Oops!!",
                text: `Error at deleting post from ${response.collection_name}`
            })
        }
    }

    return (
        <>
            <div className="relative flex flex-col m-2 bg-white shadow-sm rounded-sm w-140">
                {modelUrl && textureUrl && 
                <Scene className="h-75 rounded-sm relative" model={modelUrl} texture={textureUrl}>
                    {userId === Post.Email && location.pathname.includes("/Profile") &&
                        <EditOutlinedIcon onClick={handleOpen} className='cursor-pointer text-[var(--background-color)] text-lg opacity-50 absolute top-0 left-0 m-3'/>
                    } 
                    {userId === ProfileId && location.pathname.includes("/Collection") &&
                        <DeleteOutlineOutlinedIcon onClick={handleDeleteElement} className='cursor-pointer text-[var(--background-color)] text-lg opacity-50 absolute top-0 left-0 m-3'/>
                    }
                    <Rating stars={postRating()} className="absolute top-2 right-2 text-[var(--star-color)]" />
                </Scene>
                }
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
                        <AddCollection userLoggedIn={user} Post={Post} > 
                            <MoreVertOutlinedIcon className='cursor-pointer' />
                        </AddCollection>
                    </div>
                </div>
            </div>


            <Modal open={open} onClose={handleClose} className='flex items-center justify-center'>
                <div className='bg-color flex flex-col w-1/3 rounded-md'>
                    <div className="p-8 bg-color rounded shadow-lg">
                        <header className='p-2 border-b-2 border-solid border-[var(--primary-color)]'>
                            <h2 className='text-center text-lg font-bold'>UPDATE POST</h2>
                        </header>
                        <div className='space-x-6 py-2'>
                            <div className='my-6 mx-2'>
                                <label className="block font-bold mb-2">Post title</label>
                                <input name="post_Name" onChange={handleUpdateChange} value={updatedPost.post_Name} className="text-comp-1 w-full p-2 py-1 border-b-1 border-[var(--primary-color)] leading-tight focus:outline-none focus:shadow-outline"  type="text" />
                            </div>
                            <div className='my-6 mx-2'>
                                <label className="block font-bold mb-2">Post description</label>
                                <textarea name="post_Description" onChange={handleUpdateChange} value={updatedPost.post_Description} className="text-comp-1 w-full p-2 py-1 border-b-1 border-[var(--primary-color)] leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className='my-6 mx-2'>
                                <label className="block font-bold mb-2">Category</label>
                                <select name="categoryId" onChange={handleUpdateChange} value={updatedPost.categoryId} className="w-full p-2 py-1 bg-[var(--background-color)] border-1 border-solid border-[var(--primary-color)] rounded-sm">
                                { categories && categories.map(category =>
                                    <option key={category.CategoryId} value={category.CategoryId}>{category.Category_Name}</option>
                                )}
                                </select>
                            </div>
                            <div className='flex justify-start my-6 mx-2'>
                                <input type="checkbox" name="post_Status" onChange={handleUpdateChange} checked={updatedPost.post_Status} className='mr-2' hidden/>

                                {updatedPost.post_Status ? (
                                    <>
                                        <VisibilityOutlinedIcon className='cursor-pointer mr-2'  onClick={() => setUpdatedPost((prev) => ({ ...prev, post_Status: false }))}/>
                                        <label className="block font-bold">Make private</label>
                                    </>
                                ): (
                                    <>
                                        <VisibilityOffOutlinedIcon className='cursor-pointer mr-2'  onClick={() => setUpdatedPost((prev) => ({ ...prev, post_Status: true }))}/>
                                        <label className="block font-bold">Make public</label>
                                    </>
                                )}
                            </div>
                        </div>
                        <footer className="p-2 border-t-2 border-solid border-[var(--primary-color)]">
                            <div className="flex justify-center">
                                <Button_Style onClick={handleUpdatePost} className='text-sm m-2 p-3 pb-1 pt-1'>Update</Button_Style>
                                <Button_Style onClick={handleClose} className='text-sm m-2 p-3 pb-1 pt-1'>Cancel</Button_Style>
                            </div>
                        </footer>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default PostCard;