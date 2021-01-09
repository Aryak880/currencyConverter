import React, {useEffect, useState} from 'react';

const key = '5d81add0a471e102de1f7222c75929dc'
const endpoint = ['latest', 'symbols'];

const calculation = ({rates, success}, from, to, amount) => {
    if(success){
        let fromAmount, toAmount;

        Object.entries(rates).map((key, value) => {
            
            let name = key[0];
            let price = key[1];

            if(name === from)
                fromAmount = price;

            else if(name === to)
                toAmount = price;
        })
        
        return (amount/fromAmount)*toAmount;


    }else{
        console.log('Unable to fetch data')
    }
}


function Watch(){
    const [countryCode, setCountryCode] = useState({});
    const [from, setFrom] = useState('EUR');
    const [to, setTo] = useState('INR');
    const [amount, setAmount] = useState(0);
    const [convertAmount, setConvertAmount] = useState(0);
    const [search, setSearch] = useState(false);
       

    useEffect(() => {
        fetch(`http://data.fixer.io/api/${endpoint[1]}?access_key=${key}&format=1`).then(res => res.json()).then(data => setCountryCode(data.symbols))
        setSearch(true)
    }, [search])


    const handleSubmit = (event) => {
        fetch(`http://data.fixer.io/api/${endpoint[0]}?access_key=${key}&format=1`).then(res => res.json()).then(data => {
            setConvertAmount(calculation(data, from, to, amount))
        })

        event.preventDefault();
    }

    return(
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

                
                <input type="submit" />
                
            </form>

            Converted Amount: {convertAmount}
        </div>
    )
}

export default Watch

// http://data.fixer.io/api/latest?access_key=5d81add0a471e102de1f7222c75929dc&format=1