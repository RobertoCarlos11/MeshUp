import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import Rating from './Rating';
import Scene from './Three/Scene';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostCard({Post}){
        const navigate = useNavigate();
        const [modelUrl, setModelUrl] = useState(null);
        const [textureUrl, setTextureUrl] = useState(null);

        useEffect(() => {
            let modelObjectURL, textureObjectURL;
            if (Post.model.Model) {
                const modelArray = new Uint8Array(Post.model.Model.data);
                const modelBlob = new Blob([modelArray], { type: 'application/octet-stream' });
                modelObjectURL = URL.createObjectURL(modelBlob);
                setModelUrl(modelObjectURL);
            }
            if (Post.model.Texture) {
                const textureArray = new Uint8Array(Post.model.Texture.data);
                const textureBlob = new Blob([textureArray], { type: 'image/png' });
                textureObjectURL = URL.createObjectURL(textureBlob);
                setTextureUrl(textureObjectURL);
            }
            return () => {
                if (modelObjectURL) URL.revokeObjectURL(modelObjectURL);
                if (textureObjectURL) URL.revokeObjectURL(textureObjectURL);
            };
        }, [Post.model.Model, Post.model.Texture]);

    return(
        <>
        <div className="relative flex flex-col m-2 bg-white shadow-sm rounded-sm w-145">      
                <Scene className="h-75 rounded-sm relative" modelUrl={modelUrl} textureUrl={textureUrl}>
                    <Rating stars={Post?.Rating} className="absolute top-2 right-2 text-yellow-400"/>
                </ Scene>
            <div onClick={() => {navigate("/Post")}} className="cursor-pointer mx-3 flex justify-between border-t pb-2 pt-2 px-1">
                <span className="text-base text-[var(--secondary-color)] m-1">
                    {Post.Post_Name}
                </span>
                <div className='flex flex-row text-[var(--secondary-color)]'>
                        <div className="flex">
                            <FavoriteBorderIcon className='cursor-pointer'/>
                            <p className="text-base m-1">{Post.Likes ? Post.Likes : 0}</p>
                        </div>
                        <div className="flex">
                            <BookmarkBorderIcon className='cursor-pointer'/>
                            <p className="text-base m-1">{Post.Saves ? Post.Saves : 0}</p>
                        </div>
                        <MoreVertOutlinedIcon className='cursor-pointer'/>
                </div>
            </div>
        </div>
        </>
    )
}
export default PostCard;