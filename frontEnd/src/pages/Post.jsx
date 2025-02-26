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
import { useParams } from "react-router-dom";
import { GetPost } from "../services/postService";


function Post() {
    const { param } = useParams();
    const [review, setReview] = useState();
    const [starsGiven, setStarsGiven] = useState(0);
    const [post, setPost] = useState({});
    const [modelUrl, setModelUrl] = useState(null);
    const [textureUrl, setTextureUrl] = useState(null);


    useEffect(() => {
        const FetchPost = async () => {
            const PostFound = await GetPost(param);
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
            }
        }
        FetchPost();
    }, [param]);

    const handleStarsChange = (amount) => {
        setStarsGiven(amount);
    }

    const handleReviewSubmit = () => {
        alert(`Esta fue la review ${review} y estas fueron las estrellas ${starsGiven}`);
    }
    return (
        <>
            <Header />
            <div className="flex space-x-6 mx-5 h-screen">
                <div className="flex flex-col w-1/2 space-y-2 px-2 h-auto">
                    <div>
                        <h1 className="text-comp-1 text-2xl font-bold">{post.Post_Name}</h1>
                        <h2 className="text-primary text-md font-semibold">{post.user?.Username}</h2>
                    </div>
                    <Scene className="h-96" model={modelUrl} texture={textureUrl}></Scene>
                    <div className="flex justify-between">
                        <Rating stars={4} className="text-yellow-400" />
                        <div className="flex space-x-4 text-primary">
                            <div className="flex">
                                <FavoriteBorderIcon className='cursor-pointer' />
                                <p className="text-comp-1 m-1">{post.Likes === null ? 0 : post.Likes}</p>
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
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                    </div>
                    <div className="flex flex-col items-center pt-6">
                        <input type="text" onChange={(e) => setReview(e.target.value)} placeholder="Leave a review..." className="w-full border-b-2 border-[var(--primary-color)] text-comp-1" />
                        <div className="flex justify-between w-full py-2">
                            <Rating starsGiven={handleStarsChange} className="text-yellow-400 cursor-pointer" />
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