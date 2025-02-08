import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';

function HeaderComponent(){
    return(
    <>
        {/* Active session */}
        <InsertChartOutlinedOutlinedIcon className='m-2 text-[var(--primary-color)]'/>
        <NotificationsOutlinedIcon className='m-2 text-[var(--primary-color)]'/>
        <FileUploadOutlinedIcon className='m-2 text-[var(--primary-color)]'/>
        <button className='text-base bg-[var(--primary-color)] w-30 rounded-sm m-2 p-2 pb-1 pt-1 '>Log In</button>
        <button className='text-base border-2 border-solid border-[var(--primary-color)] w-30 rounded-sm m-2 p-2 pb-1 pt-1 '>Sign In</button>
    </>
    )
}
export default HeaderComponent;