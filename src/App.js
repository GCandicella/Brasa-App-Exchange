import React from "react";
import world from "./localizacao.png";
import Calculator from "./Calculator";
import './App.css';

export default class App extends React.Component {
    state = {
        loading: true,
        currencies: null
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

            <div className='container vh-100'>
                <div className='row text-center'>
                    <div className='middle col-md-4 d-mobile-none'>
                        <div className='card-left'>
                            <img width='100%' src={world} alt='Exchange Money'/>
                        </div>
                    </div>
                    <div className='middle col-md-8 col-12'>
                        <div className='card-right'>
                            <Calculator currencies={this.state.currencies}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
