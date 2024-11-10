import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { Chart } from "chart.js";
import _ from 'underscore'

Chart.defaults.color = '#000';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

function LineChart({ reviews }) {
    const [count, setCount] = useState({})
    const [data, setData] = useState(null)
    useEffect(() => {
        setData({
            labels: Object.keys(count),
            datasets: [{
                label: 'Reviewers',
                data: Object.values(count),
                fill: false,
                borderColor: 'rgb(75, 50, 192)',
                tension: 0.5,    
            }],
            showLine:false
        })
    }, [count])
    useEffect(() => {
        setCount(_.countBy(reviews, "state"))
    }, [reviews])
    return (
        <div className="w-[300px] md:w-[500px] h-fit bg-white px-8 py-8 rounded-xl">
            <p className="text-center noto-sans py-4 font-medium">State wise Reviewer's count</p>
            {data != null && (
                <Line data={data} />
            )}
        </div>
    )
}

export default LineChart;