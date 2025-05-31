import { Progress } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { errorMessage, successMessage } from '@/utils/functions'
import { FaEdit, FaPlus } from "react-icons/fa";
import Formbutton from '@/utils/Formbutton'
import { Apis, GetApi, PostApi } from '@/services/Api'
import { useDispatch, useSelector } from 'react-redux'
import ModalLayout from '@/utils/ModalLayout'
import FormComponent from '@/utils/FormComponent'
import ButtonComponent from '@/utils/ButtonComponent'
import Loader from '@/utils/Loader'
import { dispatchProfile } from '@/app/reducer'
import SaveHistory from '@/utils/SaveHistory'

const Savings = () => {

    const [support, setSupport] = useState(false)
    const proofDiv = useRef(null)
    const [records, setRecords] = useState([])
    const [load, setLoad] = useState(false)
    const [load2, setLoad2] = useState(false)
    const [load3, setLoad3] = useState(false)
    const [savings, setSavings] = useState([])
    const [selectedItem, setSelectedItem] = useState({})
    const [closeview, setCloseView] = useState(true)
    const [add, setAdd] = useState(false)
    const [topup, setTopup] = useState(false)
    const [adminBanks, setAdminBanks] = useState([])
    const [createsave, setCreateSave] = useState(false)
    const profile = useSelector((state) => state.profile.profile)
    const currency = useSelector((state) => state.profile.currency)
    const dispatch = useDispatch()



    const fetchAdminBanks = useCallback(async () => {
        try {
            const res = await GetApi(Apis.auth.get_adminBanks)
            if (res.status !== 200) return;
            setAdminBanks(res.data)
        } catch (error) {
            errorMessage(error.message)
            console.log(error)
        }
    }, [])
    const fetchUserSavings = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.user_savings)
            if (response.status !== 200) return;
            setSavings(response.data)
            // console.log(response.data)
        } catch (error) {
            errorMessage(error.message)
        }
    }, [])

    useEffect(() => {
        fetchUserSavings()
        fetchAdminBanks()
    }, [])


    const fetchSavingsHistory = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.all_savings)
            if (response.status === 200) {
                setRecords(response.data)
            } else {
                console.log(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
        }
    }, [])


    useEffect(() => {
        fetchSavingsHistory()
    }, [fetchSavingsHistory])

    const steps = [
        {
            step: 'Follow the deposit button to make a transfer.',
        },
        {
            step: 'Contact customer support if there are no banks available.',
        },
        {
            step: 'Upload a Photo of your transaction.',
        },
        {
            step: 'Wait for confirmation, once confirmed your account will be credited.',
        },
    ]


    const [saveForms, setSaveForms] = useState({
        name: '',
        goal: '',
        current: ''
    })

    const [proofForm, setProofForm] = useState({
        amount: ''
    })

    const handleChange = (e) => {
        setSaveForms({
            ...saveForms,
            [e.target.name]: e.target.value
        })
    }

    const createSavings = async (e) => {
        e.preventDefault()
        if (!saveForms.name) return errorMessage('Savings name is required')
        if (!saveForms.goal) return errorMessage('Savings goal is required')
        if (saveForms.current < 0 || saveForms.current === 0) return errorMessage(`Amount can not be negative or zero`)
        if (saveForms.current > profile?.balance) return errorMessage(`Insufficient balance`)
        const formdata = {
            goal: saveForms.goal.toLocaleString(),
            name: saveForms.name,
            current: saveForms.current.toLocaleString()
        }
        setLoad3(true)
        try {
            const response = await PostApi(Apis.auth.create_savings, formdata)
            if (response.status === 200) {
                successMessage(response.msg)
                setSaveForms({ ...saveForms, goal: '', name: '', current: '' })
                setCreateSave(false)
                fetchUserSavings()
                dispatch(dispatchProfile(response.user))
            } else {
                console.log(response.msg)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoad3(false)
        }
    }


    const imgRef = useRef()
    const [proofimg, setProofimg] = useState({
        img: "",
        image: ''
    })

    const changeImage = (e) => {
        setProofimg({
            img: e.target.src,
            image: null
        })
    }

    // console.log(savings)
    const handleImage = (e) => {
        const file = e.target.files[0]
        if (file.size >= 1000000) {
            imgRef.current.value = null
            return errorMessage('file too large')
        }
        if (!file.type.startsWith(`image/`)) {
            imgRef.current.value = null
            return errorMessage('Invalid file format detected, try with a different photo format like ')
        }
        setProofimg({
            img: URL.createObjectURL(file),
            image: file
        })
    }

    useEffect(() => {
        if (proofDiv) {
            window.addEventListener('click', e => {
                if (proofDiv.current !== null && !proofDiv.current.contains(e.target)) {
                    setSupport(false)
                }
            }, true)
        }
    }, [])

    const submitForm = async (e) => {
        e.preventDefault()
        if (!proofForm.amount) return errorMessage(`Input amount is required to proceed`)
        if (proofForm.amount <= 0) return errorMessage(`No negative amount`)
        const formdata = new FormData()
        formdata.append('amount', proofForm.amount)
        formdata.append('image', proofimg.image)
        // return console.log(profile?.firstname)
        setLoad(true)
        try {
            const res = await PostApi(Apis.auth.deposit, formdata)
            if (res.status === 200) {
                setTimeout(() => {
                    setLoad(false)
                    setSupport(false)
                    successMessage('Transaction proof submitted')
                    setProofimg({
                        img: '',
                        image: null
                    })
                    setProofForm({
                        amount: ''
                    })
                }, 2000)
            } else {
                errorMessage(res.msg)
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoad(false)
        }

    }



    
    const [forms, setForms] = useState({
        id: selectedItem.id,
        amount: ''
    })
  

    const topUpSavings = async (e) => {
        e.preventDefault()

        if (forms.amount < 0) return errorMessage(`Amount can not be negative`)
        const formdata = {
            id: selectedItem.id,
            amount: forms.amount
        }
        // return  console.log(formdata)
        setLoad2(true)
        setTopup(false)
        try {
            const response = await PostApi(Apis.auth.topup, formdata)
            if (response.status === 200) {
                successMessage(response.msg)
                setCloseView(false)
                setForms({ ...forms, id: '', amount: '' })
                fetchUserSavings()
                fetchSavingsHistory()
                dispatch(dispatchProfile(response.user))
            }
        } catch (error) {
            console.log(error)
            errorMessage(error.message)
        } finally {
            setLoad2(false)

        }
    }

   


    const newCurr = useSelector((state) => state.profile.newCurr)

    const handleAmountChange = (event) => {
        const {value } = event.target
        const numericValue = value.replace(/,/g, '').replace(/\D/g, '');
        const formattedValue = numericValue ? Number(numericValue).toLocaleString() : '';
        setProofForm({
            ...proofForm,
            amount: formattedValue
        });
    }
    return (
        <div className={`w-11/12  mx-auto mt-10`}>

            {createsave &&
                <ModalLayout setModal={setCreateSave} clas={`lg:w-[60%] w-11/12 mx-auto`}>
                    <form onSubmit={createSavings} className="h-fit w-full relative bg-white rounded-lg p-10">

                        {load3 &&
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 ">
                                <Loader />
                            </div>
                        }
                        <div className="w-full flex items-start gap-5 flex-col ">
                            <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                <div className="lg:w-[45%]">Savings Goal Name</div>
                                <FormComponent name={'name'} value={saveForms.name} onchange={handleChange} />
                            </div>
                            <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                <div className="lg:w-[45%]">Goal Target</div>
                                <FormComponent formtype='phone' name={'goal'} value={saveForms.goal} onchange={handleChange} />
                            </div>
                            <div className="flex w-full lg:items-center flex-col lg:flex-row justify-between">
                                <div className="flex items-start lg:w-[45%]   flex-col">
                                    <div className="w-full">Amount to add </div>
                                    <div>Available bal: {profile?.currency === '?' ? newCurr : currency}{profile?.balance?.toLocaleString()}</div>
                                </div>
                                <FormComponent formtype='phone' name={'current'} value={saveForms.current} onchange={handleChange} />
                            </div>
                        </div>
                        <div className="lg:w-1/2 mx-auto mt-8">
                            <ButtonComponent disabled={load3 ? true : false} title={`Create Savings`} bg={`text-white bg-col to-sec h-14 `} />
                        </div>
                    </form>
                </ModalLayout>
            }

            {support &&
                <ModalLayout setModal={setSupport} clas={`lg:w-[60%] w-11/12 mx-auto`}>
                    <div ref={proofDiv} className={`w-full p-10 rounded-lg bg-white h-fit `}>
                        <div className="w-full">
                            <form onSubmit={submitForm} className="lg:w-3/4 w-full mx-auto">
                                <div className="text-lg font-semibold text-primary">
                                    {adminBanks.length > 1 ? 'Make payment to any of these bank accounts below' : 'Make payment to this bank account below'}</div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {adminBanks.map((bank, i) => (
                                        <div className="flex items-start  flex-col gap-1  p-2 bg-col text-white mb-5 rounded-md w-full " key={i}>
                                            <div className="text-base font-light gap-2 flex items-center">
                                                <div className="">Account Name:</div>
                                                <div className="">{bank.fullname}</div>
                                            </div>
                                            <div className="text-base font-light gap-2 flex items-center">
                                                <div className="">Bank Name:</div>
                                                <div className="">{bank.bank_name}</div>
                                            </div>
                                            <div className="text-base font-light gap-2 flex items-center">
                                                <div className="">Account No:</div>
                                                <div className="">{bank.account_no}</div>
                                            </div>
                                            {bank.route_no && <div className="text-base font-light gap-2 flex items-center">
                                                <div className="">Route:</div>
                                                <div className="">{bank.route_no}</div>
                                            </div>}
                                            {bank.swift && <div className="text-base font-light gap-2 flex items-center">
                                                <div className="">Swift No:</div>
                                                <div className="">{bank.route_no}</div>
                                            </div>}
                                            {bank.iban && <div className="text-base font-light gap-2 flex items-center">
                                                <div className="">IBAN No:</div>
                                                <div className="">{bank.route_no}</div>
                                            </div>}
                                        </div>
                                    ))}
                                </div>
                                <div className="my-3 flex items-center gap-3">
                                    <div className="">Amount Transfered:</div>
                                    <div className="w-2/4 ">
                                        <FormComponent name={`amount`} value={proofForm.amount} onchange={handleAmountChange} formtype='text' />
                                    </div>
                                </div>
                                <div className="mt-3 relative w-fit mx-auto">
                                    <label className={`${proofimg.img ? '' : 'border-2 border-black'} mt-5 w-full  h-full border-dashed flex cursor-pointer items-center justify-center `}>
                                        {proofimg.img ? <div className="">
                                            <div onChange={changeImage} className="absolute top-0 right-0 main font-bold ">
                                                <FaEdit className='text-2xl' />
                                            </div>
                                            <img src={proofimg.img} className='w-full h-48' />
                                        </div> :
                                            <div className="flex items-center gap-2 px-2">
                                                <FaPlus className='text-2xl' />
                                                <div className="">Upload proof of payment</div>
                                            </div>

                                        }
                                        <input type="file" onChange={handleImage} hidden ref={imgRef} />
                                    </label>
                                </div>
                                {proofimg.img &&
                                    <div className="w-full mt-5">
                                        <Formbutton label={load ? '...Submitting' : 'Submit'} loading={load && true} />
                                    </div>

                                }
                            </form>
                        </div>

                    </div>
                </ModalLayout>
            }

           
            <div className="w-full flex items-center justify-between">
                <div className="text-zinc-400">Overview</div>
                <div onClick={() => setCreateSave(true)} className=" mb-3 cursor-pointer  bg-col text-white px-3 py-2 rounded-md">+ Add New Savings</div>
            </div>
            <div className="flex flex-col w-fit mx-auto shadow-md md:mt-5 items-start bg-white text-sec justify-center h-fit py-5 mb-10 mt-5 gap-10 ">
                <div className="md:w-3/4 w-full mx-auto h-full py-2 flex items-center justify-center flex-col px-3 rounded-lg  cursor-pointer">
                    <div className="text-lg font-semibold text-center lg:mb-3">Four (4) important steps to take in order to complete your deposit</div>
                    {steps.map((ele, i) => (
                        <ul className='w-full  flex items-center  gap-2 py-2 ' key={i}>
                            <li className='text-2xl'>{ele.img}</li>
                            <li className='list-disc'>{ele.step}</li>

                        </ul>
                    ))}
                </div>
                <div onClick={() => setSupport(true)} className="w-fit cursor-pointer self-center  px-5 py-2 rounded-lg bg-col text-white ">Deposit</div>
            </div>
            <div className="mt-5 text-xl font-semibold">Savings History</div>
            <div className="my-5">
                <SaveHistory />
            </div>
        </div>
    )
}

export default Savings