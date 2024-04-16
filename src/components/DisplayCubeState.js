import React, { useEffect, useState } from 'react';
import * as Papa from 'papaparse';

import happy from '../cubeStates/relieved.png'
import sad from '../cubeStates/sad.png'
import loud from '../cubeStates/high volume face.png'
import hot from '../cubeStates/high temp.png'
import cold from '../cubeStates/low temp.png'
import neutral from '../cubeStates/neutral.png'
import baq from '../cubeStates/poor air quality.png'

// import fetchData from '../hooks/fetchData';

function DisplayCubeState() {

    var [cubeState, setCubeState] = useState();

    useEffect(() => {
        // -- fetch data
        // fetchData();
        fetch( "../data/envirocubedata.csv" )
            .then( response => response.text() )
            .then( responseText => {
                // -- parse csv
                const resp = Papa.parse(responseText);
                const allData = resp.data;

                const lastDataPoints = allData[allData.length - 2];
                const lastState = lastDataPoints ? Number(lastDataPoints[5]) : 3; // Check if lastDataPoints is defined
                
                if (lastState === 1) {
                    setCubeState(happy);
                    console.log('happy');
                } else if (lastState === 2) {
                    setCubeState(sad);
                    console.log('sad');
                } else if (lastState === 3) {
                    setCubeState(neutral);
                    console.log('neutral');
                } else if (lastState === 99) {
                    setCubeState(baq);
                } else if (lastState === 98) {
                    setCubeState(sad);
                } else if (lastState === 6) {
                    setCubeState(loud);
                } else if (lastState === 7) {
                    setCubeState(cold);
                } else if (lastState === 8) {
                    setCubeState(hot);
                }     
        });
    }, []);

    return (
        <div>
            <h1>Current State</h1>
            {cubeState && <img src={cubeState} alt="Cube state" />}
        </div>
    )
}

export default DisplayCubeState;