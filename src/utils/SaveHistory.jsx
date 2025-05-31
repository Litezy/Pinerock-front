import React, { useCallback, useEffect, useState } from 'react'
import { Apis, GetApi } from '@/services/Api'
import { errorMessage, successMessage } from './functions'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import Loader from './Loader'
import ModalLayout from './ModalLayout'
import { Progress } from 'antd'
import { FaArrowLeft } from 'react-icons/fa'
import ButtonComponent from './ButtonComponent'
import FormComponent from './FormComponent'
import { PostApi } from '@/services/Api'
import { dispatchProfile } from '@/app/reducer'

const SaveHistory = () => {
    const dispatch = useDispatch()
    const [savings, setSavings] = useState([])
    const profile = useSelector((state) => state.profile.profile)
    const currency = useSelector((state) => state.profile.currency)
    const [loading, setLoading] = useState(false)
    const TableHeaders = [
        "Savings Name",
        "Savings Target",
        "Amount Saved",
        "Status",
        "Date Created",
        "More"

    ]


    const fetchSavings = useCallback(async () => {
        setLoading(true)
        try {
            const res = await GetApi(Apis.auth.save_history)
            if (res.status !== 200) return;
            setSavings(res.data)
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchSavings()
    }, [])

    const fetchUserSavings = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.user_savings)
            if (response.status !== 200) return;
            setSavings(response.data)
            console.log(response.data)
        } catch (error) {
            errorMessage(error.message)
        }
    }, [])
    const newCurr = useSelector((state) => state.profile.newCurr)
    const [selectedItem, setSelectedItem] = useState({})
    const [closeview, setCloseView] = useState(false)
    const [load2, setLoad2] = useState(false)
    const [topup, setTopup] = useState(false)
    const [confirm, setConfirm] = useState(false)



    const goalReached = selectedItem.goal === selectedItem.current
    const [forms, setForms] = useState({
        id: selectedItem.id,
        amount: ''
    })


    const topUpSavings = async (e) => {
        e.preventDefault();
        if (!forms.amount || forms.amount <= 0) return errorMessage(`Amount must be greater than zero`);

        const currentAmt = parseFloat(selectedItem?.current);
        const goalAmt = parseFloat(selectedItem?.goal);
        const topUpAmt = parseFloat(forms.amount);

        const combined = currentAmt + topUpAmt;
        if (combined > goalAmt) return errorMessage(`Amount exceeds savings goal`);

        const formdata = {
            id: selectedItem.id,
            amount: topUpAmt,
        };

        setLoad2(true);
        setTopup(false);
        try {
            const response = await PostApi(Apis.auth.topup, formdata);
            if (response.status === 200) {
                successMessage(response.msg);
                setCloseView(false);
                setForms({ ...forms, id: '', amount: '' });
                fetchUserSavings();
                dispatch(dispatchProfile(response.user));
            }
        } catch (error) {
            console.log(error);
            errorMessage(error.message);
        } finally {
            setLoad2(false);
        }
    };



    useEffect(() => {
        if (!closeview) {
            setConfirm(false)
        }
    }, [closeview, setCloseView])


    const deletsavings = async (e) => {
        e.preventDefault()
        const formdata = {
            id: selectedItem.id
        }
        setConfirm(false)
        setLoad2(true)
        try {
            const response = await PostApi(Apis.auth.delete_savings, formdata)
            if (response.status === 200) {
                successMessage(response.msg)
                dispatch(dispatchProfile(response.user))
                setCloseView(false)
                setForms({ ...forms, id: '', amount: '' })
                fetchUserSavings()
            }
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoad2(false)
        }
    }

    const withdrawsavings = async (e) => {
        e.preventDefault()
        const formdata = {
            id: selectedItem.id
        }
        setConfirm(false)
        setLoad2(true)
        try {
            const response = await PostApi(Apis.auth.withdraw_savings, formdata)
            if (response.status !== 200) return;
            successMessage(response.msg)
            dispatch(dispatchProfile(response.user))
            setCloseView(false)
            setForms({ ...forms, id: '', amount: '' })
            fetchUserSavings()
        } catch (error) {
            errorMessage(error.message)
        } finally {
            setLoad2(false)
        }
    }


    const checkTopup = () => {
        if (selectedItem.goal === selectedItem.current) return successMessage(`Savings goal reached already`)
        setTopup(prev => !prev)
    }

    const ViewDetails = (val) => {
        setSelectedItem(val)
        setCloseView(true)
    }


    return (
        <div className='w-full'>


            {closeview &&
                <ModalLayout setModal={setCloseView} clas={`lg:w-[60%] w-11/12 mx-auto`}>
                    <div className="w-full bg-white h-fit p-10 rounded-lg relative ">


                        {load2 &&
                            <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2">
                                <Loader />
                            </div>
                        }


                        {confirm &&
                            <div className="absolute top-1/4 left-1/2 bg-black/70 text-white p-10 h-fit w-2/4 rounded-md -translate-x-1/2">
                                <div className="text-center text-lg">{goalReached ? 'Confirm Withdrawal' : 'Are you sure you want to terminate?'}</div>
                                <div className="mt-5 flex items-center justify-between w-full">
                                    <button onClick={() => setConfirm(false)} className='w-fit px-4 py-1 rounded-md bg-red-500'>cancel</button>
                                    <button disabled={load2 ? true : false} onClick={goalReached ? withdrawsavings : deletsavings} className='w-fit px-4 py-1 rounded-md bg-green-500'>proceed</button>
                                </div>
                            </div>

                        }
                        <div className="grid grid-cols-1 ">
                            <div className="flex gap-2 justify-center items-center">
                                <Progress
                                    type="dashboard"
                                    steps={6}
                                    percent={Math.min(100, Math.round((selectedItem.current / selectedItem.goal) * 100))}
                                    strokeColor="#f97316"
                                    trailColor="rgba(0, 0, 0, 0.06)"
                                    strokeWidth={20}
                                    className="text-sm"
                                />

                                <div className=" bg-white p-3 rounded-xl w-full text-sm">
                                    {/* <div className="border border-zinc-300 bg-white p-3 rounded-xl w-full text-sm"> */}
                                    <div className="border-b py-1 text-zinc-500 text-right">Savings name: <span className='text-xl font-bold text-primary capitalize'>{selectedItem.name}</span></div>
                                    <div className="border-b py-1">
                                        <div className=" text-right">Savings Goal</div>
                                        <div className="font-bold text-right text-primary">{profile?.currency === '?' ? newCurr : currency}{selectedItem.goal?.toLocaleString()}</div>
                                    </div>
                                    <div className="border-b py-1">
                                        <div className=" text-right">Currently Saved</div>
                                        <div className="font-bold text-right text-primary">{profile?.currency === '?' ? newCurr : currency}{selectedItem.current?.toLocaleString()}</div>
                                    </div>
                                    <div className="border-b py-1">
                                        <div className=" text-right">Last Saved</div>
                                        <div className="font-bold text-right text-primary">{selectedItem.lastsaved} </div>
                                    </div>
                                    <div onClick={() => setCloseView(false)} className="py-1 flex justify-end cursor-pointer">
                                        <div className='flex text-blue-600 items-center justify-end gap-2'>Close <FaArrowLeft /> </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={topUpSavings} className="mt-5 w-full flex flex-col md:flex-row items-center gap-4 justify-between">
                            {selectedItem?.status !== 'terminated'&&<button type='button' onClick={checkTopup} className='font-bold w-fit px-4 py-2 underline text-primary'>{topup ? 'Close' : 'TopUp Savings'}</button>}
                            {topup && <div className="flex items-center flex-col gap-1">
                                <div className="flex flex-col items-start">
                                    <div className="">Available Balance <span>{profile?.currency === '?' ? newCurr : currency}{profile?.balance?.toLocaleString()}</span></div>
                                    <FormComponent name={`amount`} value={forms.amount} onchange={(e) => setForms({ ...forms, [e.target.name]: e.target.value })} formtype='phone' />
                                </div>
                                <ButtonComponent disabled={load2 ? true : false} title={`Top Up`} bg={`bg-col  mt-2 text-white text-white h-10`} />
                            </div>}
                        </form>
                        {!topup && selectedItem?.status !== 'terminated'&&<div className="mt-3 w-11/12 mx-auto">
                            <ButtonComponent
                                onclick={() => { setConfirm(true) }}
                                type='button'
                                title={`${goalReached ? 'Withdraw Savings' : 'Terminate Savings'}`}
                                bg={`${goalReached ? 'bg-green-600' : 'bg-red-600'}   text-white h-10`} />
                            <div className="">* Once terminated, the amount saved will be transferred back to your balance.</div>
                        </div>}
                    </div>
                </ModalLayout>
            }
            <div className="relative overflow-x-auto rounded-md ">
                <table className="w-full text-sm text-left rtl:text-right relative">
                    <thead className=" bg-col text-xl text-white">
                        <tr>
                            {TableHeaders.map((item, index) => (
                                <th scope="col" key={index} className="px-3 py-3 text-sm truncate">
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {savings.length > 0 ? savings.map((item, i) => (
                            <tr className="bg-white border-b " key={i}>
                                <td className="px-3 py-3 truncate">
                                    {item.name}
                                </td>
                                <td className="px-3 py-3">
                                    {profile?.currency === '?' ? newCurr : profile?.currency}{item.goal.toLocaleString()}
                                </td>
                                <td className="px-3 py-3">
                                    {profile?.currency === '?' ? newCurr : profile?.currency}{item.current.toLocaleString()}
                                </td>
                                <td className={`px-3 py-3 text-white `}>
                                    <p className={`rounded-md py-1 px-3 text-center ${item.status === 'complete' ? 'bg-green-600' : item.status === 'inprogress' ? "bg-yellow-400" : 'bg-red-600'}`}>
                                        {item.status}
                                    </p>

                                </td>
                                <td className="px-3  py-3 truncate">
                                    {moment(item.createdAt).format('DD-MM-YYYY')}
                                </td>
                                <td className="px-3 py-3 truncate">
                                    <button
                                        onClick={() => ViewDetails(item)}
                                        className={`${item.current < item.goal ? 'px-3 py-1 rounded-md bg-col text-white' : "text-sec"}`}
                                        disabled={item.current >= item.goal}
                                    >{item.current < item.goal ? 'Explore' : "Completed"}</button>
                                </td>

                            </tr>
                        )) :
                            <tr className=" w-full text-lg font-semibold flex items-center justify-center">
                                <td>No savings history found</td>
                            </tr>
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default SaveHistory