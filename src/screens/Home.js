import React, {useEffect, useState} from 'react'
import * as Papa from 'papaparse'
import Line from 'react-chartjs-2'

import './Home.css';
import cubeState from '../cubeStates/relieved.png'

// keep this for when u
// function CubeDataDisplay() {
//     var [data, setData] = useState([]);

//     useEffect(() => {
//         // -- fetch data
//         fetch( "../data/envirocubedata.csv" )
//             .then( response => response.text() )
//             .then( responseText => {
//                 // -- parse csv
//                 var resp = Papa.parse(responseText);
//                 setData(resp.data);
//         });
//     });

//     console.log('data:', data[0]);


//     return (
//         <div>
//             <h2>{data[0][0]}</h2>
//             <p>{data[data.length - 2][0]}</p>
//         </div>
//     )  
// }


function CubeDataDisplay() {
    var [data, setData] = useState([]);

    useEffect(() => {
        // -- fetch data
        fetch( "../data/envirocubedata.csv" )
            .then( response => response.text() )
            .then( responseText => {
                // -- parse csv
                var resp = Papa.parse(responseText);
                setData(resp.data);
        });
    });

    console.log('data:', data[0]);


    return (
        <div>
            <h2>{data}</h2>
            <p>{data}</p>
        </div>
    )  
}

function Home (){
    return (
        <div className="home-container">
            <div className="nav-bar">

            </div>
            <div className="content-container">
                <div className="cube-state">
                    <h1>Current State</h1>
                    <img src={cubeState} alt="Cube-State"/>
                </div>
                <div className="cube-data">
                    <h1>Last Cube Data</h1>
                    <CubeDataDisplay/>
                </div>
            </div>
            
        </div>
    );
};

export default Home;
