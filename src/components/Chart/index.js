import React, { useEffect } from "react";
import Highcharts from "highcharts";

const Chart = (props) => {
	const { width, height, dataChart } = props;
	const renderChart = () => {
		Highcharts.chart({
			chart: {
				type: "pie",
				renderTo: "pie-chart",
			},
			title: {
				text: null,
			},
			plotOptions: {
				pie: {
					dataLabels: false,
					innerSize: "60%",
				},
			},
			credits: {
				enabled: false,
			},
			tooltip: {
				enabled: false,
			},

			series: dataChart.series,
		});
	};
	useEffect(() => {
		renderChart();
	}, []);
	return (
		<div
			id="pie-chart"
			style={{ width: width, height: height, margin: "0 auto" }}
		></div>
	);
};

export default Chart;
