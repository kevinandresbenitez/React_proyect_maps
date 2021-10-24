import React,{Component} from 'react';
/*Material ui components*/
import {Grid,Typography,MenuItem,Button,Select,InputBase,Paper,IconButton} from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
/*Css Values Globals */
import './index.css';
/* Page Loader */
import CyrcleLoader from './components/loaders/CyrcleLoader.js';
/*Components */
import FormFailed from './components/formFailed/index.js'
import ItemBusqueda from './components/ItemBusqueda/index.js';

class App extends Component{
  
  constructor(props){
    super(props);
    this.state ={

      Busqueda : false,    
      ViajeMetodo : 'DRIVING',
      ViajeCalculo : false

    }

  }

  componentDidMount(){

    /*init google services*/
    let intervalgoogle = setInterval(()=>{
      if(window.google){
        clearInterval(intervalgoogle)
        let posicionInicial= new window.google.maps.LatLng(-34.6083, -58.3712);
        
          /*Adding global variables to this*/
        this.map= new window.google.maps.Map(document.getElementById("map"),{center:posicionInicial,zoom:15})
        this.directionsService = new window.google.maps.DirectionsService();
        this.directionsRender = new window.google.maps.DirectionsRenderer();
        this.service = new window.google.maps.places.PlacesService(this.map); 
      }
    },200)

  }
  
  Buscar=(busqueda)=>{
    if(!busqueda){
      return false
    }

    /*Add Loader and reset search*/
    this.setState({
      Busqueda:'Loading',
      ViajeCalculo:false
    })

    /*request query*/
    var peticion={
      query:busqueda,
      fields:['formatted_address','opening_hours',
      'icon', 'id', 'name','photo', 'place_id', 'plus_code',
      'type','geometry','rating']
    }

    /*Search function */
    this.service.findPlaceFromQuery(peticion,(place,status)=>{
      if(status === 'OK'){
        this.CambiarPosicionMapa(place[0].geometry.location)
        this.AgregarMarcador(place)                
        /*Update place */
        this.setState({
          Busqueda:place,
        })
      }else{
        /*Update place failse */
        this.setState({
          Busqueda:'Failed',
        })

      }      
      
    });
    
  }
  
  BuscarLugaresCercanos= (posicion)=>{
    /*Request in radius*/
    var request = {
      location: posicion,
      radius: 5000,
    };

    /*Return a promise with the data  */
    return new Promise((resolve,reject)=>{      
      this.service.nearbySearch(request, (place,status)=>{      
        resolve(place)
      })
    })

  }

  CalcularViaje=async (manera,evento)=>{
    /*Add Loader*/
    this.setState({
      ViajeCalculo:'Loading'
    })

    /* Update map */
    this.directionsRender.setMap(this.map);
    /*Get position GPS */
    let position =  await this.GetCurrentPosition();
    /*Request for travel */
    const request = {
        origin: position,
        destination:{lat:this.state.Busqueda[0].geometry.location.lat(),lng:this.state.Busqueda[0].geometry.location.lng()},
        travelMode:manera
    }

    /*Return travel duration or error */
    var pedido=setInterval(()=>{
      this.directionsService.route(request, (result, status) => {
          if(status === "OK"){
            this.directionsRender.setDirections(result);
            /*Add Result */
            this.setState({
              ViajeCalculo:result
            })

            clearInterval(pedido);
          }else if(status === "ZERO_RESULTS"){
            /*Add Result */
            this.setState({
              ViajeCalculo:'Failed'
            })
            clearInterval(pedido);
          }
      })
    },200)

  }

  GetCurrentPosition =()=>{
    /*Get location fot the navigator  */
    return new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition((pos)=>{
            resolve({lat:pos.coords.latitude,lng:pos.coords.longitude} )
        })    
    })

  }

  Detalles =(place_id)=>{

    /*Request  query*/
    var detalles={
      placeId:place_id,
      fields: ['photos', 'formatted_address',
      'name','place_id',"icon","type","geometry",'opening_hours','utc_offset_minutes',"reviews"]
    }

    /* Return the data with a promise*/
    return new Promise((resolve,reject)=>{
      this.service.getDetails(detalles,(detalles)=>{
        resolve(detalles)
      })
    })

    
  }

  CambiarPosicionMapa =(posicionMapa)=>{
    /*change location map */
    this.map = new window.google.maps.Map(document.getElementById("map"),{center:posicionMapa,zoom:15});
    document.getElementById("map").focus()
  }

  AgregarMarcador =(lugares)=>{
    /*Add marker */
    lugares.map((Archivos,indice)=>{
        return new window.google.maps.Marker({position: Archivos.geometry.location, map: this.map});
    })

  }

  TeclaEnter =(evento,busqueda)=>{
    if(evento.key === 'Enter'){
      this.Buscar(busqueda)
    }
  }

  render(){
    return(
      <Grid container >
        <Grid container > 

          <Grid item xs={12} md={6} > 
            <Grid id='map'  height={{xs:'50vh',md:'650px'}}  />
          </Grid>

          <Grid item container direction='row' xs={12} md={6} alignItems='flex-start' > 

            <Grid item container direction='row' gap={8} paddingY='20px' flex={true} justifyContent='center' alignItems='flex-start'>
                <Grid item xs={11} className='AnimationShow' sm={8} md={9} lg={8}  > 
                  <Typography fontSize={{xs:'28px' ,sm:'34px'}}	textAlign='center' >Buscar Lugares</Typography>
                  <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>    
                    <InputBase  id='Buscador' sx={{ ml: 1, flex: 1 }} placeholder="Buscar Lugar" onKeyDown={(evento)=>{var busqueda=document.getElementById("Buscador").value;this.TeclaEnter(evento,busqueda)}} />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={(e)=>{e.preventDefault();this.Buscar(document.getElementById("Buscador").value)}}>
                      <SearchIcon />
                    </IconButton>
                  </Paper> 
                </Grid >


                {/* Buequeda section ,loader,error  */}
                {this.state.Busqueda && this.state.Busqueda !== 'Loading' && this.state.Busqueda !== 'Failed' ? 
                <Grid container className='AnimationShow' item xs={11} sm={8} md={9} lg={8} > 
                      <Grid item xs={12} > 
                        <Typography xs={12} fontSize={{xs:'24px' ,sm:'26px'}}	fontWeight={200} textAlign='left' >Calcular Viaje</Typography>
                      </Grid>

                      <Grid item xs={12} sm={8} lg={9} > 
                          <Select defaultValue='DRIVING' onChange={(e)=>{this.setState({ViajeMetodo:e.target.value})}} id='opciones' fullWidth   variant="standard">
                              <MenuItem key={'DRIVING'} value={'DRIVING'}>
                                Conduciendo
                              </MenuItem>
                              <MenuItem key={'WALKING'} value={'WALKING'}>
                                Caminando
                              </MenuItem>
                              <MenuItem key={'BICYCLING'} value={'BICYCLING'}>
                                Bicicleta
                              </MenuItem>
                              <MenuItem key={'TRANSIT'} value={'TRANSIT'}>
                                Transito
                              </MenuItem>
                          </Select>                                                      
                      </Grid>                      
                      
                      <Grid container item xs={4} sm='auto' md={3} lg='auto' flex={true} marginX={{xs:'auto',sm:'8px'}} marginY={{xs:'10px',sm:'0px'}}  alignItems='flex-end'> 
                        <Button fullWidth onClick={()=>{this.CalcularViaje(this.state.ViajeMetodo)}} variant="text">Calcular</Button>
                      </Grid>
                </Grid >
                :false}
                {this.state.Busqueda === 'Loading'  ?  <CyrcleLoader />:false }
                {this.state.Busqueda === 'Failed'  ? <FormFailed />:false }
                {/* end Busqueda section  */}


                {/* Viaje Calculo options,loader,error */}
                {this.state.ViajeCalculo && this.state.ViajeCalculo !== 'Loading' && this.state.ViajeCalculo !== 'Failed' ? 
                <Grid item xs={11} className='AnimationShow' sm={8} >
                  <Typography fontSize={{xs:'24px' ,sm:'26px'}} fontWeight={200}	textAlign='left' >Resultados</Typography>
                  <Typography component={'span'} fontSize='16px' fontWeight={450} >Distancia :
                    <Typography fontSize='16px' fontWeight={350} >{this.state.ViajeCalculo.routes[0].legs[0].distance.text}</Typography>
                  </Typography>
                  <Typography component={'span'} fontSize='16px' fontWeight={450} >Duracion estimada :
                    <Typography fontSize='16px' fontWeight={350} >{this.state.ViajeCalculo.routes[0].legs[0].duration.text}</Typography>
                  </Typography>
                  <Typography component={'span'} fontSize='16px' fontWeight={450} >Distancia inicial :
                    <Typography fontSize='16px' fontWeight={350} >{this.state.ViajeCalculo.routes[0].legs[0].start_address}</Typography>
                  </Typography>
                  <Typography component={'span'} fontSize='16px' fontWeight={450} >Distancia final : 
                    <Typography fontSize='16px' fontWeight={350} >{this.state.ViajeCalculo.routes[0].legs[0].end_address}</Typography>
                  </Typography>
                </Grid>
                :false}
                {this.state.ViajeCalculo === 'Loading'  ?  <CyrcleLoader />:false }
                {this.state.ViajeCalculo === 'Failed'  ? <FormFailed />:false }              
                {/* end Viaje Calculo section  */}


            </Grid>
  
          </Grid>

        </Grid>

      <Grid flex justifyContent='center' alignItems='center'  gap={5} paddingY={5} container >

        {this.state.Busqueda && this.state.Busqueda !== 'Loading' && this.state.Busqueda !== 'Failed' && this.state.Busqueda.length > 0  ? this.state.Busqueda.map((obj,key)=>{
          return(
            <Grid item md={12} container justifyContent='center' alignItems='center' key={key}>
              <ItemBusqueda BuscarLugaresCercanos={this.BuscarLugaresCercanos} BuscarDetalles={this.Detalles} >{obj}</ItemBusqueda>
            </Grid>
          )
        }):false}

      </Grid>


      </Grid>


    )
  }
  
}

export default App;