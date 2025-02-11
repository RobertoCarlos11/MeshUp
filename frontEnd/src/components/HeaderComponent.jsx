import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import { Link } from 'react-router-dom';
function HeaderComponent(){
    return(
    <>
        {/* Active session */}
        <InsertChartOutlinedOutlinedIcon className='m-2 text-[var(--primary-color)]'/>
        <NotificationsOutlinedIcon className='m-2 text-[var(--primary-color)]'/>
        <FileUploadOutlinedIcon className='m-2 text-[var(--primary-color)]'/>
        <div className='space-x-1 flex w-60'>
        <Link className='w-30' to="/">
        <button className='text-base cursor-pointer bg-[var(--primary-color)] w-full rounded-sm p-2'>Log In</button>
        </Link>
        <Link className='w-30' to="/">
        <button className='text-base cursor-pointer border-2 border-solid border-[var(--primary-color)] w-full rounded-sm p-2'>Sign In</button>
        </Link>
        </div>
    </>
    )
}
export default HeaderComponent;