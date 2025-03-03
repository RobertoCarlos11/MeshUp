import Header from "../components/Header";
import Footer from "../components/Footer";
import CommentCard from "../components/CommentCard";
import Scene from "../components/Three/Scene";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import Rating from "../components/Rating";
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetPost } from "../services/postService";
import Swal from "sweetalert2";
import { CreateComment, getComments } from "../services/commentService";
import { GetLikes, InsertLike, UpdateLike } from "../services/likeService";
import Like_Button from "../components/Like_Button";

function Post() {
    const user = JSON.parse(localStorage.getItem("user"));
    const { param } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState(null);
    const [starsGiven, setStarsGiven] = useState(0);
    const [finalRating, setFinalRating] = useState(null);
    const [post, setPost] = useState({});
    const [modelUrl, setModelUrl] = useState(null);
    const [textureUrl, setTextureUrl] = useState(null);

    useEffect(() => {
        const FetchPost = async () => {
            const PostFound = await GetPost(param);
            const LikesFound = await GetLikes("post", PostFound.data.PostId, user.Email);
            if (PostFound?.data) {
                setPost(PostFound.data);
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

    const handleStarsChange = (amount) => {
        setStarsGiven(amount);
    }

    const handlePostLike = async () => 
    {
        let response;
        
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
       
        const user = JSON.parse(localStorage.getItem("user"));
        if(review === null || review === "")
           return Swal.fire({
            title:"Inputs missing",
            text:"Please fill out the review befoure you send it",
            icon:"error",
        });

        const response = await CreateComment(review,starsGiven,post.PostId, user.Email);

        if(response.status)
            Swal.fire({
            title:"Review created",
            text:"The review was created succesfully",
            icon:"success",
            timer:2000,
        });
        
        const newComments = await getComments(post.PostId);
        
        setPost((prev) => 
        ({
            ...prev,
            comments: newComments.data,
        }));


        handleStarsChange(0);
        setReview("");
    }
    return (
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
                    <Scene className="h-96" model={modelUrl} texture={textureUrl}></Scene>
                    <div className="flex justify-between">
                        <Rating stars={finalRating} className="text-yellow-400" />
                        <div className="flex space-x-4 text-primary">
                            <div className="flex">
                                <Like_Button className="cursor-pointer" status={post.UserLiked} onClick={handlePostLike}/>
                                <p className="text-comp-1 m-1">{post.Likes}</p>
                            </div>
                            <div className="flex">
                                <BookmarkBorderIcon className='cursor-pointer' />
                                <p className="text-comp-1 m-1">18</p>
                            </div>
                            <FileDownloadOutlinedIcon className='cursor-pointer' />
                        </div>
                    </div>
                    <div className="w-full h-1 rounded-md bg-secondary"></div>
                    <div className="text-md text-comp-1">
                        <h2 className="font-bold">Description: </h2>
                        <p className="text-xs">{post.Post_Description}</p>
                    </div>
                </div>
                <div className="flex flex-col w-1/2 px-2 h-5/6 justify-between">
                    <div className="flex flex-col flex-grow space-y-6 overflow-y-auto min-h-0 p-5">
                    {post?.comments ? post?.comments.map(comment => 
                        <CommentCard key={comment.CommentId} commentItem={comment} userLoggedIn={user.Email}/>
                    ) : 
                    <div>Loading Reviews...</div>}
                    </div>
                    <div className="flex flex-col items-center pt-6">
                        <input type="text" value={review} onChange={(e) => setReview(e.target.value)} placeholder="Leave a review..." className="w-full border-b-2 border-[var(--primary-color)] text-comp-1" />
                        <div className="flex justify-between w-full py-2">
                            <Rating starsGiven={handleStarsChange} stars={starsGiven} className="text-yellow-400 cursor-pointer" />
                            <button onClick={handleReviewSubmit}>
                                <SendIcon className="text-[var(--primary-color)] cursor-pointer hover:text-[var(--secondary-color)]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Post;