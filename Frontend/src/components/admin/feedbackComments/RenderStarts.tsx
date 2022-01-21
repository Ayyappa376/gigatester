import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const RenderStars = (props: any) => {
    const arr = [1,2,3,4,5];
    return (
        <div style={{alignItems: "center"}}>
        <div>
            {arr.map((el, i) => {
                return (i < props.rating ? <StarIcon htmlColor='#F0A029' key={i} /> : <StarBorderIcon htmlColor='#F0A029' key={i} />)
            })}
        </div>
        </div>
    )
}

export default RenderStars;