import React, {useEffect, useState} from 'react';
import CountryCode from './countryCodeAndPrice';

const key = '5d81add0a471e102de1f7222c75929dc'
const endpoint = ['latest', 'symbols'];

//http://data.fixer.io/api/latest?access_key=5d81add0a471e102de1f7222c75929dc&format=1

function calculation(rate, from, to, amount){
    
        let fromAmount, toAmount;
        const array = Object.entries(rate)

        array.forEach(key => {
            var name = key[0];
            var price = key[1];

            if(name === from)
                fromAmount = price;
        
            else if(name === to)
                toAmount = price;
        })

    return ((amount/fromAmount)*toAmount);
}

function Watch(){
    const [countryCode, setCountryCode] = useState({});
    const [from, setFrom] = useState('EUR');
    const [to, setTo] = useState('INR');
    const [amount, setAmount] = useState(0);
    const [convertAmount, setConvertAmount] = useState(0);
    const [search, setSearch] = useState(false);
    const [rate, setRate] = useState({});       

    useEffect(() => {
        fetch(`http://data.fixer.io/api/${endpoint[1]}?access_key=${key}&format=1`).then(res => res.json()).then(data => setCountryCode(data.symbols))
        fetch(`http://data.fixer.io/api/${endpoint[0]}?access_key=${key}&format=1`).then(res => res.json()).then(data => {
            if(data.success)
                setRate(data.rates)
            else{
                console.log('Unable to connect to network')
                setConvertAmount('Unable to connect')
            }
        })
        setSearch(true)
    }, [search])


    function handleSubmit(event){
        
        setConvertAmount(calculation(rate, from, to, amount));
        
        event.preventDefault();
    }

    return(
        <div>
            <div className="welcomeNote">
                <h1>Hello there, Wellcome to currency exchanger</h1>
            </div>
        <div className="converterContainer">
            <form onSubmit={handleSubmit}>            
                <label>From: </label>
                <select value={from} onChange={e => setFrom(e.target.value)}>
                    {Object.entries(countryCode).map(([key, value], i) => <option key={i} value={key}>{value}</option>)}
                </select>

                <br />

                <label>To: </label>
                <select value={to} onChange={e => setTo(e.target.value)}>
                    {Object.entries(countryCode).map(([key, value], i) => <option key={i} value={key}>{value}</option>)}
                </select>

                <br />
                <label>Amount: </label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)}/>
                <br />

                <div className="submitButton">
                    <input type="submit" />
                </div>
                                
            </form>

            <div className="converted">
                Converted Amount: {convertAmount}
            </div>
            
        </div>
            <div>
                <CountryCode country={countryCode}  rate={rate}/>
            </div>

            <div className="footer">
                made by <a href="https://www.instagram.com/aryaksinghchauhan/">Aryak singh chauhan</a>
            </div>
        </div>
    )
}

export default Watch;

// http://data.fixer.io/api/latest?access_key=5d81add0a471e102de1f7222c75929dc&format=1