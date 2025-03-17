import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import Button_Style from "../components/Button_Style";
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import Notification from './Notification';

function HeaderComponent() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    const [userId, setUserId] = useState();
    useEffect(() => {
        user === null ? setUserId("Guest") : setUserId(user.Email);
    }, [user]);

    return (
        <>
            <div className='flex justify-center'>
                {userId != "Guest" ? (
                    <>
                        <Link to="/Reports">
                            <InsertChartOutlinedOutlinedIcon className='cursor-pointer m-2 text-[var(--primary-color)]' />
                        </Link>
                        <Notification userLoggedIn={userId}/>
                        <Link to="/Upload">
                            <FileUploadOutlinedIcon className='cursor-pointer m-2 text-[var(--primary-color)]' />
                        </Link>
                    </>
                )
                    :
                    (
                        <>
                            <Link to="/">
                                <Button_Style className="text-base w-30 m-2 p-3 pb-1 pt-1">Log In</Button_Style>
                            </Link>
                            <Link to="/Register">
                                <Button_Style inverted className="text-base w-30 m-2 p-3 pb-1 pt-1"> Sign In </Button_Style>
                            </Link>
                        </>
                    )
                }
            </div>
        </>
    )
}
export default HeaderComponent;