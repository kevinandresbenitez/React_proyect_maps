import React, { Component } from 'react';
import Comentario from './comentario/comentario';
import './detalles.css';
import ImgNotFound from '../img/image-not-found-min.jpg';
import PageLoader from '../../pageLoader/pageLoader';

class Detalles extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        if(this.props.Detalles.length > 0){
            for(var sec =0;sec <= this.props.Detalles.length && sec < 1;sec ++){ 
                return(
                    <div className='Cont_prin_detalles'>

                        <h2 style={{color:"white"}}>{this.props.Detalles[sec].name}</h2>

                        <div>
                            <p>
                                {this.props.Detalles[sec]  && this.props.Detalles[sec].opening_hours && this.props.Detalles[sec].opening_hours.isOpen() === true ? 'Estado: Abierto' :null}
                            </p>
                        </div>

                        <div className='Cont_detalles_imagenes'>
                            {this.props.Detalles[sec]  && !this.props.Detalles[sec].photos ?   <img className='img_not_found'  alt='Imagen no encontrada'src={ImgNotFound} />:this.props.Detalles[sec].photos.map((archivo,indice)=>{

                                if(indice < 6 && indice >= 0){
                                    return (<img src={archivo.getUrl()} key={indice} className='img_detalles' alt={"foto"+indice} />)
                                }else{
                                    return false
                                }


                            })}
                        </div>

                        <div className='Cont_detalles_horarios'>
                                <ul> <h3>Horarios :</h3>
                                    {this.props.Detalles[sec] && !this.props.Detalles[sec].opening_hours  === true ? 'A todo publico':this.props.Detalles[sec].opening_hours.weekday_text.map((horario,indice)=>{
                                        return (<li  key={indice}>{horario}</li>)
                                    })}
                                </ul>
                        </div>

                
                            {this.props.Detalles[sec] && this.props.Detalles[sec].reviews ? <h2>Comentarios</h2>:null}
                            {this.props.Detalles[sec] && !this.props.Detalles[sec].reviews ? null:this.props.Detalles[sec].reviews.map((review,indice)=>{
                                return  <Comentario Comentario={review} key={indice} />
                            })}
                
                    </div>
                )
            }                           
        }else{
            return (
                <PageLoader />
            )
        }
    
    }
}

export default Detalles;
