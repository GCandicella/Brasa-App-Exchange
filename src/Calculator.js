import React, {useState, useEffect} from "react";
import './Calculator.css';


function Calculator({currencies}) {
    const ref = currencies.base;
    const rates = includeEUR(currencies.rates);
    const date = format(currencies.date);

    function format(inputDate) {
        let d = inputDate.split('-');
        if (d.length === 3) {
            return d[2] + '/' + d[1] + '/' + d[0];
        }
        return inputDate;
    }

    function includeEUR(rates) {
        let obj = new Object(rates);
        if (!obj.hasOwnProperty(ref)) {
            obj[ref] = 1.0
        }
        return obj;
    }

    const [fromCurrency, setFrom] = useState(ref);
    const [toCurrency, setTo] = useState('BRL');
    const [qtd, setQtd] = useState(1000);
    const [total, setTotal] = useState(rates.BRL);

    function updateFrom(value){
        setFrom(value);
    }
    function updateTo(value){
        setTo(value);
    }
    function updateQtd(value){
        setQtd(value);
    }

    useEffect(() => {
        setTotal(Math.floor(rates[toCurrency]/rates[fromCurrency]*qtd*10000)/10000);
    });

    return (
        <div>
            <form className='calculator-form'>
                <div className='group-form'>
                    <select value={fromCurrency} onChange={e => updateFrom(e.target.value)}>
                        {Object.keys(rates).map((option, index) =>
                            <option key={index} value={option}>
                                {option}
                            </option>
                        )}
                    </select>
                    <input type='number' value={qtd} onChange={e => updateQtd(e.target.value)}/>
                </div>
                <i className='fas fa-times'></i>
                <div className='group-form'>
                    <select value={toCurrency} onChange={e => updateTo(e.target.value)}>
                        {Object.keys(rates).map((option, index) =>
                            <option key={index} value={option}>
                                {option}
                            </option>
                        )}
                    </select>
                    <input disabled type='number' placeholder='0' value={total}/>
                </div>
            </form>
            <hr/>
            <p className='updated-time'>Última atualização em {date}</p>
        </div>
    );
}

export default Calculator;