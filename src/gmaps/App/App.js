import React,{Component} from 'react';
import Resultados from '../resultados_busqueda/resultados'
import './App.css'

var map=undefined;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda:[],
      detalles:[]
    }
  }

  componentDidMount(){
    var intervalgoogle = setInterval(()=>{

      if(window.google){
        clearInterval(intervalgoogle)
        var posicion_inicial= new window.google.maps.LatLng(-34.6083, -58.3712);
        map= new window.google.maps.Map(document.getElementById("map"),{center:posicion_inicial,zoom:15})
      }

    },200)


  }

 

  Buscar=()=>{
    var busqueda=document.getElementById("Buscador").value;

    var peticion={
      query:busqueda,
      fields:['formatted_address','opening_hours',
      'icon', 'id', 'name','photo', 'place_id', 'plus_code', 
      'type','geometry','rating']
    }

    this.service = new window.google.maps.places.PlacesService(map); 
    this.service.findPlaceFromQuery(peticion,this.ProcesarBusqueda);

  }
  ProcesarBusqueda=(place,status)=>{

    this.place=place;

    this.setState({
      busqueda:[],
    })

    var info_sitios=[];

    if(status === 'OK'){

      this.CambiarPosicionMapa(place[0].geometry.location)
      this.AgregarMarcador(this.place)


      place.map((archivo,indice)=>{

        var sitio={
          place_id:archivo.place_id,
          nombre:archivo.name,
          direccion:archivo.formatted_address,
          rating:undefined,
          imagenes:undefined,
          tipo:undefined,
          posicion_geografica:archivo.geometry.location
        };

        if(archivo.rating){
          sitio.rating= archivo.rating;
        }
        if(archivo.photos){
          sitio.imagenes=archivo.photos;
        }
        if(archivo.types){
          sitio.tipo=archivo.types;
        }

        info_sitios.push(sitio);

        return sitio
      })

    }

    this.setState({busqueda:info_sitios});
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



  TeclaEnter=(evento)=>{
    if(evento.key === 'Enter'){
      this.Buscar()
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
                    <input type="text" placeholder='Buscar ...' id='Buscador' onKeyDown={this.TeclaEnter} />
                    <button onClick={this.Buscar} >Buscar</button>
                  </div>

              </div>


                    {this.state.busqueda.map((archivos,indice)=>{
                      return (<Resultados key={indice} indice={indice} cambiarPosicion={this.CambiarPosicionMapa} Detalles={this.state.detalles} DetallesFuncion={this.Detalles}>{archivos}</Resultados>)
                      })
                    }





            </div>
    );
  }
}
 
export default App;