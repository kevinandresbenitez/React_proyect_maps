import React from 'react';
/*Material ui components*/
import {Grid} from '@mui/material/';
/* Page Loader */
import CyrcleLoader from '../CyrcleLoader/CyrcleLoader.js';



export function ItemLoader(props){
    return(
        <Grid xs={12} item container flex={true} height='500px' justifyContent='center' alignItems='center'>
            <CyrcleLoader /> 
        </Grid>   

    )
}