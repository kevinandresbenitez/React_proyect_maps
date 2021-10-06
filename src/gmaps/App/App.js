import React,{Component} from 'react';
import Resultados from '../resultados_busqueda/resultados'
import {Grid,Box,ThemeProvider,createTheme,FormControl,InputLabel,Input,TextField,Typography,MenuItem,Button,Select} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

/*Roboto Font */
import './index.css';

/* Page Loader */
import PageLoader from '../pageLoader/pageLoader.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda:false,
      detalles:false,
      lugares_cercanos:false,

      ViajeMetodo : 'DRIVING',
      ViajeCalculo : false
    }
  }

  componentDidMount(){

    /*init google services*/
    var intervalgoogle = setInterval(()=>{
      if(window.google){
        clearInterval(intervalgoogle)
        var posicion_inicial= new window.google.maps.LatLng(-34.6083, -58.3712);
        this.map= new window.google.maps.Map(document.getElementById("map"),{center:posicion_inicial,zoom:15})
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
      busqueda:'Loading',
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
        this.setState({
          busqueda:place || false,
          Calculo:false
        });        
      }
      
    });
    
  }
  
  BuscarLugaresCercanos=(posicion)=>{
    /*Request in radius*/
    var request = {
      location: posicion,
      radius: 5000,
    };

    /*search sites in radius*/
    this.service.nearbySearch(request,(place,status)=>{
      this.setState({
        lugares_cercanos:place || false
      })
    })
  }

  CalcularViaje=async (manera,evento)=>{
    /*Add Loader*/
    this.setState({ViajeCalculo:'Loading'})

    this.directionsRender.setMap(this.map);


    /*Get position GPS */
    let position =  await this.GetCurrentPosition();

    /*Request for travel */
    const request = {
        origin: position,
        destination:{lat:this.state.busqueda[0].geometry.location.lat(),lng:this.state.busqueda[0].geometry.location.lng()},
        travelMode:manera
    }

    /*Return travel duration or error */
    var pedido=setInterval(()=>{
      this.directionsService.route(request, (result, status) => {
          if(status === "OK"){
            this.directionsRender.setDirections(result);
            this.setState({ViajeCalculo:result});
            clearInterval(pedido);
          }else if(status === "ZERO_RESULTS"){
            clearInterval(pedido);
            this.setState({ViajeCalculo:false});
          }
      })
    },200)

  }

  GetCurrentPosition=()=>{
    /*Get location fot the navigator  */
    return new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition((pos)=>{
            resolve({lat:pos.coords.latitude,lng:pos.coords.longitude} )
        })    
    })

  }

  Detalles=(place_id)=>{

    /*Request  query*/
    var detalles={
      placeId:place_id,
      fields: ['photos', 'formatted_address',
      'name','place_id',"icon","type","geometry",'opening_hours','utc_offset_minutes',"reviews"]
    }

    this.service.getDetails(detalles,(detalles)=>{
      this.setState({
        detalles:[detalles] || false,
      })
    })
    
  }

  CambiarPosicionMapa=(posicionMapa)=>{
    /*change location map */
    this.map= new window.google.maps.Map(document.getElementById("map"),{center:posicionMapa,zoom:15});
    document.getElementById("map").focus()
  }

  AgregarMarcador=(lugares)=>{
    /*Add marker */
    lugares.map((Archivos,indice)=>{
        return new window.google.maps.Marker({position: Archivos.geometry.location, map: this.map});
    })

  }

  TeclaEnter=(evento,busqueda)=>{
    if(evento.key === 'Enter'){
      this.Buscar(busqueda)
    }
  }

  render() {

    return(
      <Grid container >
        <Grid container > 

          <Grid item xs={12} md={6} > 
            <Grid id='map'  height='1000px' maxHeight='650px' />
          </Grid>

          <Grid item container direction='row' xs={12} md={6} alignItems='flex-start' > 

            <Grid item container direction='row' gap={8} paddingY='20px' flex={true} justifyContent='center' alignItems='flex-start'>
                <Grid item xs={10} md={8} > 
                  <Typography fontSize='34px'	textAlign='center' >Buscar Lugares</Typography>
                  <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>    
                    <InputBase  id='Buscador' sx={{ ml: 1, flex: 1 }} placeholder="Buscar Lugar" onKeyDown={(evento)=>{var busqueda=document.getElementById("Buscador").value;this.TeclaEnter(evento,busqueda)}} />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={(e)=>{e.preventDefault();this.Buscar(document.getElementById("Buscador").value)}}>
                      <SearchIcon />
                    </IconButton>
                  </Paper> 
                </Grid >

                {this.state.busqueda && this.state.busqueda !== 'Loading' ? 

                <Grid container item xs={10} md={8} > 
                      <Grid item xs={10} md={12}> 
                        <Typography xs={12} fontSize='26px'	fontWeight={200} textAlign='left' >Calcular Viaje</Typography>
                      </Grid>

                      <Grid item xs={10} md={8} > 
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
                      
                      <Grid container item xs={6} lg={4}   flex={true} marginX='10px' alignItems='flex-end '> 
                        <Button onClick={()=>{this.CalcularViaje(this.state.ViajeMetodo)}} variant="outlined">Calcular</Button>
                      </Grid>
                </Grid >
                :false}
                {this.state.busqueda === 'Loading'  ?  <PageLoader />:false }

                  

                {this.state.ViajeCalculo && this.state.ViajeCalculo !== 'Loading' ? 

                <Grid item xs={8}>
                  <Typography fontSize='26px' fontWeight={200}	textAlign='left' >Resultados</Typography>
                  <Typography fontSize='16px' fontWeight={450} >Distancia :
                    <Typography fontSize='16px' fontWeight={350} >{this.state.ViajeCalculo.routes[0].legs[0].distance.text}</Typography>
                  </Typography>
                  <Typography fontSize='16px' fontWeight={450} >Duracion estimada :
                    <Typography fontSize='16px' fontWeight={350} >{this.state.ViajeCalculo.routes[0].legs[0].duration.text}</Typography>
                  </Typography>
                  <Typography fontSize='16px' fontWeight={450} >Distancia inicial :
                    <Typography fontSize='16px' fontWeight={350} >{this.state.ViajeCalculo.routes[0].legs[0].start_address}</Typography>
                  </Typography>
                  <Typography fontSize='16px' fontWeight={450} >Distancia final : 
                    <Typography fontSize='16px' fontWeight={350} >{this.state.ViajeCalculo.routes[0].legs[0].end_address}</Typography>
                  </Typography>
                </Grid>

                :false}
                {this.state.ViajeCalculo === 'Loading'  ?  <PageLoader />:false }
                





            </Grid>
  







          </Grid>

        </Grid>
    </Grid>


    )

    return (
            <div className='container_app'>
              <div className='container_map'>
                  <div id="map" tabIndex="0">
                  </div>

                  <div id="buscador">
                    <h1>Buscar sitio</h1>
                    <input type="text" placeholder='Buscar ...' id='Buscador' onKeyDown={(evento)=>{
                      var busqueda=document.getElementById("Buscador").value;this.TeclaEnter(evento,busqueda)}} />
                    <button onClick={()=>{var busqueda=document.getElementById("Buscador").value;this.Buscar(busqueda)}} >Buscar</button>

                    {!this.state.busqueda && !this.state.busqueda.length > 0 ? null:
                    <div>
                      <h2>Calcular Destino</h2>
                      <p>{this.state.busqueda[0]  && this.state.busqueda[0] && this.state.busqueda[0].name ? this.state.busqueda[0].name:null}</p>
                      <select id='opciones'>
                        <option value='DRIVING'>Conduciendo</option>
                        <option value="WALKING">Caminando</option>
                        <option value="BICYCLING">Bicicleta</option>
                        <option value="TRANSIT">Trancito</option>
                      </select >

                      <button onClick={()=>{this.CalcularViaje(document.getElementById('opciones').value)}}>ir a</button>
                    </div>
                    }

                    {!this.state.Calculo ? null:
                      <div className='Calculo_distancia'>
                        <h3>Resultados :</h3>
                        <p><strong>Distancia : </strong>{this.state.Calculo.routes[0].legs[0].distance.text}</p> 
                        <p><strong>Duracion estimada : </strong>{this.state.Calculo.routes[0].legs[0].duration.text}</p>

                        <p><strong>Distancia inicial : </strong>{this.state.Calculo.routes[0].legs[0].start_address}</p>
                        <p><strong>Distancia final : </strong>{this.state.Calculo.routes[0].legs[0].end_address}</p>                                                                   
                      </div>
                    }

                    {this.state.Calculo !== 0 ? null:                    
                      <div className='Calculo_distancia'>
                        <h3>Resultados :</h3>
                        <strong>No se a podido calcular</strong>
                      </div>

                    }



                  </div>


              </div>


                {this.state.busqueda && this.state.busqueda.length > 0 ?this.state.busqueda.map((archivos,indice)=>{
                  return (<Resultados key={indice} Buscar={this.Buscar} indice={indice} Lugares={this.state.lugares_cercanos} LugaresFuncion={this.BuscarLugaresCercanos} cambiarPosicion={this.CambiarPosicionMapa} Detalles={this.state.detalles} DetallesFuncion={this.Detalles}>{archivos}</Resultados>)
                  }):'No se a encontrado el sitio'
                }

                {this.state.busqueda && this.state.busqueda.length > 0 ? this.state.busqueda.map((archivos,indice)=>{
                  return(
                    <div>
                    {archivos.name}
                    </div>
                  )
                }):false}
                    


            </div>
    );
  }
}

export default App;
