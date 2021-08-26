import React from 'react';
import  {Card, CardContent, Typography} from '@material-ui/core';

function Cards({title, cases, total}) {
    return (
        <Card className="cards">
            <CardContent>
                <Typography className="cards__title" color="textSecondary">{title}</Typography>
                <h2 className="cards__cases">{cases}</h2>
                <Typography className="cards__total" color="textSecondary">{total} total</Typography>
            </CardContent>
        </Card>
    )
}

export default Cards;


