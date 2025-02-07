import React from "../assets/react.svg"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Rating from "../components/Rating"

function CommentCard(props) {
    return (
        <div className="border-1 border-[var(--primary-color)] rounded-md p-1">
            <div className="flex justify-between">
                <div className="flex space-x-2">
                    <img src={React} className="" />
                    <h1 className="text-primary text-md font-bold flex items-center">{props.User}</h1>
                </div>
                <Rating className="text-yellow-400" stars={props.Rating}/>
            </div>
            <div>
                <p className="text-comp-1 text-md">{props.Review}</p>
                <div className="flex justify-between">
                    <div className="flex space-x-1 text-xs">
                        <FavoriteBorderIcon className="text-primary" />
                        <p className="text-comp-1 flex items-center">{props.Likes} Likes</p>
                    </div>
                    <div className="text-xs text-secondary">
                    <p>{props.Date}</p>
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