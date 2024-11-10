import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart } from "chart.js";

Chart.defaults.color = '#000';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ reviews }) {
    const [stars, setStars] = useState([0, 0, 0, 0, 0])
    const [data, setData] = useState(null)
    useEffect(() => {
        setData({
            labels: ["1 Star","2 Star","3 Star","4 Star","5 Star"],
            datasets: [
                {
                    label:"Star Count",
                    data: stars,
                    backgroundColor: [
                        'rgb(254 249 195)',
                        'rgb(254 240 138)',
                        'rgb(253 224 71)',
                        'rgb(250 204 21)',
                        'rgb(234 179 8)'
                    ],
                    borderWidth: 2,
                    color:"#fff",
                    hoverBorderColor:"#000"
                },
            ],
        })
}, [stars])
useEffect(() => {
    let temp = [0, 0, 0, 0, 0]
    reviews?.forEach(review => {
        temp[review?.stars - 1] = temp[review?.stars - 1] + 1;
    });
    setStars(temp)
}, [reviews])
return (
    <div className="w-[300px] md:w-[500px] bg-white px-8 py-8 rounded-xl">
        <p className="text-center noto-sans py-4 font-medium">Star Distribution</p>
        {data != null && (
            <Pie data={data} options={{animation:{animateScale:true}}} />
        )}
    </div>
)
}

export default PieChart;