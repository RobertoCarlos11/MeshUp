import React from "../assets/react.svg"
import Rating from "../components/Rating"
import { useEffect, useState } from "react";
import Like_Button from "./Like_Button";
import DefaultPfp from "../assets/no-user.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { GetLikes, InsertLike, UpdateLike } from "../services/likeService";

function CommentCard({ commentItem, userLoggedIn = null }) {

    const [photoUrl, setPhotoUrl] = useState(null);
    const [comment, setComment] = useState();

    useEffect(() => {
        setComment(commentItem);
    }, [commentItem]);

    useEffect(() => {
        const getLikesOfComment = async () => {
            const LikesFound = await GetLikes("comment", comment?.CommentId, userLoggedIn);

            setComment((prev) => ({
                ...prev,
                Likes: LikesFound.data.count,
                UserLiked: LikesFound.UserLiked?.Status,
            }));
        }
        getLikesOfComment();
    }, [commentItem]);

    useEffect(() => {
        if (!comment?.user?.Profile_Picture)
            return;
        const PhotoArray = new Uint8Array(comment?.user?.Profile_Picture.data);
        const PhotoBlob = new Blob([PhotoArray]);
        const PhotoUrl = URL.createObjectURL(PhotoBlob);
        setPhotoUrl(PhotoUrl);
    }, [comment]);

    useEffect(() => {
        return () => URL.revokeObjectURL(photoUrl);
    }, [photoUrl]);

    const handleCommentLike = async () => {
        let response;

        if (userLoggedIn === null)
            return Swal.fire({
                theme: 'dark',
                title: "Oops!!",
                text: "Please log in to like the comment!",
                icon: "error",
                timer: 2000,
            });

        if (comment.UserLiked === undefined) {
            response = await InsertLike("comment", comment.CommentId, userLoggedIn);
            setComment((prev) => ({
                ...prev,
                Likes: prev.Likes + 1,
                UserLiked: true,
            }));
        }
        else {
            response = await UpdateLike("comment", comment.CommentId, userLoggedIn, !comment.UserLiked);
            setComment((prev) => ({
                ...prev,
                Likes: comment.UserLiked ? prev.Likes - 1 : prev.Likes + 1,
                UserLiked: !prev.UserLiked,
            }));
        }
    }

    return (
        <div className="bg-[var(--transparent-color)] rounded-sm p-3">
            <div className="flex justify-between">
                <div className="flex h-full space-x-2 m-1">
                    <img src={photoUrl === null ? DefaultPfp : photoUrl} className="rounded-full w-10 h-10" />
                    <Link to={`/Profile/${comment?.user?.Email}`} className="flex items-center">
                        <h1 className="text-primary text-md font-bold">{comment?.user?.Username}</h1>
                    </Link>
                </div>
                <Rating className="text-yellow-400" stars={comment?.Rating} />
            </div>
            <p className="text-comp-1 text-md m-2">{comment?.Review}</p>
            <div className="flex justify-between m-1">
                <div className="flex space-x-1 text-xs">
                    <Like_Button status={comment?.UserLiked} onClick={handleCommentLike} className="text-primary cursor-pointer" />
                    <p className="text-comp-1 flex items-center">{comment?.Likes} Likes</p>
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