import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import Papa from 'papaparse';
import './DisplayGraphData.css';
// import fetchData from '../hooks/fetchData';


var previousState = 'temp';

function DisplayGraphData() {
    const [data, setData] = useState([]);
    const [dataType, setDataType] = useState(previousState);

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


    // -- parse data
    // const timeData = data.map((row) => row[0]);
    // const tempData = data.map((row) => row[1]);
    // const humidityData = data.map((row) => row[2]);
    // const AQIData = data.map((row) => row[3]);
    // const volumeData = data.map((row) => row[4]);

    // select last 100 points of, 3 second interval means 300 seconds or 5 minutes
    // set timeData to display hours, minutes
    const timeData = data.map((row) => row[0]).slice(-100).map((time) => {
        const date = new Date(time);
        return `${date.getHours()}:${date.getMinutes()}`;
    });;

    const tempData = data.map((row) => row[1]).slice(-100);
    const humidityData = data.map((row) => row[2]).slice(-100);
    const AQIData = data.map((row) => row[3]).slice(-100);
    const volumeData = data.map((row) => row[4]).slice(-100);
    
    const displayTemp = {
        labels: timeData,
        datasets: [
            {
                label: "Temperature",
                data: tempData,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1
            },
        ]
    }
    const displayHumidity = {
        labels: timeData,
        datasets: [
            {
                label: "humidityData",
                data: humidityData,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1
            },
        ]
    }
    const displayAQI = {
        labels: timeData,
        datasets: [
            {
                label: "AQIData",
                data: AQIData,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1
            },
        ]
    }
    const displayVolume = {
        labels: timeData,
        datasets: [
            {
                label: "volumeData",
                data: volumeData,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1
            },
        ]
    }
    Chart.defaults.font.size = 20;

    function onClick() {
        // cycle through the different data types
        if(dataType === 'temp') {
            setDataType('humidity');
            previousState = 'humidity';
        } else if(dataType === 'humidity') {
            setDataType('AQI');
            previousState = 'AQI';
        } else if(dataType === 'AQI') {
            setDataType('volume');
            previousState = 'volume';
        } else if(dataType === 'volume') {
            setDataType('temp');
            previousState = 'temp';
        }
    }

    if(dataType === 'temp') {
        return (
            <div onClick={onClick} className='graph-container'>
                <Line data={displayTemp} />
            </div>
        )
    } else if(dataType === 'humidity') {
        return (
            <div onClick={onClick} className='graph-container'>
                <Line data={displayHumidity} />
            </div>
        )
    } else if( dataType === 'AQI') {
        return (
            <div onClick={onClick} className='graph-container'>
                <Line data={displayAQI} />
            </div>
        )
    } else if( dataType === 'volume') {
        return (
            <div onClick={onClick} className='graph-container'>
                <Line data={displayVolume} />
            </div>
        )
    }
}

export default DisplayGraphData;