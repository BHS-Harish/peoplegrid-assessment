import React, { useEffect, useState } from "react";
import { ConfigProvider, Select, Divider } from 'antd'
import BackHeader from "./components/BackHeader";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import { getReviews } from './utils'
import { FaStar } from "react-icons/fa";

function Dashboard() {

    const [reviews, setReviews] = useState([])
    const [filter, setFilter] = useState("Anytime")
    const [filteredData, setFilteredData] = useState([])

    const desc = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent'];

    useEffect(() => {
        async function fetchReviews() {
            const res = await getReviews()
            setReviews(res)
        }
        fetchReviews()
    }, [])

    useEffect(() => {
        if (filter == "Past 24 hours") {
            console.log("24")
            setFilteredData(reviews?.filter((review) => review?.createdAt > (Date.now() - (24 * 60 * 60 * 1000))))
        } else if (filter == "Past Week") {
            setFilteredData(reviews?.filter((review) => review?.createdAt > (Date.now() - (7 * 24 * 60 * 60 * 1000))))
        } else if (filter == "Past month") {
            setFilteredData(reviews?.filter((review) => review?.createdAt > (Date.now() - (30 * 24 * 60 * 60 * 1000))))
        } else {
            setFilteredData(reviews)
        }
    }, [filter, reviews])

    const DateFilterOptions = ["Anytime", "Past 24 hours", "Past Week", "Past month"].map((data) => {
        return { label: data, value: data }
    })

    return (
        <div className='w-full min-h-[100vh] bg-gray-950 pb-12'>
            <ConfigProvider theme={{
                components: {
                    Select: {
                        selectorBg: "#030712",
                        activeBorderColor: "#22c55e",
                        colorText: "#fff",
                        optionSelectedBg: "#15803d",
                        colorBorder: "#15803d",
                        optionActiveBg: "#052e16",
                        colorBgBase: "#000"

                    },
                    Divider: {
                        colorText: "#fff"
                    }
                }
            }}>
                <BackHeader title={"Dashboard"} />
                <div className="w-full px-4 py-8 md:px-12">
                    <Select className='w-[150px] bg-gray-950 border-green-700 text-white noto-sans' defaultActiveFirstOption dropdownStyle={{ backgroundColor: "#030712" }} size="large" defaultValue={DateFilterOptions[0]} options={DateFilterOptions} onChange={(value) => {
                        setFilter(value)
                    }} value={filter} />
                </div>
                <div className="w-full flex justify-center flex-wrap gap-8">
                    <PieChart reviews={filteredData} />
                    <BarChart reviews={filteredData} />
                    <LineChart reviews={filteredData} />
                </div>
                <p className="text-white noto-sans border-b mx-4 md:mx-12 pb-2 mt-12 text-xl">Reviews</p>
                <div className="px-4 md:px-12 flex gap-6 justify-center flex-wrap py-12">
                    {
                        filteredData?.map((review, index) => {
                            return (
                                <div className="w-[320px] bg-green-800/[.2] px-6 py-6 rounded-xl" key={index}>
                                    <div className="flex items-center text-white gap-3 noto-sans">
                                        <div className="text-white flex items-center gap-2 px-3 rounded-xl py-1 bg-yellow-400/[.1] w-fit">
                                            <FaStar className="text-yellow-400" />
                                            <p>{review?.stars}</p>
                                        </div>
                                        <p>{desc[review?.stars-1]}</p>
                                    </div>
                                    <p className="text-white noto-sans py-4">{review?.comments}</p>
                                    <p className="text-white noto-sans text-xs font-semibold">Certified Buyer : {review?.name}, {review?.state}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </ConfigProvider>
        </div>
    )
}

export default Dashboard;