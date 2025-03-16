import Header from "../components/Header";
import Footer from "../components/Footer";
import CommentCard from "../components/CommentCard";
import Scene from "../components/Three/Scene";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SendIcon from '@mui/icons-material/Send';
import Rating from "../components/Rating";
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetPost } from "../services/postService";
import Swal from "sweetalert2";
import { CreateComment, getComments, UpdateComment } from "../services/commentService";
import { GetLikes, InsertLike, UpdateLike } from "../services/likeService";
import Like_Button from "../components/Like_Button";
import Button_Style from "../components/Button_Style";
import JSZip from "jszip";
import Logo from "../assets/Logo.png";
import { getSavesOfPost } from "../services/collectionService";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import AddCollection from "../components/AddCollection";


function Post() {
    const user = JSON.parse(localStorage.getItem("user"));
    const { param } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState(null);
    const [userReviewed, setUserReviewed] = useState();
    const [reviewUpdateAtt, setReviewUpdateAtt] = useState();
    const [starsGiven, setStarsGiven] = useState(0);
    const [finalRating, setFinalRating] = useState(null);
    const [post, setPost] = useState({});
    const [modelUrl, setModelUrl] = useState(null);
    const [textureUrl, setTextureUrl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const FetchPost = async () => {
            const PostFound = await GetPost(param);
            if (PostFound?.data && PostFound.data !== null) {
                const LikesFound = await GetLikes("post", PostFound.data.PostId, user?.Email);
                const SavesFound = await getSavesOfPost(PostFound.data.PostId);
                console.log(SavesFound);
                setPost(PostFound.data);
                console.log(userReviewed);
                const { model } = await PostFound.data;
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
                setPost((prev) => ({
                    ...prev,
                    Likes: LikesFound.data.count,
                    UserLiked: LikesFound.UserLiked?.Status,
                    Saves: SavesFound.data.count,
                }));
            }
            else{
                navigate("/Home");
            }
        }
        FetchPost();
    }, [param]);

    useEffect(() => {
    if(!post?.comments || post?.comments.length === 0)
    {
        setFinalRating(0);
        return;
    }

    let rating = post.comments.reduce((acc, comment) => acc + comment.Rating, 0);
    console.log(rating);
    setFinalRating(rating / post.comments.length);
    },[post?.comments]);

    useEffect(() => {
        const commentFound = post?.comments?.find(comment => comment.user?.Email === user?.Email);
        setStarsGiven(commentFound?.Rating);
        setReview(commentFound?.Review);
        setUserReviewed(commentFound);
        setReviewUpdateAtt(commentFound === undefined ? true : false);
    },[post?.comments]);

    const handleStarsChange = (amount) => {
        setStarsGiven(amount);
    }

    const handlePostLike = async () => 
    {
        let response;
        
        if(user === null)
            return  Swal.fire({
                theme: 'dark',
                title: "Oops!!",
                text:"Please log in to like the post!",
                icon:"error",
                timer: 2000,
            });

        if(post.UserLiked === undefined)
        {
            response = await InsertLike("post", post.PostId, user.Email);
            setPost((prev) => ({
                ...prev,
                UserLiked: true,
                Likes: prev.Likes+1,
            }));   
        }
        else
        {
            response = await UpdateLike("post", post.PostId, user.Email, !post.UserLiked);
            setPost((prev) => ({
                ...prev,
                Likes: post.UserLiked ? prev.Likes - 1 : prev.Likes+1,
                UserLiked: !prev.UserLiked,
            }));
        }
    };

    const handleReviewSubmit = async () => {

        if(user === null)
        return  Swal.fire({
            theme: 'dark',
            title:"Oops!!",
            text:"Please log in to sumbit a review!",
            icon:"error",
            timer:2000,
        });
        
        if(review === null || review === "" || review === undefined)
           return  Swal.fire({
                theme: 'dark',
                title:"Oops!!",
                text:"Please fill out the review befoure you send it!",
                icon:"error",
            });


        let response;
        if(userReviewed !== undefined)
        {
            response = await UpdateComment(review, starsGiven,post.PostId, user.Email, userReviewed.CommentId);

            if(response.status) {
                await  Swal.fire({
                    theme: 'dark',
                    title: "Sucess!!",
                    text: "The review was updated successfully!",
                    icon: "success",
                    showConfirmButton: true
                }).then(() => {
                    window.location.reload();
                });
            }
        }
        else{
            response = await CreateComment(review,starsGiven,post.PostId, user.Email);
        }

        if(response.status && userReviewed === undefined)
            Swal.fire({
                theme: 'dark',
                title:"Sucess!!",
                text:"The review was created succesfully!",
                icon:"success",
                timer:2000,
            });
        
        const newComments = await getComments(post?.PostId);
        
        setPost({});

        setPost((prev) => 
        ({
            ...prev,
            comments: newComments.data,
        }));

        handleStarsChange(0);
        setReview("");
    }

    const DownloadModel = async () => {
        const zip = new JSZip();

        const modelBlob = new Uint8Array(post.model.Model.data);
        zip.file(`${post.Post_Name}.fbx`, modelBlob);

        const textureBlob = new Uint8Array(post.model.Texture.data);
        zip.file(`${post.Post_Name}.png`, textureBlob);

        zip.generateAsync({type: "blob"}).then((content) => {
            const zipUrl = URL.createObjectURL(content);
            const link = document.createElement("a");

            link.href = zipUrl;
            link.download = `${post.Post_Name}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    return post.Post_Status === false ? 
        <>
        <Header />
        <div className="flex items-center justify-center h-screen">
            <img src={Logo} className="w-10" alt="LogoName" />
            <h1>This Post is private. <Link to={`/Profile/${user.Email}`} className="underline"> Make Public.</Link></h1>
        </div>
        </>
    : 
    (
        <>
            <Header />
            <div className="flex space-x-6 mx-5 h-screen">
                <div className="flex flex-col w-1/2 space-y-2 px-2 h-auto">
                    <div>
                        <h1 className="text-comp-1 text-2xl font-bold">{post.Post_Name}</h1>
                        <Link to={`/Profile/${post.user?.Email}`}>
                        <h2 className="text-primary text-md font-semibold">{post.user?.Username}</h2>
                        </Link>
                    </div>
                    <Scene className="h-96 my-0" model={modelUrl} texture={textureUrl}></Scene>
                    <div className="flex justify-between border-b-2 border-[var(--primary-color)] my-2 py-1">
                        <Rating stars={finalRating} className="text-yellow-400" />
                        <div className="flex space-x-4 text-primary">
                            <div className="flex">
                                <Like_Button className="cursor-pointer" status={post.UserLiked} onClick={handlePostLike}/>
                                <p className="text-comp-1 m-1">{post.Likes}</p>
                            </div>
                            <div className="flex">
                                <AddCollection userLoggedIn={user} Post={post} className={"flex items-center"}>
                                <BookmarkBorderIcon className='cursor-pointer' onClick={handleOpen} />
                                </AddCollection>
                                <p className="text-comp-1 m-1">{post.Saves}</p>
                            </div>
                            <FileDownloadOutlinedIcon className='cursor-pointer' onClick={DownloadModel} />
                        </div>
                    </div>
                    <div className="text-md text-comp-1 p-2">
                        <h2 className="font-bold">Description: </h2>
                        <p className="text-xs p-2">{post.Post_Description}</p>
                    </div>
                </div>
                <div className="flex flex-col w-1/2 px-2 h-5/6 justify-between">
                    <div className="flex flex-col flex-grow space-y-6 overflow-y-auto min-h-0 p-5">
                    {post?.comments ? post?.comments.map(comment => 
                        <CommentCard key={comment.CommentId} commentItem={comment} userLoggedIn={user?.Email}/>
                    ) : 
                    <div>Loading Reviews...</div>}
                    </div>
                    <div className="flex flex-col items-center pt-6">
                    {
                        userReviewed !== undefined && reviewUpdateAtt === false ? 
                        (<div className="flex flex-col items-center">
                            <p className="text-sm p-5 opacity-50">You've already submitted a review.</p>
                            <Button_Style className="text-sm p-3 py-1 mx-8" onClick={() => setReviewUpdateAtt(true)}>Update Review</Button_Style>
                        </div>): 
                        (<>
                        <input type="text" value={review} onChange={(e) => setReview(e.target.value)} placeholder="Leave a review..." className="w-full border-b-2 border-[var(--primary-color)] text-comp-1" />
                        <div className="flex justify-between w-full py-2">
                            <Rating starsGiven={handleStarsChange} stars={starsGiven} className="text-yellow-400 cursor-pointer" />
                            <button onClick={handleReviewSubmit}>
                                <SendIcon className="text-[var(--primary-color)] cursor-pointer hover:text-[var(--secondary-color)]" />
                            </button>
                        </div>
                        </>)
                    }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Post;