import Header from "../components/Header";
import Footer from "../components/Footer";
import CommentCard from "../components/CommentCard";
import Scene from "../components/Three/Scene";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import Rating from "../components/Rating";
import { useState } from 'react';
import Texture from "../assets/Models/Gradient_UV_001.png";
import Model from "../assets/Models/SRP_001.FBX";


function Post() {

    const [review, setReview] = useState();
    const [starsGiven, setStarsGiven] = useState(0);


    const handleStarsChange = (amount) => {
        setStarsGiven(amount);
    }

    const handleReviewSubmit = () => {
        alert(`Esta fue la review ${review} y estas fueron las estrellas ${starsGiven}`);
    }

    return (
        <>
        <Header/>
        <div className="flex space-x-6 mx-5 h-screen">
                <div className="flex flex-col w-1/2 space-y-2 px-2 h-auto">
                <div>
                    <h1 className="text-comp-1 text-2xl font-bold">Title Post</h1>
                    <h2 className="text-primary text-md font-semibold">User</h2>
                </div>
                <Scene className="h-96" modelUrl={Model} textureUrl={Texture} />
                <div className="flex justify-between">
                    <Rating stars={4} className="text-yellow-400" />
                    <div className="flex space-x-4 text-primary">
                        <div className="flex">
                            <FavoriteBorderIcon className='cursor-pointer'/>
                            <p className="text-comp-1 m-1">18</p>
                        </div>
                        <div className="flex">
                            <BookmarkBorderIcon className='cursor-pointer'/>
                            <p className="text-comp-1 m-1">18</p>
                        </div>
                        <FileDownloadOutlinedIcon className='cursor-pointer'/>
                    </div>
                </div>
                <div className="w-full h-1 rounded-md bg-secondary"></div>
                <div className="text-md text-comp-1">
                    <h2 className="font-bold">Description: </h2>
                    <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eleifend efficitur faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vel eleifend quam. Mauris eu efficitur sem. Donec dapibus elit a maximus molestie. Sed eros elit, placerat et pretium in, consectetur a purus. Duis nec sapien suscipit, condimentum diam id, fermentum arcu. Sed faucibus euismod diam, sit amet iaculis est aliquam </p>
                    
                </div>
            </div>
            <div className="flex flex-col w-1/2 px-2 h-5/6 justify-between">
                <div className="flex flex-col flex-grow space-y-6 overflow-y-auto min-h-0">
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
                            <SendIcon className="text-primary cursor-pointer" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Post;