import React, {useEffect, useState} from 'react'

import Chart from 'chart.js/auto';

import DisplayLatestData from '../components/DisplayLatestData';
import DisplayGraphData from '../components/DisplayGraphData';
import DisplayCubeState from '../components/DisplayCubeState';

import './Home.css';

function Home (){
    const [dataType, setDataType] = useState('temp');


    return (
        <div className="home-container">
            <div className="nav-bar">

            </div>
            <div className="content-container-main">
                <div className="cube-info">
                    <DisplayCubeState/>
                </div>
                <div className="cube-info">
                    <DisplayLatestData/>
                </div>
            </div>
            <div className = 'content-container-horz'>
                <DisplayGraphData/>
            </div>
        </div>
    );
};

export default Home;
