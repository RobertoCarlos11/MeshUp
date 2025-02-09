import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Rating from './Rating';
function PostCard(){
    return(
        <>
        <div className="relative flex flex-col m-2 bg-white shadow-sm rounded-sm w-145">      
            <div className='h-75 bg-[var(--secondary-color)] rounded-t-sm'>
                <Rating stars={4} className="flex justify-end text-yellow-400 m-3"/>
            </div>
            <div className="mx-3 flex justify-between border-t pb-2 pt-2 px-1">
                <span className="text-base text-[var(--secondary-color)] m-1">
                    Post Name
                </span>
                <div className='flex flex-row text-[var(--secondary-color)]'>
                        <div className="flex">
                            <FavoriteBorderIcon className='cursor-pointer'/>
                            <p className="text-base m-1">18</p>
                        </div>
                        <div className="flex">
                            <BookmarkBorderIcon className='cursor-pointer'/>
                            <p className="text-base m-1">18</p>
                        </div>
                        <MoreVertOutlinedIcon className='cursor-pointer'/>
                </div>
            </div>
        </div>
        </>
    )
}
export default PostCard;