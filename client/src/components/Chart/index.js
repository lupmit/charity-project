import React, { useEffect } from "react";
import Highcharts from "highcharts";

const data = {
	series: [
		{
			name: "Gases",
			data: [
				{
					name: "Oxygen",
					y: 20.9,
					color: "#2ecc71",
				},
				{
					name: "Trace Gases",
					y: 10.9,
					color: "#f1c40f",
				},
			],
		},
	],
};

const Chart = (props) => {
	const { width, height } = props;
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
			series: data.series,
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
