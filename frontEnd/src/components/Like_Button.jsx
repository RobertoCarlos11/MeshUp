import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Like_Button({status = false,onClick, className})
{

    return(<>
        {status ? 
        <FavoriteIcon onClick={onClick} className={className} /> :
        <FavoriteBorderIcon onClick={onClick} className={className}/>
        }
    </>);
}

export default Like_Button;