import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Texture from "../assets/Models/Gradient_UV_001.png";
import Model from "../assets/Models/SRP_001.FBX";

import Rating from './Rating';
import Scene from './Three/Scene';
import { useNavigate } from 'react-router-dom';

function PostCard(props){
    const navigate = useNavigate();
    return(
        <>
        <div className="relative flex flex-col m-2 bg-white shadow-sm rounded-sm w-145">      
                <Scene className="h-75 rounded-sm relative" modelUrl={Model} textureUrl={Texture}>
                    <Rating stars={props.Rating} className="absolute top-2 right-2 text-yellow-400"/>
                </ Scene>
            <div onClick={() => {navigate("/Post")}} className="cursor-pointer mx-3 flex justify-between border-t pb-2 pt-2 px-1">
                <span className="text-base text-[var(--secondary-color)] m-1">
                    {props.PostName}
                </span>
                <div className='flex flex-row text-[var(--secondary-color)]'>
                        <div className="flex">
                            <FavoriteBorderIcon className='cursor-pointer'/>
                            <p className="text-base m-1">{props.Likes}</p>
                        </div>
                        <div className="flex">
                            <BookmarkBorderIcon className='cursor-pointer'/>
                            <p className="text-base m-1">{props.Saves}</p>
                        </div>
                        <MoreVertOutlinedIcon className='cursor-pointer'/>
                </div>
            </div>
        </div>
        </>
    )
}

PostCard.defaultProps = {
    PostName: "Post Name",
    Likes: 10,
    Saves: 20,
    Rating: 4,
}
export default PostCard;