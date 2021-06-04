import React from 'react';
import './lugaresCercanos.css';
import Estrellas from '../../estrellas/estrellas.js';
import ImgNotFound from '../img/image-not-found-min.jpg';
import PageLoader from '../../pageLoader/pageLoader';

export default class LugaresCercanos extends React.Component{
  constructor(props){
    super(props);
    this.state=({
      cantidad:4
    })

  }

Buscar=(busqueda)=>{
  this.props.Buscar(busqueda)
}
mostrarMas=()=>{

  this.setState((pre)=>({
    cantidad:pre.cantidad +5,
    lugares:this.props.Lugares
  }))

}

  render(){
    if(this.props.Lugares.length){

      return(
        <div className='Cont_prin_Lugares_cercanos'>

          {this.props.Lugares.map((archivo,indice)=>{
            if(indice > this.state.cantidad){
              return false
            }else{
              return <div className='lugares_item' key={indice}>
                        <h2>{archivo.name}</h2>
                        {!archivo.photos ?  <img  alt='Imagen no encontrada'src={ImgNotFound} />:<img src={archivo.photos[0].getUrl()} alt={"lugares"+indice} />}
                        <p>{archivo.vicinity}</p>
                        <div>
                          <div className='lugares_rating'>{archivo.rating ? <Estrellas rating={archivo.rating} />:false}</div>
                          <button onClick={()=>{this.Buscar(archivo.name)}}>Ir a </button>
                        </div>

                    </div>
            }
          })}

          {this.state.cantidad > this.props.Lugares.length ?  null:
          <button id='boton_mostrar_mas' onClick={this.mostrarMas}>Mostrar Mas</button>}

        </div>
      )
      
    }else{
      return(
        <PageLoader />
      )


    }

  }
}
