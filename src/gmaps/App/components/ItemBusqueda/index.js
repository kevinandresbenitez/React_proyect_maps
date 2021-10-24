import React from 'react';
import {useState} from 'react';

/*Impor css  */
import './index.css'
/*Material ui modules */
import {Icon,Avatar,Rating,Grid,Button,CardActions,CardContent,CardMedia,Typography,ImageList,ImageListItem} from '@mui/material/';

/* Page Loader */
import CyrcleLoader from '../loaders/CyrcleLoader.js';



function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}




export default function ItemBusqueda (props){

  const [widthContainer,setWidthContainer] = useState(3);
  const [widthCard,setWidthCard] = useState(12);
  const [widthInfo,setWidthInfo] = useState(0);

  const[Details,setDetails] = useState(false);
  const[LugaresCercanos,setLugaresCercanos] = useState(false);


  const ActiveItem =()=>{
    // Active md width items
    setWidthContainer(8);
    setWidthCard(4);
    setWidthInfo(8);
  }

  const HiddenItem=()=>{
    // Active md width items
    setWidthContainer(3);
    setWidthCard(12);
    setWidthInfo(0);
  }

  const ShowDetails=async(place_id)=>{

    /* if item is active now hidden */
    if(Details && Details !== 'Hidden' && Details !== 'Loading'){
      HiddenItem()
      setDetails(false)
      return false;
    }


    ActiveItem();
    setDetails('Loading');    
    setDetails(await props.BuscarDetalles(place_id));    

    /*Hidden the other item */
    setLugaresCercanos('Hidden')

  }
  
  
  const ShowLugares=async (position)=>{  
    
    /* if item is active now hidden */
    if(LugaresCercanos && LugaresCercanos !== 'Hidden' && LugaresCercanos !== 'Loading'){
      HiddenItem()
      setLugaresCercanos(false)
      return false;
    }

    ActiveItem();
    setLugaresCercanos('Loading')
    setLugaresCercanos(await props.BuscarLugaresCercanos(position));

    /*Hidden the other item */
    setDetails('Hidden');    

  }

    console.log(LugaresCercanos)

    return (
        <Grid item container md={8} lg={widthContainer}  sx={{boxShadow: 3 }} overflow='hidden'   justifyContent='center' alignItems='flex-start'>

          {/* Item first*/}
          <Grid container item xs={12}  md={12} lg={widthCard}  >
            <CardMedia component="img" height="350" image={`${props.children.photos ? props.children.photos[0].getUrl():null}`} alt={props.key} />
            
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.children.name}
                <img src={props.children.icon} style={{margin:'auto 10px',width:'20px',height:'20px' }} />
              </Typography>

              {props.children.rating ? <Rating name="read-only" value={props.children.rating} readOnly />:false}
              
              <Typography variant="body2" color="text.secondary">              
                {props.children.formatted_address}
              </Typography>

            </CardContent>
            
            <Grid item  xs={12} >
              <CardActions>
                <Button onClick={()=>{ShowLugares(props.children.geometry.location)}} size="small">Lugares Cercanos</Button>
                <Button onClick={()=>{ShowDetails(props.children.place_id)}} size="small">Detalles</Button>
                <Button size="small">Ir a</Button>
              </CardActions>      
            </Grid>          
          </Grid>
          {/* Item first */}

          {/* Item Active section*/}

          {widthInfo && widthInfo > 0 ? 
            <Grid paddingX='10px'  container item lg={widthInfo} maxHeight='525px'  overflow='auto'>              
              {Details === 'Loading' ? 
              
              <Grid xs={12} item container flex={true}  justifyContent='center' alignItems='center'>
                <CyrcleLoader /> 
              </Grid>
              
              
              : false}
              {Details && Details !== 'Hidden' && LugaresCercanos === 'Hidden' && Details !== 'Loading' ? 
              

              <Grid container item xs={12} >

                {/* IMG item */}
                <ImageList variant="quilted" cols={4}  rowHeight={121} >
                  {Details && Details.photos  ? Details.photos.map((item,key)=>{
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
                  }):false}
                </ImageList>
                {/* IMG Item */}
              
              
                {/* opening_hours Item */}
                <Grid container item >
                  {Details.opening_hours ? 
                      <Grid item xs={11}  sm={8} >
                        <Typography fontSize={{xs:'24px' ,sm:'26px'}} fontWeight={200}	textAlign='left' >Horarios</Typography>
                      </Grid>                                        
                  :false}

                  {Details.opening_hours ? Details.opening_hours.weekday_text.map((obj,key)=>{
                    return(
                      <Grid item xs={11}  sm={8} key={key}>
                      <Typography fontSize='16px' fontWeight={350} >{obj}</Typography>
                      </Grid>                    
                    )                                     
                  }):false}
                </Grid>
              {/* opening_hours Item */}

                {/*Reviews*/}
                <Grid container item xs={12} marginTop='20px'> 
                {Details.reviews ?                 
                  <Grid item xs={11}  sm={8} >
                    <Typography fontSize={{xs:'24px' ,sm:'26px'}} fontWeight={200}	textAlign='left' >Reseñas</Typography>
                  </Grid> 
                :false}

                {Details.reviews  ? Details.reviews.map((obj,key)=>{                  
                  return(
                    <Grid container item marginY='10px' key={key} >
                      <Grid item  container xs={12} flex={true} alignItems='center' >
                        <Grid item xs='auto'> 
                          <Avatar alt={obj.author_name} src={obj.author_url} />
                        </Grid>
                        <Grid item xs='auto' marginX='5px'> 
                          <Typography gutterBottom variant="p" fontWeight={400} component="span">
                            {obj.author_name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} marginX='2px'> 
                          {obj.rating ? <Rating name="read-only" value={obj.rating} readOnly />:false}
                        </Grid>
                      </Grid>
                      <Grid item>
                      {obj.text}
                      </Grid>                      
                    </Grid>
                  )
                }):false}
                </Grid>
                {/*Reviews*/}              
              </Grid>
              
              :false}


              
              {LugaresCercanos === 'Loading' ? <CyrcleLoader /> : false}
              {LugaresCercanos && LugaresCercanos !== 'Hidden' && Details === 'Hidden'  && LugaresCercanos !== 'Loading' ?

              LugaresCercanos.map((obj,key)=>{
                return(
                <Grid item container xs={12} marginY='10px' key={key} >

                <ImageList variant="quilted" cols={4}  rowHeight={121} >
                    <ImageListItem cols={12} rows={4}>
                      <img
                        src={obj.photos ? obj.photos[0].getUrl() : obj.icon}
                        alt={obj.name}
                        loading="lazy"                        
                      />
                    </ImageListItem>
                </ImageList>


                  <Grid container item xs={12}>
                    <Typography gutterBottom variant="h5" component="p">
                      {obj.name}
                      <img src={obj.icon} style={{margin:'auto 10px',width:'20px',height:'20px' }} />
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    {obj.rating ? <Rating name="read-only" value={obj.rating} readOnly />:false}
                  </Grid>

                  

                  <Typography variant="body2" color="text.secondary">              
                    {obj.vicinity}
                  </Typography>


                  <Grid item xs={12} marginY='10px' >
                    <Button size="small" variant="outlined">Ir a</Button>
                  </Grid>



                </Grid>
                )
              })
              
              
              :false}



            </Grid>                      
          :false}
          {/* Item Active section */}


        </Grid>



        
    )



}
