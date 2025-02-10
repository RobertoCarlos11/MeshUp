import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';

function HeaderComponent(){
    return(
    <>
        {/* Active session */}
        <InsertChartOutlinedOutlinedIcon className='cursor-pointer m-2 text-[var(--primary-color)]'/>
        <NotificationsOutlinedIcon className='cursor-pointer m-2 text-[var(--primary-color)]'/>
        <FileUploadOutlinedIcon className='cursor-pointer m-2 text-[var(--primary-color)]'/>
        {/* <button className='text-base cursor-pointer bg-[var(--primary-color)] w-30 rounded-sm m-2 p-2'>Log In</button>
        <button className='text-base cursor-pointer border-2 border-solid border-[var(--primary-color)] w-30 rounded-sm m-2 p-2'>Sign In</button> */}
    </>
    )
}
export default HeaderComponent;