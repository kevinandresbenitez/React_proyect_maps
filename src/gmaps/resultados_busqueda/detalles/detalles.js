import React, { Component } from 'react';
import Comentario from './comentario/comentario'
import './detalles.css'

class Detalles extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
console.log(this.props.Detalles.reviews)
        return ( 

            <div className='Cont_prin_detalles'> 
                <h2 style={{color:"white"}}>{this.props.Detalles.name}</h2>
                
                <div>
                    <p>
                        {this.props.Detalles && this.props.Detalles.opening_hours && this.props.Detalles.opening_hours.isOpen() === true ? 'Estado: Abierto' :null}
                    </p>
                </div>

                <div className='Cont_detalles_imagenes'>
                    {this.props.Detalles && !this.props.Detalles.photos ? 'No hay imagenes':this.props.Detalles.photos.map((archivo,indice)=>{

                        if(indice < 9 && indice > 0){
                            return (<img src={archivo.getUrl()} key={indice} className='img_detalles' alt={"foto"+indice} />)
                        }else{
                            return false
                        }


                    })}
                </div>

                <div className='Cont_detalles_horarios'>
                        <ul> <h3>Horarios :</h3>
                            {this.props.Detalles && !this.props.Detalles.opening_hours  === true ? 'A todo publico':this.props.Detalles.opening_hours.weekday_text.map((horario,indice)=>{
                                return (<li  key={indice}>{horario}</li>)
                            })}
                        </ul>
                </div>


                {this.props.Detalles && this.props.Detalles.reviews ? <h2>Comentarios</h2>:null}
                {this.props.Detalles && !this.props.Detalles.reviews ? null:this.props.Detalles.reviews.map((review,indice)=>{
                    return  <Comentario Comentario={review} key={indice} />
                })}




            </div>

         );
    }
}
 
export default Detalles;