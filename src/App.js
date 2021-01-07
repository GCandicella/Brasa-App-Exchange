import React from "react";
import './App.css';

export default class App extends React.Component {
    state = {
        loading: true,
        currencies: null
    };

    async componentDidMount() {
        const response = await fetch("https://api.exchangeratesapi.io/latestt");
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
            <div className='vh-100'>

            </div>
        )
    }

}
