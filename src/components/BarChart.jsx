import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Chart } from "chart.js";

Chart.defaults.color = '#000';

ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,LinearScale,BarElement);

function BarChart({ reviews }) {
    const [count, setCount] = useState([0, 0, 0, 0])
    const [data, setData] = useState(null)
    useEffect(() => {
        setData({
            labels: ["Design","Camera","Battery","Display"],
            datasets: [{
                label: 'Votes',
                data:count,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                ],
                borderWidth: 1
            }]
        })
}, [count])
useEffect(() => {
    let temp = [0, 0, 0, 0]
    reviews?.forEach(review => {
        if(review?.reason.includes("Design")){
            temp[0]+=1;
        }
        if(review?.reason.includes("Camera")){
            temp[1]+=1
        }
        if(review?.reason.includes("Battery")){
            temp[2]+=1;
        }
        if(review?.reason.includes("Display")){
            temp[3]+=1
        }
    });
    setCount(temp)
}, [reviews])
return (
    <div className="w-[300px] md:w-[500px] h-fit bg-white px-8 py-8 rounded-xl">
        <p className="text-center noto-sans py-4 font-medium">Best Product by feature</p>
        {data != null && (
            <Bar data={data} />
        )}
    </div>
)
}

export default BarChart;