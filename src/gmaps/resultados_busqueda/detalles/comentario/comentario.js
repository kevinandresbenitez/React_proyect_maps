import React, { Component } from 'react';
import './comentario.css'

class Comentario extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 


        return (    <div className='Comentario_item'>

                        <div className='cabezera_coment'>
                            <div>
                                <img src={this.props.Comentario.profile_photo_url} alt={this.props.Comentario.author_name} className='img_user' />
                                <a href={this.props.Comentario.author_url}> <strong>{this.props.Comentario.author_name}</strong> </a>
                            </div>

                            <div>
                                <strong>Rating:{this.props.Comentario.rating}</strong> 
                            </div>

                        </div>


                            
                        <div className='comentario_texto'>
                            <div>{this.props.Comentario.text}</div>
                            <small>Publicado: {this.props.Comentario.relative_time_description}</small>
                        </div>

                    </div>);
    }
}
 
export default Comentario;