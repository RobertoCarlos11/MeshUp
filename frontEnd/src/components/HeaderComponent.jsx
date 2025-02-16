import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import Button_Style from "../components/Button_Style";
import Button_Style2 from "../components/Button_Style2";
import { Link } from 'react-router-dom';

function HeaderComponent(){
    return(
    <>
        <div className='flex justify-center'>
            <Link to="/Reports"><InsertChartOutlinedOutlinedIcon className='cursor-pointer m-2 text-[var(--primary-color)]'/></Link>
            <NotificationsOutlinedIcon className='cursor-pointer m-2 text-[var(--primary-color)]'/>
            <Link to="/Upload"><FileUploadOutlinedIcon className='cursor-pointer m-2 text-[var(--primary-color)]'/></Link>
            <Link to="/"><Button_Style name="Log In" className="text-base w-30 m-2 p-3 pb-1 pt-1"/></Link>
            <Link to="/"><Button_Style2 name="Sign In" className="text-base w-30 m-2 p-3 pb-1 pt-1"/></Link> 
        </div>
    </>
    )
}
export default HeaderComponent;