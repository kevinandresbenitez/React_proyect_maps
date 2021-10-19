import React from 'react';
import {useState} from 'react';

/*Impor css  */
import './index.css'
/*Material ui modules */
import {Rating,Grid,Button,CardActions,CardContent,CardMedia,Typography} from '@mui/material/';

/* Page Loader */
import CyrcleLoader from '../loaders/CyrcleLoader.js';


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

    return (

      <Grid item md={12} container justifyContent='center' alignItems='center'>
        <Grid item md={widthContainer} className='active' sx={{ borderRadius: 2 }} sx={{ boxShadow: 3 }} overflow='hidden' item container justifyContent='center' alignItems='flex-start'>

          <Grid container item md={widthCard} >
          <CardMedia
          component="img"
          height="300"
          image={`${props.children.photos ? props.children.photos[0].getUrl():null}`}
          alt={props.key}
          />
          
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.children.name}
            </Typography>

            {props.children.rating ? <Rating name="read-only" value={props.children.rating} readOnly />:false}
            
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          
          <CardActions>
            <Button onClick={()=>{ShowLugares(props.children.geometry.location)}} size="small">Lugares Cercanos</Button>
            <Button onClick={()=>{ShowDetails(props.children.place_id)}} size="small">Detalles</Button>
            <Button size="small">Ir a</Button>
          </CardActions>
          </Grid>

          {widthInfo && widthInfo > 0 ? 
            <Grid container item md={widthInfo}>

              
              {Details === 'Loading' ? <CyrcleLoader /> : false}
              {Details && Details !== 'Hidden' && LugaresCercanos === 'Hidden' && Details !== 'Loading' ? 'ya Cargo 1' :false}



              {LugaresCercanos === 'Loading' ? <CyrcleLoader /> : false}
              {LugaresCercanos && LugaresCercanos !== 'Hidden' && Details === 'Hidden'  && LugaresCercanos !== 'Loading' ? 'ya Cargo 2' :false}

            </Grid>

            
            

          :false}


        </Grid>
      </Grid>



        
    )



}
