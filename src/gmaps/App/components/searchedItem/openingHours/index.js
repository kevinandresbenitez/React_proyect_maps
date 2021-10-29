import React from 'react';

/*Material ui modules */
import {Grid, Typography } from '@mui/material/';

export function OpeningHours(props) {
    return (
        <Grid container item >
            <Grid item xs={11}  sm={8} >
              <Typography fontSize={{xs:'24px' ,sm:'26px'}} fontWeight={200}	textAlign='left' >Horarios</Typography>
            </Grid>                                        

        {props.children ? props.children.weekday_text.map((obj,key)=>{
          return(
            <Grid item xs={11}  sm={8} key={key}>
            <Typography fontSize='16px' fontWeight={350} >{obj}</Typography>
            </Grid>                    
          )                                     
        }):false}
      </Grid>





    )


}