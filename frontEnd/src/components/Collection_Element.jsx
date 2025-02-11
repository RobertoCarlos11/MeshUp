import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function Collection_ELement(){
    return(
        <>
         <div className="relative flex flex-col m-2 bg-white shadow-sm rounded-sm w-145 scale-95">      
            <div className='h-75 bg-[var(--secondary-color)] rounded-t-sm flex justify-end'>
                <DeleteOutlineOutlinedIcon className='cursor-pointer text-[var(--background-color)] text-lg opacity-50 m-3'/>
            </div>
            <div className="mx-3 flex justify-between border-t pb-2 pt-2 px-1">
                <span className="cursor-pointer text-base text-[var(--secondary-color)] m-1">
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
export default Collection_ELement;