import React, { useEffect, useState } from 'react'
import { Input, ConfigProvider, Select, Rate, Checkbox, message,Modal } from 'antd';
import BackHeader from './components/BackHeader';
import ThankYou from './assets/thank-you.gif'
import { IoArrowUndoOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { states } from './assets/data'
import {addReview} from './utils'

const { TextArea } = Input

function WriteReview() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [state, setState] = useState("Andamon and Nicobar Islands")
    const [stars, setStars] = useState(0)
    const [comments, setComments] = useState("")
    const [reason, setReason] = useState([])
    const [agree, setAgree] = useState(false)
    const[proceed,setProceed]=useState(false)

    const[messageApi,ContextHolder]=message.useMessage()

    const[open,setOpen]=useState(false)

    const desc = ['Terrible', 'Poor', 'Average', 'Good', 'Excellent'];

    const options = [
        {
            label: 'Design',
            value: 'Design',
        },
        {
            label: 'Battery',
            value: 'Battery',
        },
        {
            label: 'Camera',
            value: 'Camera',
        },
        {
            label: 'Display',
            value: 'Display',
        },
    ];

    const stateData = states.map((data) => {
        return {
            value: data.name,
            label: data.name
        }
    })

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const data={name,email,state,stars,comments,reason,createdAt:Date.now()}
        const res=await addReview(data)
        if(!res?.status){
            messageApi.error(res?.message)    
        }
        else{
            messageApi.success(res?.message)
            setOpen(true)
        }
    }

    useEffect(()=>{
        if(state!=""&&stars!==0&&agree)
            setProceed(true)
        else
            setProceed(false)
    },[state,stars,agree])



    const navigate = useNavigate()
    return (
        <div className='w-full min-h-[100vh] bg-gray-950 pb-12'>
            {ContextHolder}
            <ConfigProvider theme={{
                components: {
                    Input: {
                        activeBg: "#030712",
                        hoverBg: "#030712",
                        activeBorderColor: "#22c55e",
                        hoverBorderColor: "#22c55e",
                    },
                    Select: {
                        selectorBg: "#030712",
                        activeBorderColor: "#22c55e",
                        colorText: "#fff",
                        optionSelectedBg: "#15803d",
                        colorBorder: "#15803d",
                        optionActiveBg: "#052e16",
                        colorBgBase: "#000"

                    },
                    Checkbox: {
                        colorText: "#fff"
                    }
                }
            }}>
                <BackHeader title={"Reviews"}/>
                <h1 className='px-4 md:px-8 text-center text-green-500 noto-sans text-2xl md:text-3xl py-8 font-semibold'>Tell us about your experience..!</h1>
                <div className='w-full px-4 md:py-8 flex justify-center pb-12'>
                    <form className='min-w-[300px] w-[40%] bg-green-950/[.3] border border-white/25 rounded-md px-4 py-4 pb-12' onSubmit={handleSubmit}>
                        <div className='my-4'>
                            <p className='text-green-300 text-sm font-medium mb-2 noto-sans'>Name *</p>
                            <Input className='bg-gray-950 border-green-700 text-white noto-sans ' type='text' placeholder='Ex : Sachin' size='large' value={name} onChange={(e) => {
                                setName(e.target.value.trimStart())
                            }} required/>
                        </div>
                        <div className='my-4'>
                            <p className='text-green-300 text-sm font-medium mb-2 noto-sans'>Email *</p>
                            <Input className='bg-gray-950 border-green-700 text-white noto-sans' type='email' placeholder='Ex : sachin10@gmail.com' size='large' value={email} onChange={(e) => {
                                setEmail(e.target.value.trimStart().toLowerCase())
                            }} required/>
                        </div>
                        <div className='my-4'>
                            <p className='text-green-300 text-sm font-medium mb-2 noto-sans'>Select your state *</p>
                            <Select className='w-full bg-gray-950 border-green-700 text-white noto-sans' dropdownStyle={{ backgroundColor: "#030712" }} placeholder="State" size='large' options={stateData} onChange={(value) => {
                                setState(value)
                            }} value={state}>

                            </Select>
                        </div>
                        <div className='my-4 flex flex-col items-center py-4'>
                            <p className='text-green-300 text-sm font-medium mb-2 noto-sans'>Rate the product *</p>
                            <Rate className='text-4xl mt-5' tooltips={desc} onChange={(value) => {
                                setStars(value)
                            }} value={stars} />
                        </div>
                        <div className='my-4'>
                            <p className='text-green-300 text-sm font-medium mb-2 noto-sans'>Any comments or suggestions</p>
                            <TextArea className='bg-gray-950 border-green-700 text-white noto-sans py-3' rows={4} type='text' placeholder='Write here...' size='large' value={comments} onChange={(e) => {
                                setComments(e.target.value.trimStart())
                            }} />
                        </div>
                        <div className='my-4 text-white'>
                            <p className='text-green-300 text-sm font-medium mb-2 noto-sans'>Iphone 16 pro was best for its </p>
                            <Checkbox.Group className='accent-pink-200' options={options} onChange={(checkedValue) => {
                                setReason(checkedValue)
                            }} value={reason} />
                        </div>
                        <div className='my-6 text-white'>
                            <label className='text-white noto-sans text-sm select-none'>
                                <input className='accent-green-500 text-xl scale-125 me-3' type='checkbox' checked={agree} onChange={(e)=>{
                                    setAgree(e.target.checked)
                                }} required/>
                                I acknowledged <span className='text-green-500'>Terms & conditions</span> and <span className='text-green-500'>privacy policy.</span>
                            </label>
                        </div>
                        <button className='w-full bg-green-500 duration-500 hover:bg-lime-600 border border-lime-600 disabled:opacity-50 disabled:cursor-no-drop py-2 font-medium rounded-xl' disabled={proceed?false:true}>Submit Review</button>
                        <p className='text-white mt-4 noto-sans text-end'>* Indicates are required</p>
                    </form>
                </div>

                {/* Success Popup */}
                <Modal open={open} footer={null} closable={false} centered>
                    <div className='w-full flex flex-col items-center py-8'>
                        <img className='w-[120px]' src={ThankYou} />
                        <p className='noto-sans text-xl font-bold text-green-700 my-3'>Thank You for Your Review!</p>
                        <p className='text-center text-md noto-sans px-3'>We appreciate your support and hope you continue to enjoy your purchase.</p>
                        <button className='flex items-center gap-2 text-md font-medium text-green-700 border border-green-700 px-6 py-2 rounded-3xl duration-500 hover:bg-green-300/25 mt-8' onClick={()=>{
                            navigate('/')
                        }}>
                            <span>Continue Purchase</span>
                            <IoArrowUndoOutline/>
                        </button>
                    </div>
                </Modal>

            </ConfigProvider>
        </div>
    )
}

export default WriteReview;