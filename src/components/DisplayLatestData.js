import React, { useState, useEffect } from 'react';
import * as Papa from 'papaparse';

// import fetchData from '../hooks/fetchData';


function DisplayLatestData() {
    const [data, setData] = useState([]);


    useEffect(() => {
        // -- fetch data
        // fetchData();

        fetch( "../data/envirocubedata.csv" )
            .then( response => response.text() )
            .then( responseText => {
                // -- parse csv
                const resp = Papa.parse(responseText);
                setData(resp.data);
        });
    }, []); // Add an empty dependency array here

    const lastDataPoints = data[data.length - 2];
    // const lastTime = lastDataPoints ? Date(lastDataPoints[0]) : "missing"; // Check if lastDataPoints is defined
    const lastTime = lastDataPoints ? new Date(lastDataPoints[0]) : null;
    const lastHourMinute = lastTime ? `${lastTime.getHours()}:${lastTime.getMinutes()}` : "missing";

    const lastTemp = lastDataPoints ? lastDataPoints[1] + " °F" : "missing";
    const lastHumidity = lastDataPoints ? lastDataPoints[2] + " %": "missing";
    const lastAQI = lastDataPoints ? lastDataPoints[3] + " ug/m3": "missing";
    
    
    const volume = lastDataPoints ? parseFloat(lastDataPoints[4]) : null;
    const lastVolume = volume === null ? "missing" :
                      volume < 1.6 ? "Optimal" :
                      volume <= 2.2 ? "Moderate" :
                      "Excessive";    
    return (
        <div className="content-container-vert">
            <h1>Last Data Collected at {lastHourMinute} </h1>
            <div className = "content-container-horz">
                <div className="last-display-box">
                    <h2>Temperature</h2>
                    <p className='last-display-text'>{lastTemp}</p>
                </div>
                <div className="last-display-box">
                    <h2>Humidity</h2>
                    <p className='last-display-text'>{lastHumidity}</p>
                </div>
            </div>
            <div className="content-container-horz">
                <div className="last-display-box">
                    <h2>Air Quality</h2>
                    <p className='last-display-text'>{lastAQI}</p>
                </div>
                <div className="last-display-box">
                    <h2>Volume</h2>
                    <p className='last-display-text'>{lastVolume}</p>
                </div>
            </div>
        </div>
    )  
}

export default DisplayLatestData;