import React from 'react';
import  {Card, CardContent, Typography} from '@material-ui/core';
import './Cards.css';

function Cards({title, cases,active,isRed,isBlue,total,...props}) {
    return (
        <Card onClick={props.onClick}  className={`cards ${active && "cards--selected"} ${
           ( isBlue  && "cards--blue") || (isRed  && "cards--red")
          }`}>
            <CardContent>
                <Typography className="cards__title" color="textSecondary">{title}</Typography>
                <h2 className={`cards__cases ${(!isRed && !isBlue && "cards__cases--green") || (!isRed && isBlue && "cards__cases--blue")}`}>{cases}</h2>
                <Typography className="cards__total" color="textSecondary">{total} total</Typography>
            </CardContent>
        </Card>
    )
}

export default Cards;


