import React from 'react';
import {useState} from 'react';

/*Material ui modules */
import {Rating,Grid,Button,CardActions,CardContent,CardMedia,Typography} from '@mui/material/';

/*Components*/
import {ItemLoader} from '../loaders/ItemLoader/ItemLoader.js';
import {ItemDetails} from './itemDetails/index';
import {NearbyPlaces} from './nearbyPlaces/index';


/*Import img */
import ImgNotFound from '../../public/img/ImgNotFound.png';


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
    setDetails(await props.SearchDetails(place_id));    

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
    setLugaresCercanos(await props.SearchPlacesNearby(position));

    /*Hidden the other item */
    setDetails('Hidden');    

  }

  const SearchPlaces=(query)=>{
    props.SearchPlaces(query);
  }

    return (
        <Grid item container md={8} lg={widthContainer}  sx={{boxShadow: 3 }} overflow='hidden'   justifyContent='center' alignItems='flex-start'>

          {/* Item first*/}
          <Grid container item xs={12}  md={12} lg={widthCard}  >
            <CardMedia component="img"  height="370" image={`${props.children.photos ? props.children.photos[0].getUrl():ImgNotFound}`} alt={props.key} />
            
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.children.name}
                <img src={props.children.icon} alt={props.children.name} style={{margin:'auto 10px',width:'20px',height:'20px' }} />
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
                <Button onClick={()=>{SearchPlaces(props.children.name + ','+props.children.formatted_address)}} size="small">Ir a</Button>
              </CardActions>      
            </Grid>          
          </Grid>
          {/* Item first */}

          {/* Item Active section*/}
          {widthInfo && widthInfo > 0 ? 
            <Grid paddingX='10px'  container item lg={widthInfo} maxHeight='525px'  overflow='auto'>


              {/* If  Details is load show Details*/}
              {Details === 'Loading' ? <ItemLoader />: false}
              {Details && Details !== 'Hidden' && LugaresCercanos === 'Hidden' && Details !== 'Loading' ? <ItemDetails>{Details}</ItemDetails>:false}


              {/* If  Places nearby is load show places*/}            
              {LugaresCercanos === 'Loading' ? <ItemLoader />: false}            
              {LugaresCercanos && LugaresCercanos !== 'Hidden' && Details === 'Hidden'  && LugaresCercanos !== 'Loading' ?<NearbyPlaces SearchPlaces={SearchPlaces}>{LugaresCercanos}</NearbyPlaces>:false}


            </Grid>                      
          :false}
          {/* Item Active section */}


        </Grid>



        
    )



}
