import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import { Link } from 'react-router-dom';
function HeaderComponent(){
    return(
    <>
        <div className='flex justify-center'>
            <Link to="/Reports"><InsertChartOutlinedOutlinedIcon className='cursor-pointer m-2 text-[var(--primary-color)]'/></Link>
            <NotificationsOutlinedIcon className='cursor-pointer m-2 text-[var(--primary-color)]'/>
            <Link to="/Upload"><FileUploadOutlinedIcon className='cursor-pointer m-2 text-[var(--primary-color)]'/></Link>
            <Link to="/"><button className='text-base cursor-pointer bg-[var(--primary-color)] w-30 rounded-sm m-2 p-3 pb-1 pt-1'>Log In</button></Link>
            <Link to="/"><button className='text-base cursor-pointer border-2 border-solid border-[var(--primary-color)] w-30 rounded-sm m-2 p-3 pb-1 pt-1'>Sign In</button></Link> 
        </div>
    </>
    )
}
export default HeaderComponent;