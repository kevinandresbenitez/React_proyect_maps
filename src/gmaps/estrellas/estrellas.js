import React,{Component} from 'react';
import './estrellas.css'

class Estrellas extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {


        return (
                <div className="stars"  id="star">
                    <h3>Rating</h3>

                <div>
                {Number(this.props.rating) >= 1  ?

                <div className="stars" >
                <svg height="25" width="20"   >
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style={{background:"black"}}/>
                </svg>
                </div>

                :null

                }

                {Number(this.props.rating) > 1.3 && Number(this.props.rating) < 2 ?

                <div className="stars" >
                <svg height="25" width="10"   >
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style={{background:"black"}}/>
                </svg>
                </div>
                :null
                }

                {Number(this.props.rating) >= 2  ?

                <div className="stars" >
                <svg height="25" width="20" >
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style={{background:"black"}}/>
                </svg>
                </div>
                :null
                }

                {Number(this.props.rating) > 2.3 && Number(this.props.rating) < 3 ?

                <div className="stars" >
                <svg height="25" width="10" >
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style={{background:"black"}}/>
                </svg>
                </div>

                :null

                }

                {Number(this.props.rating) >= 3  ?

                <div className="stars" >
                <svg height="25" width="20" >
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style={{background:"black"}}/>
                </svg>
                </div>

                :null

                }

                {Number(this.props.rating) > 3.3 && Number(this.props.rating) < 4 ?

                <div className="stars" >
                <svg height="25" width="10" >
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style={{background:"black"}}/>
                </svg>
                </div>

                :null

                }

                {Number(this.props.rating) >= 4  ?

                <div className="stars" >
                <svg height="25" width="20"  >
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style={{background:"black"}}/>
                </svg>
                </div>

                :null

                }

                {Number(this.props.rating) > 4.3 && Number(this.props.rating) < 4.9 ?

                <div className="stars" >
                <svg height="25" width="10"  >
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style={{background:"black"}}/>
                </svg>
                </div>

                :null

                }

                {Number(this.props.rating) > 4.9  ?

                <div className="stars" >
                <svg height="25" width="20"  >
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style={{background:"black"}}/>
                </svg>
                </div>

                :null

                }




                </div>
                <h3> {this.props.rating} </h3>

            </div>

        );
    }
}

export default Estrellas;
