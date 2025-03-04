import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from 'react';

function Rating(props)
{  
    const [stars, setStars] = useState(props.stars);
    const [ratingSelected, setRatingSelected] = useState(false);

    useEffect(() => {
        setStars(props.stars);
    },[props.stars]);

    const handleMouseClick = (index) => 
    {
        if(!props.starsGiven)
            return;

        setStars(index+1);
        props.starsGiven(index+1);
        setRatingSelected(true);
    }

    const handleMouseHover = (index) => 
    {
        if(props.stars || ratingSelected|| !props.starsGiven)
            return;
        setStars(index+1);
    }

    return(
    <div className={props.className}>
        {[...Array(5)].map((_,index) => 
            index < stars ? 
            <StarIcon onClick={() => handleMouseClick(index)} onMouseEnter={()=> {handleMouseHover(index)}} key={index}/> :
            <StarBorderIcon onClick={() => handleMouseClick(index)} onMouseEnter={() => {handleMouseHover(index)}} key={index} /> 
        )}   
    </div>
    )
}

Rating.defaultProps = {
    className: " ",
    stars: null,
    starsGiven: null,
}
export default Rating;