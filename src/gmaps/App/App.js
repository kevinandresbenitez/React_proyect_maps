import React,{Component} from 'react';
import Resultados from '../resultados_busqueda/resultados'
import './App.css'

var map=undefined;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda:[],
      detalles:[],
      lugares_cercanos:[]
    }
  }

  componentDidMount(){
    var intervalgoogle = setInterval(()=>{

      if(window.google){
        clearInterval(intervalgoogle)
        var posicion_inicial= new window.google.maps.LatLng(-34.6083, -58.3712);
        map= new window.google.maps.Map(document.getElementById("map"),{center:posicion_inicial,zoom:15})
        this.directionsService = new window.google.maps.DirectionsService();
        this.directionsRender = new window.google.maps.DirectionsRenderer();
      }

    },200)


  }

  Buscar=(busqueda)=>{

    if(!busqueda){
      return false
    }

    var peticion={
      query:busqueda,
      fields:['formatted_address','opening_hours',
      'icon', 'id', 'name','photo', 'place_id', 'plus_code',
      'type','geometry','rating']
    }
    console.log(busqueda)
    this.service = new window.google.maps.places.PlacesService(map);
    this.service.findPlaceFromQuery(peticion,this.ProcesarBusqueda);

  }
  ProcesarBusqueda=(place,status)=>{


    this.place=place;
    this.setState({
      busqueda:[],
    })

    if(status === 'OK'){
      this.CambiarPosicionMapa(place[0].geometry.location)
      this.AgregarMarcador(this.place)
    }

    this.setState({busqueda:place});
  }

  CalcularViaje=(manera,evento)=>{
    this.directionsRender.setMap(map)
    navigator.geolocation.getCurrentPosition((pos)=>{
      var ltn=pos.coords.latitude ;
      var lng=pos.coords.longitude ;
        this.start={lat:ltn,lng:lng}

      return true
      })

      var pedido=setInterval(()=>{
        const request = {
            origin: this.start,
            destination:{lat:this.place[0].geometry.location.lat(),lng:this.place[0].geometry.location.lng()},
            travelMode:manera
        }
        this.directionsService.route(request, (result, status) => {
            if(status === "OK"){
                clearInterval(pedido)
                this.directionsRender.setDirections(result)
            }
        })
      },200)




  }

  BuscarLugaresCercanos=(posicion)=>{
    this.setState({
      lugares_cercanos:[]
    })

    var request = {
      location: posicion,
      radius: 5000,
    };
    this.service.nearbySearch(request,this.ProcesarLugaresCercanos)
  }
  ProcesarLugaresCercanos=(place,status)=>{

    this.setState({
      lugares_cercanos:place
    })

  }


  CambiarPosicionMapa=(posicionMapa)=>{
    map= new window.google.maps.Map(document.getElementById("map"),{center:posicionMapa,zoom:15});
    document.getElementById("map").focus()
    this.AgregarMarcador(this.place);

  }
  AgregarMarcador=(lugares)=>{

    lugares.map((Archivos,indice)=>{
        return new window.google.maps.Marker({position: Archivos.geometry.location, map: map});
    })

  }


  Detalles=(place_id)=>{

    this.setState({
      detalles:[],
    })

    var detalles={
      placeId:place_id,
      fields: ['photos', 'formatted_address',
      'name','place_id',"icon","type","geometry",'opening_hours','utc_offset_minutes',"reviews"]
    }
      this.service.getDetails(detalles,this.PocesarDetalles)
  }
  PocesarDetalles=(detalles)=>{

      this.setState({
        detalles:detalles,
      })


  }



  TeclaEnter=(evento,busqueda)=>{
    if(evento.key === 'Enter'){
      this.Buscar(busqueda)
    }
  }

  render() {

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

                    {this.state.busqueda && !this.state.busqueda.length > 0 ? null:
                    <div>
                      <h2>Calcular Destino</h2>
                      <p>{this.place[0].name}</p>
                      <select id='opciones'>
                        <option value='DRIVING'>Conduciendo</option>
                        <option value="WALKING">Caminando</option>
                        <option value="BICYCLING">Bicicleta</option>
                        <option value="TRANSIT">Trancito</option>
                      </select >

                      <button onClick={()=>{this.CalcularViaje(document.getElementById('opciones').value)}}>ir a</button>
                    </div>
                    }

                  </div>


              </div>


                {this.state.busqueda.map((archivos,indice)=>{
                  return (<Resultados key={indice} Buscar={this.Buscar} indice={indice} Lugares={this.state.lugares_cercanos} LugaresFuncion={this.BuscarLugaresCercanos} cambiarPosicion={this.CambiarPosicionMapa} Detalles={this.state.detalles} DetallesFuncion={this.Detalles}>{archivos}</Resultados>)
                  })
                }





            </div>
    );
  }
}

export default App;
