import React from 'react';
/*Material ui components*/
import {Typography,Grid,ImageList,ImageListItem} from '@mui/material/';

/*Components*/
import {Review} from '../reviews/index.js';
import {OpeningHours} from '../openingHours/index.js';


/*IMG list render imgs */
function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
}



/*Function for send html error */
function RenderErrorMensseje(title = 'Title Undefined',text = 'Text Undefined'){

  return(

    <Grid container item marginBottom='5px'>
      <Grid item xs={11}  sm={8} >
        <Typography fontSize={{xs:'24px' ,sm:'26px'}} fontWeight={200}	textAlign='left' >{title}</Typography>
      </Grid> 

      <Grid item xs={11}  sm={8} >
        <Typography fontSize='16px' fontWeight={350} >{text}</Typography>
      </Grid>     
    </Grid>


  )



}


export function ItemDetails(props){
    return(

        <Grid container item xs={12} >

        {/* IMG item */}        
        <ImageList variant="quilted" cols={4}  rowHeight={121} >
          {props.children && props.children.photos  ? props.children.photos.map((item,key)=>{
            if(key <= 5){
              return(
            <ImageListItem cols={item.cols || (key === 0 || key === 5 ? 2:1)}  key={key}  rows={item.rows || 2 }>
              <img
                {...srcset(item.getUrl(), 121, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"                        
              />
            </ImageListItem>
              )
            }else{return false}
          }):false                              
          }
        </ImageList>
        {/* IMG Item */}
      
      
        {/* opening_hours Item */}
            {props.children && props.children.opening_hours ? <OpeningHours>{props.children.opening_hours}</OpeningHours>:RenderErrorMensseje("Horarios","No Disponibles")}
        {/* opening_hours Item */}

        {/*Reviews*/}  
            {props.children && props.children.reviews ? <Review>{props.children.reviews}</Review>:RenderErrorMensseje("Reseñas","No Disponibles")}
            
        {/*Reviews*/}         
                     
      </Grid>

    )
}