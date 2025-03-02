import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import Rating from './Rating';
import Scene from './Three/Scene';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetLikes,InsertLike,UpdateLike } from '../services/likeService';
import Like_Button from './Like_Button';

function PostCard({ Post }) {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const { model } = Post;
    const [modelUrl, setModelUrl] = useState(null);
    const [likes, setLikes] = useState();
    const [userLiked, setUserLiked] = useState();
    const [textureUrl, setTextureUrl] = useState(null);

    useEffect(() => {
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
            if (modelObjectURL) URL.revokeObjectURL(modelObjectURL);
            if (textureObjectURL) URL.revokeObjectURL(textureObjectURL);
        };
    }, [model.Model, model.Texture]);

    useEffect(() => {
        const getLikesOfPost = async () => {
            const LikesFound = await GetLikes("post", Post.PostId, user.Email);
            setLikes(LikesFound.data.count);
            setUserLiked(LikesFound?.UserLiked.Status);
        }

        getLikesOfPost();
    }, []);

    const handlePostLike = async () => {
        let response;

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
    return (
        <>
            <div className="relative flex flex-col m-2 bg-white shadow-sm rounded-sm w-145">
                <Scene className="h-75 rounded-sm relative" model={modelUrl} texture={textureUrl}>
                    <Rating stars={postRating} className="absolute top-2 right-2 text-yellow-400" />
                </ Scene>
                <div className="cursor-pointer mx-3 flex justify-between border-t pb-2 pt-2 px-1">
                    <span onClick={() => { navigate(`/Post/${Post.PostId}`) }} className="text-base text-[var(--secondary-color)] m-1">
                        {Post.Post_Name}
                    </span>
                    <div className='flex flex-row text-[var(--secondary-color)]'>
                        <div className="flex">
                            <Like_Button status={userLiked} onClick={handlePostLike} />
                            <p className="text-base m-1">{likes ? likes : 0}</p>
                        </div>
                        <div className="flex">
                            <BookmarkBorderIcon className='cursor-pointer' />
                            <p className="text-base m-1">{Post.Saves ? Post.Saves : 0}</p>
                        </div>
                        <MoreVertOutlinedIcon className='cursor-pointer' />
                    </div>
                </div>
            </div>
        </>
    )
}
export default PostCard;