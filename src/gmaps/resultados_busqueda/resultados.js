import React, { Component } from 'react';
import Detalles from './detalles/detalles'
import LugaresCercanos from './lugares_cercanos/lugaresCercanos'
import './resultados.css'

import Estrellas from '../estrellas/estrellas.js'

class Resultados extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            archivo:this.props.children,
            detalles:false,
            lugares_cercanos:false,
        })
    }

    mostrarDetalles=(indiceMostrar,place_id)=>{

      this.ocultarLugares(indiceMostrar,place_id)


      this.props.DetallesFuncion(place_id)
      this.setState({
        detalles:true
      })
      var detalles =document.getElementsByClassName("resultado_detalles")
      detalles[indiceMostrar].style.animation= "aparece 1s" ;
      detalles[indiceMostrar].style.display='block';
    }

    ocultarDetalles=(indiceMostrar,place_id)=>{


        var detalles =document.getElementsByClassName("resultado_detalles")
        detalles[indiceMostrar].style.animation= "desaparece 1s" ;

        setTimeout(()=>{
          detalles[indiceMostrar].style.display='none'

          this.setState({
            detalles:false
          })
        },1000)


    }


    mostrarLugares=(indiceMostrar,place_id)=>{

      this.ocultarDetalles(indiceMostrar,place_id);

      this.setState({
        lugares_cercanos:true
      })
      var lugares =document.getElementsByClassName("lugares_cercanos")
      lugares[indiceMostrar].style.animation= "aparece 1s" ;
      lugares[indiceMostrar].style.display='block'

      this.props.LugaresFuncion(this.state.archivo.geometry.location)
    }

    ocultarLugares=(indiceMostrar,place_id)=>{

        var lugares =document.getElementsByClassName("lugares_cercanos")
        lugares[indiceMostrar].style.animation= "desaparece 1s" ;

        setTimeout(()=>{
          lugares[indiceMostrar].style.display='none'

          this.setState({
            lugares_cercanos:false

          })
        },1000)


    }



    CambiarPosicionMapa(nueva_posicion){

        this.props.cambiarPosicion(nueva_posicion)
    }



    render() {


        return (
            <div className='container_resultados'>

                <div className='resultado_item'>
                        <h2>{this.state.archivo.name}</h2>

                        {!this.state.archivo.photos ? <p><strong>No hay imagenes disponibles</strong></p>:
                            <img  alt={this.state.archivo.name} src={this.state.archivo.photos[0].getUrl()} />
                        }

                        {!this.state.archivo.direccion ? <p>Ubicacion no disponible</p>: <p>{this.state.archivo.formatted_address}</p> }

                        <div className='tipo_local'>
                            {!this.state.archivo.rating ? null: <Estrellas rating={this.state.archivo.rating} />}

                        <h3>Tipo de establecimiento:</h3>{!this.state.archivo.types ? 'No definido':this.state.archivo.types.map((tipo_lugar)=>{return <p key={tipo_lugar}>{tipo_lugar}</p> }) }

                        </div>


                        {!this.state.detalles ?
                          <button className='button_detalles' onClick={()=>{this.mostrarDetalles(this.props.indice,this.state.archivo.place_id)}}>Detalles</button>
                            :
                          <button className='button_detalles' onClick={()=>{this.ocultarDetalles(this.props.indice,this.state.archivo.place_id)}}>Ocultar Detalles</button>
                        }

                        {!this.state.lugares_cercanos ?
                          <button className='button_detalles' onClick={()=>{this.mostrarLugares(this.props.indice,this.state.archivo.place_id)}}>Lugares Cercanos</button>
                            :
                          <button className='button_detalles' onClick={()=>{this.ocultarLugares(this.props.indice,this.state.archivo.place_id)}}>Ocultar Lugares</button>
                        }


                        <button className='button_mostrar_mapa' onClick={()=>{this.CambiarPosicionMapa(this.state.archivo.geometry.location)}}>Mostrar en el mapa</button>


                </div>

                    <div className='resultado_detalles'>
                            {this.state.detalles ?  <Detalles  Detalles={this.props.Detalles}/>:'No hay detalles' }
                    </div>

                    <div className='lugares_cercanos'>
                            {this.state.lugares_cercanos ?  <LugaresCercanos Buscar={this.props.Buscar} Lugares={this.props.Lugares} />:'No hay lugares_cercanos' }
                    </div>


            </div>

        );
    }
}

export default Resultados;
