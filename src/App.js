import React from "react";
import Tilt from "react-tilt";
import Typewriter from 'typewriter-effect';
import world from "./localizacao.png";
import Calculator from "./Calculator";
import './assets/App.css';

export default class App extends React.Component {
    state = {
        loading: true,
        currencies: null,
        firstPage: true
    };

    async componentDidMount() {
        const response = await fetch("https://api.exchangeratesapi.io/latest");
        const data = await response.json();
        this.setState({
            loading: false,
            currencies: data.hasOwnProperty('rates') ? data : null
        });
    }

    render() {
        if (this.state.loading) {
            return <div className='error'><p>Loading...</p></div>
        }
        if (this.state.currencies === null) {
            return <div className='error'><p>Sorry, our source is out of service.</p></div>
        }
        return (
            <div>
                <div className={'middle container vh-100 ' + (this.state.firstPage ? "flex" : 'hide')}>
                    <div className='middle col-md-8 col-12'>
                        <Typewriter
                            options={{
                                autoStart: true,
                                loop: true,
                            }}
                            onInit={(typewriter) => {
                                typewriter.typeString('Converta moedas do mundo todo.')
                                    .pauseFor(2500)
                                    .deleteAll()
                                    .typeString(';)')
                                    .pauseFor(1000)
                                    .deleteAll()
                                    .pauseFor(1000)
                                    .start();
                            }}
                        />
                    </div>
                    <div className='middle col-md-4 col-12'>
                        <i
                            onClick={() => this.setState({firstPage: false})}
                            className="goArrow fas fa-play">
                        </i>
                    </div>
                </div>
                <div className={'second container vh-100 ' + (!this.state.firstPage ? "flex" : 'hide')}>
                    <div className='row text-center'>
                        <div className='middle col-md-4 d-mobile-none'>
                            <div className='card-left'>
                                <i
                                    onClick={() => this.setState({firstPage: true})}
                                    className="backArrow fas fa-reply">
                                </i>
                                <Tilt className='tilt-obj'>
                                    <img data-tilt width='100%' src={world} alt='Exchange Money'/>
                                </Tilt>
                            </div>
                        </div>
                        <div className='middle col-md-8 col-12'>
                            <div className='card-right'>
                                <Calculator currencies={this.state.currencies}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}
