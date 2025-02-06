import React from "../assets/react.svg"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Rating from "../components/Rating"

function CommentCard(props) {
    return (
        <div className="border-1 border-[var(--primary-color)] rounded-md p-1">
            <div className="flex justify-between">
                <div className="flex space-x-2">
                    <img src={React} className="" />
                    <h1 className="text-primary text-md font-bold flex items-center">User</h1>
                </div>
                <Rating className="text-yellow-400" stars={3}/>
            </div>
            <div>
                <p className="text-comp-1 text-md">This is a review</p>
                <div className="flex justify-between">
                    <div className="flex space-x-1 text-xs">
                        <FavoriteBorderIcon className="text-primary" />
                        <p className="text-comp-1 flex items-center">523 Likes</p>
                    </div>
                    <div className="text-xs text-secondary">
                    <p>01/02/2025 - 7:30 PM</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentCard;