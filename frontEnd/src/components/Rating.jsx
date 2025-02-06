import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';

function Rating(props)
{  
    const [stars, setStars] = useState(props.stars);
    
    const handleMouseHover = (index) => 
    {
        if(props.stars)
            return;
        setStars(index+1);
    }

    return(
    <div className={props.className}>
        {[...Array(5)].map((_,index) => 
            index < stars ? 
            <StarIcon onMouseEnter={()=> {handleMouseHover(index)}} key={index}/> :
            <StarBorderIcon onMouseEnter={() => {handleMouseHover(index)}} key={index} /> 
        )}   
    </div>
    )
}

Rating.defaultProps = {
    className: " ",
    stars: null,
}
export default Rating;