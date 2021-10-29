import React from 'react';

/*Material ui modules */
import { Avatar, Rating, Grid, Typography } from '@mui/material/';

export function Review(props) {

    return (
        <Grid container item xs={12} marginTop='20px'>

            <Grid item xs={11} sm={8} >
                <Typography fontSize={{ xs: '24px', sm: '26px' }} fontWeight={200} textAlign='left' >Reseñas</Typography>
            </Grid>

            {props.children ? props.children.map((obj, key) => {
                return (
                    <Grid container item marginY='10px' key={key}>
                        <Grid item container xs={12} flex={true} alignItems='center' >
                            <Grid item xs='auto'>
                                <Avatar alt={obj.author_name} src={obj.author_url} />
                            </Grid>
                            <Grid item xs='auto' marginX='5px'>
                                <Typography gutterBottom variant="p" fontWeight={400} component="span">
                                    {obj.author_name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} marginX='2px'>
                                {obj.rating ? <Rating name="read-only" value={obj.rating} readOnly /> : false}
                            </Grid>
                        </Grid>
                        <Grid item>
                            {obj.text}
                        </Grid>
                    </Grid>
                )
            }) : false}

        </Grid>


    )


}