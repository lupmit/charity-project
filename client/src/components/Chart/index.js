import React, { useEffect } from "react";
import Highcharts from "highcharts";

const data = {
	series: [
		{
			name: "Gases",
			data: [
				{
					name: "Argon",
					y: 0.9,
					color: "#3498db",
				},
				{
					name: "Nitrogen",
					y: 78.1,
					color: "#9b59b6",
				},
				{
					name: "Oxygen",
					y: 20.9,
					color: "#2ecc71",
				},
				{
					name: "Trace Gases",
					y: 0.1,
					color: "#f1c40f",
				},
			],
		},
	],
};

const Chart = () => {
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
					innerSize: "70%",
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
			style={{ width: "300px", height: "300px", margin: "0 auto" }}
		></div>
	);
};

export default Chart;
