import React from "../assets/react.svg"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Rating from "../components/Rating"
import { useEffect,useState } from "react";

function CommentCard({comment}) {

    const [photoUrl, setPhotoUrl] = useState(null);
    useEffect(() => {
        if(!comment.user.Profile_Picture)
            return;
        const PhotoArray = new Uint8Array(comment.user.Profile_Picture.data);
        const PhotoBlob = new Blob([PhotoArray]);
        const PhotoUrl = URL.createObjectURL(PhotoBlob);
        setPhotoUrl(PhotoUrl);
    },[]);

    useEffect(() => 
    {
        return () => URL.revokeObjectURL(photoUrl);
    },[photoUrl]);
    return (
        <div className="border-1 border-[var(--primary-color)] rounded-md p-2">
            <div className="flex justify-between">
                <div className="flex space-x-2">
                    <img src={photoUrl === null ? React : photoUrl} className="w-10 h-10" />
                    <h1 className="text-primary text-md font-bold flex items-center">{comment.user.Username}</h1>
                </div>
                <Rating className="text-yellow-400" stars={comment.Rating}/>
            </div>
            <div>
                <p className="text-comp-1 text-md">{comment.Review}</p>
                <div className="flex justify-between">
                    <div className="flex space-x-1 text-xs">
                        <FavoriteBorderIcon className="text-primary cursor-pointer" />
                        <p className="text-comp-1 flex items-center">{comment.Likes} Likes</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

CommentCard.defaultProps = {
    User: "Dobeto",
    Rating: 5,
    Review: "Wow!, what a nice model you did :D",
    Likes: 52,
    Date: "04/02/2025 - 7:30 PM",
};
export default CommentCard;