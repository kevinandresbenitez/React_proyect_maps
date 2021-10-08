import React from 'react';

/*Material ui components*/
import {Grid,Typography} from '@material-ui/core';


export default function FormFailed(){

    return (
        <Grid item xs={11} className='AnimationShow' sm={8} >
            <Typography fontSize={{xs:'24px' ,sm:'26px'}} fontWeight={450}	color='error.dark' textAlign='left' > ¡ No se han podido obtener los resultados !</Typography>                                                        
        </Grid>    
    )

}