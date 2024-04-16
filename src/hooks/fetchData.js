// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Papa from 'papaparse';



// function fetchData() {
//     const [csvData, setCsvData] = useState([]);

//     useEffect(() => {

//         axios({
//             method: 'get',
//             url: 'http://172.20.10.10/data',
//             responseType: 'json'
//           })
//             .then( response => response.text() )
//             .then( responseText => {
//                 // -- parse csv
//                 const resp = Papa.parse(responseText);
//                 setCsvData(resp.data);
//         });
//     });

//     return csvData;
// }

// export default fetchData;
import axios from 'axios';

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: '../../public/data/envirocubedata.csv',
    header: [
        {id: 'time', title: 'TIME'},
        {id: 'temp', title: 'TEMP'},
        {id: 'humidity', title: 'HUMIDITY'},
        {id: 'air', title: 'AIR'},
        {id: 'volume', title: 'VOLUME'},
        {id: 'currentFace', title: 'CURRENTFACE'},
        {id: 'currentReading', title: 'CURRENTREADING'}
    ],
    append: true
});

const fetchData = async () => {
    try {
        const response = await axios.get('http://172.20.10.10/data');
        const data = response.data;
        const record = {
            time: new Date().toISOString(),
            temp: data.temp,
            humidity: data.humidity,
            air: data.air,
            volume: data.volume,
            currentFace: data.currentFace,
            currentReading: data.currentReading
        };
        csvWriter.writeRecords([record]);
    } catch (err) {
        console.log('Error fetching data:', err);
    }
};

setInterval(fetchData, 3000);


export default fetchData;