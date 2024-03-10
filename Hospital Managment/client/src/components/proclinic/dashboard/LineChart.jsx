import React from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale,LinearScale, Chart } from "chart.js";
import {PointElement} from'chart.js/auto'
Chart.register(CategoryScale,LinearScale,PointElement);

const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: '',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgb(229,116,152)',
        borderCapStyle: 'round',
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(229,116,152)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 9,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [20,15,34,7,31,18,70,32,15,53],
        responsive:true,
        aspectRatio:true
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      x: {
        type: 'category',
        labels: [0,2016,2017,2018,2019]
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
      },
    },
  };

  return <Line data={data} options={options} style={{height:"350px",width:"500px"}}/>;
};

export default LineChart;
