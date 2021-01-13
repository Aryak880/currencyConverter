import React from 'react'

function CountryCode(data){

    const country = Object.entries(data.country).map(([key, value]) => <li key={key} >{value} - {key}</li>)
    const rate = Object.entries(data.rate).map(([key, value]) => <li key={key}>{key} - {value}</li>)

    return(
        <div className="codeAndPrice">
            <div className="card" id="code">
                <h3>Country codes</h3>
                <ul>
                    {country}
                </ul>
            </div>
            <div className="card" id="price">
                <h3>1 Euro equals to other currency</h3>
                <ul>
                    {rate}
                </ul>
            </div>
        </div>
    )
}

export default CountryCode;
