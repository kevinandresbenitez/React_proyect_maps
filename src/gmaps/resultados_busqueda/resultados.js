import React, { Component } from 'react';
import Detalles from './detalles/detalles'
import './resultados.css'

class Resultados extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            archivo:this.props.children
        })
    }

    mostrarDetalles=(indiceMostrar,place_id)=>{

        this.props.DetallesFuncion(place_id)

        var detalles =document.getElementsByClassName("resultado_detalles")
        var button_detalles=document.getElementsByClassName('button_detalles')

        for (var sec=0;sec < detalles.length;sec ++){
            detalles[sec].style.display='none';
            button_detalles[sec].style.display='inline-block'
        detalles[indiceMostrar].style.animation= "none" ;

        }
        detalles[indiceMostrar].style.animation= "aparece 1s" ;
        detalles[indiceMostrar].style.display='block'
        button_detalles[indiceMostrar].style.display='none'




    }

    CambiarPosicionMapa(nueva_posicion){

        this.props.cambiarPosicion(nueva_posicion)
    }



    render() { 
        

        return (
            <div className='container_resultados'>

                <div className='resultado_item'> 
                        <h2>{this.state.archivo.nombre}</h2>

                        {!this.state.archivo.imagenes ? <p><strong>No hay imagenes disponibles</strong></p>: 
                            <img style={{maxHeight:'250px'}} alt={this.state.archivo.nombre} src={this.state.archivo.imagenes[0].getUrl()} />
                        }

                        {!this.state.archivo.direccion ? <p>Ubicacion no disponible</p>: <p>{this.state.archivo.direccion}</p> }

                        <div className='tipo_local'>
                            {!this.state.archivo.rating ? undefined:  <ul><h3>Rating:</h3>{this.state.archivo.rating} </ul> }
                            <ul>
                                <h3>Tipo de establecimiento:</h3>{!this.state.archivo.tipo ? 'No definido':this.state.archivo.tipo.map((tipo_lugar)=>{return <li key={tipo_lugar}>{tipo_lugar}</li> }) }
                            </ul>
                        </div>


                        <button className='button_detalles' onClick={()=>{this.mostrarDetalles(this.props.indice,this.state.archivo.place_id)}}>Detalles</button>
                        <button className='button_mostrar_mapa' onClick={()=>{this.CambiarPosicionMapa(this.state.archivo.posicion_geografica)}}>Mostrar en el mapa</button>


                </div>

                <div className='resultado_detalles'> 

                        {this.state.detalles ? 'No hay detalles': <Detalles  Detalles={this.props.Detalles} />}

                </div>



            </div>
            
        );
    }
}
 
export default Resultados;