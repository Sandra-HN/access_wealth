import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import alasql from "alasql";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SecurityChart = ({ securityTimeSeries, portfolioValuation }) => {
  // const barcolors = [
  //   "#55BF3B",
  //   "#F0A132",
  //   "#EF5E63",
  //   "#2F4977",
  //   "#1890FF",
  //   "#6F65B1",
  //   "#EF5E63",
  //   "#2F4977",
  //   "#1890FF",
  //   "#6F65B1",
  //   "#EF5E63",
  //   "#2F4977",
  // ];
  const [loading, setLoading] = useState(true);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Market Value Chart",
      },
    },
  };
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState({
    labels,
    datasets: [],
  });
  useEffect(() => {
    if (securityTimeSeries?.length > 0) {
      console.log("securityTimeSeries", securityTimeSeries);
      generateData();
    }
  }, [securityTimeSeries]);
  var dynamicColors = function () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  };
  const generateData = async () => {
    let timeSeriesLabels = await alasql(
      `SEARCH DISTINCT( /[values]/ as @details @details.key) \
      FROM ?`,
      [securityTimeSeries]
    );
    if (timeSeriesLabels.length) {
      setLabels(timeSeriesLabels);
    }
    let timeSeriesDataSet = await alasql(
      `SEARCH  / as @details  return(@details->key.name as [label] )\
      FROM ?`,
      [securityTimeSeries]
    );

    if (timeSeriesDataSet.length) {
      let CDATA = [];
      await timeSeriesDataSet.map(async (item, i) => {
        let ss = await alasql(
          `SEARCH / as @details\
          [values]/ as @V\
          WHERE(@details->key.name='${item.label}') @V[value] \
          FROM ?`,
          [securityTimeSeries]
        );
        let color = dynamicColors();
        CDATA.push({
          label: item.label,
          data: ss,
          borderColor: color,
          backgroundColor: color,
        });
      });

      await setChartData({
        labels: timeSeriesLabels,
        datasets: CDATA,
      });
      setLoading(false);
    }
  };
  return (
    !loading && (
      <div className="w-11/12 mx-auto bg-viol/20 backdrop-blur-sm border border-viol/50 rounded-2xl">
        <Line options={options} data={chartData} />
      </div>
    )
  );
};

export default SecurityChart;
