import CommentCard from "../components/CommentCard";
import Scene from "../components/Three/Scene";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import Rating from "../components/Rating";
import { useState } from 'react';


function Post() {

    const [review, setReview] = useState();
    const [starsGiven, setStarsGiven] = useState(0);

    const handleStarsChange = (amount) => 
    {
        setStarsGiven(amount);
    }

    const handleReviewSubmit = () => 
    {
        alert(`Esta fue la review ${review} y estas fueron las estrellas ${starsGiven}`);
    }

    return (
        <div className="w-screen h-screen flex justify-between px-12">
            <div className="w-1/2 space-y-2 px-2">
                <div>
                    <h1 className="text-comp-1 text-2xl font-bold">Title Post</h1>
                    <h2 className="text-primary text-md font-semibold">User</h2>
                </div>
                <Scene className="h-1/2"/>
                <div className="flex justify-between">
                        <Rating stars={4} className="text-yellow-400"/>
                    <div className="flex space-x-4 text-primary">
                        <div className="flex">
                            <FavoriteBorderIcon />
                            <p className="text-comp-1">18</p>
                        </div>
                        <div className="flex">
                            <BookmarkBorderIcon />
                            <p className="text-comp-1">18</p>
                        </div>
                        <FileDownloadOutlinedIcon />
                    </div>
                </div>
                <div className="w-full h-1 rounded-md bg-secondary"></div>
                <div className="text-md text-comp-1">
                    <h2 className="font-bold">Description: </h2>
                    <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eleifend efficitur faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vel eleifend quam. Mauris eu efficitur sem. Donec dapibus elit a maximus molestie. Sed eros elit, placerat et pretium in, consectetur a purus. Duis nec sapien suscipit, condimentum diam id, fermentum arcu. Sed faucibus euismod diam, sit amet iaculis est aliquam </p>
                </div>
            </div>
            <div className="flex flex-col w-1/2 px-2">
                <div className="space-y-6 h-5/6 overflow-y-auto">
                <CommentCard />
                </div>
                <div className="h-1/6 flex items-center flex-col">
                    <input type="text" onChange={(e) => setReview(e.target.value)} placeholder="Leave a review..." className="w-full border-b-2 border-[var(--primary-color)] text-comp-1" />
                    <div className="flex justify-between w-full py-2">
                    <Rating starsGiven={handleStarsChange} className="text-yellow-400"/>
                    <button onClick={handleReviewSubmit}>
                        <SendIcon className="text-primary"/>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;