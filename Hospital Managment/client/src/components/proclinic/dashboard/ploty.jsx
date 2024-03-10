
import Plot from "react-plotly.js";
const PloatChart = () => {
  const chartData = [
    {
      x: [2012,2013,2014,2015,2016,2017,2018],
      y: [20,45,56,35,18,28,20],
      type: "bar",
      marker: { color: "rgb(255,125,0)" },
      borderColor: "#36A2EB",
      backgroundColor: "rgb(255,125,0)",
    },
  ];
  const lay = [
    {
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 10,
          bottom: 10,
        },
      },
    },
  ];
  return (
    <div className="xl:w-[600px] w-[337px] xl:h-[270px] h-[200px] xl:overflow-hidden overflow-scroll no-scrollbar -z-40">
      <Plot data={chartData} style={{  height: "290px", width: "600px"}} />
    </div>
  );
};
export default PloatChart;