import React, {useState, useEffect} from "react";
import './assets/Calculator.css';


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
        let objaux = {}
        Object.assign(objaux, rates);
        if (!objaux.hasOwnProperty(ref)) {
            objaux[ref] = 1.0
        }
        return Object.keys(objaux).sort().reduce(
            (obj, key) => {
                obj[key] = objaux[key];
                return obj;
            },
            {}
        );
    }

    const [fromCurrency, setFrom] = useState(ref);
    const [toCurrency, setTo] = useState('BRL');
    const [qtd, setQtd] = useState(1000);
    const [coef, setCoef] = useState(rates.BRL);

    useEffect(() => {
        setCoef(rates[toCurrency] / rates[fromCurrency]);
    }, [rates, toCurrency, fromCurrency]);

    function invertPostions(){
        let aux = fromCurrency;
        setFrom(toCurrency);
        setTo(aux)
    }

    return (
        <div>
            <form className='calculator-form'>
                <div className='group-form'>
                    <select value={fromCurrency} onChange={e => setFrom(e.target.value)}>
                        {Object.keys(rates).map((option, index) =>
                            <option key={index} value={option}>
                                {option}
                            </option>
                        )}
                    </select>
                    <input type='number' value={qtd} onChange={e => setQtd(e.target.value)}/>
                </div>
                <i onClick={invertPostions} className='change-icon fas fa-sync-alt'></i>
                <div className='group-form'>
                    <select value={toCurrency} onChange={e => setTo(e.target.value)}>
                        {Object.keys(rates).map((option, index) =>
                            <option key={index} value={option}>
                                {option}
                            </option>
                        )}
                    </select>
                    <input disabled type='number' placeholder='0' value={Math.floor(coef*qtd*10000)/10000}/>
                </div>
            </form>
            <p className='unity-convertion'>1 {fromCurrency} = {Math.floor(coef*10000)/10000} {toCurrency}</p>
            <hr/>
            <p className='updated-time'>Última atualização em {date}</p>
        </div>
    );
}

export default Calculator;