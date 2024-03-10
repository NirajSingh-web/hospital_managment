import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ["Pending","Completed","Cancelled"],
    datasets: [
      {
        data: [30,29,45],
        backgroundColor: ["rgb(255,170,42)","rgb(239,110,110)","rgb(34,198,171)"],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };


  return (
    <div>
      <Pie data={data}  height={"255px"} style={{height:"250px"}}/>
    </div>
  );
};

export default PieChart;

