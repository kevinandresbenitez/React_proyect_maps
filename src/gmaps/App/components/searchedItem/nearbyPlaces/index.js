import React from 'react';
/*Material ui components*/
import {Rating,Grid,Button,Typography,ImageList,ImageListItem} from '@mui/material/';

/*Import img */
import ImgNotFound from '../../../public/img/ImgNotFound.png';




export function NearbyPlaces(props){

    const SearchPlaces=(query)=>{
        props.SearchPlaces(query);
    }

    return(
        props.children.map((obj,key)=>{
            return(
            <Grid item container xs={12} marginY='10px' key={key} >

            <ImageList variant="quilted" cols={4} rowHeight={121} >
                <ImageListItem cols={12} rows={4} >
                  <img
                    src={obj.photos ? obj.photos[0].getUrl() : ImgNotFound}
                    alt={obj.name}
                    loading="lazy"        
                  />
                </ImageListItem>
            </ImageList>


              <Grid container item xs={12}>
                <Typography gutterBottom variant="h5" component="p">
                  {obj.name}
                  <img alt={obj.name} src={obj.icon} style={{margin:'auto 10px',width:'20px',height:'20px' }} />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                {obj.rating ? <Rating name="read-only" value={obj.rating} readOnly />:false}
              </Grid>

              

              <Typography variant="body2" color="text.secondary">              
                {obj.vicinity}
              </Typography>


              <Grid item xs={12} marginY='10px' >
                <Button onClick={()=>{SearchPlaces(obj.name)}} size="small" variant="outlined">Ir a</Button>
              </Grid>



            </Grid>
            )
          })
        
    )
}