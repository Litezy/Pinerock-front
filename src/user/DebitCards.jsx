import React, { useCallback, useEffect, useState } from 'react'
import visademo from "@/assets/visa.png"
import downloaddemo from "@/assets/download.png"
import ButtonComponent from '@/utils/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import ModalLayout from '@/utils/ModalLayout'
import Loader from '@/utils/Loader'
import { Apis, PostApi, GetApi } from '@/services/Api'
import { errorMessage, successMessage } from '@/utils/functions'
import { Link } from 'react-router-dom'
import CreditCard from './CreditCard'
import OtpForm from '@/utils/OtpForm'

const DebitCards = () => {
    const [add, setAdd] = useState(false)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const currency = useSelector((state) => state.profile.currency)
    const [data, setData] = useState({})
    const [created, setCreated] = useState('')
    const [activate, setActivate] = useState(false)
    const [pins, setPins] = React.useState(['', '', '', '']);
    const [confirmpins, setConfirmPins] = React.useState(['', '', '', '']);
    const setupOne = (val) => {
        setPins(val)
    }
    const setupTwo = (val) => {
        setConfirmPins(val)
    }

    const fetchUserCard = useCallback(
        async () => {
            try {
                const res = await GetApi(Apis.auth.retrieve_debit_card)
                if (res.status === 200) {
                    const data = res.data
                    setCreated(res.created.debit_card)
                    setData(data)
                }
            } catch (error) {
                console.log(error)
            }
        }, []
    )

    useEffect(() => {
        fetchUserCard()
    }, [fetchUserCard])

    const requestCard = async () => {
        setAdd(false)
        setLoading(true)
        try {
            const res = await PostApi(Apis.auth.request_card)
            if (res.status !== 201) return errorMessage(res.msg)
            await new Promise((resolve) => setTimeout(resolve, 2000))
            successMessage(res.msg)
            fetchUserCard()
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }


    const submitPin = async () => {
        if (pins.join('').length < 4) return errorMessage("Please input 4 digit pin")
        if (confirmpins.join('').length < 4) return errorMessage("Please confirm your 4 digit pin")
        if (pins.join('') !== confirmpins.join('')) return errorMessage("Pins mismatch")
        const formdata = {
            pin: parseInt(pins.join('')),
            card_id: data?.id
        }
        setActivate(false)
        setLoading(true)
        try {
            const res = await PostApi(Apis.auth.setpin, formdata)
            console.log(res)
            if (res.status !== 201) return errorMessage(res.msg)
            setPins(['', '', '', '']);
            setConfirmPins(['', '', '', '']);
            fetchUserCard()
            await new Promise((resolve) => setTimeout(resolve, 2000))
            successMessage(res.msg)
            dispatch()

        } catch (error) {
            console.log(`error in creating pin`, error.message)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className='w-11/12 mx-auto'>

            {activate &&
                <ModalLayout clas={`w-11/12 mx-auto lg:w-1/3 ${loading && 'h-96 '}`} setModal={setActivate}>
                    <div className="w-full p-5 flex flex-col items-center rounded-md gap-3 bg-white">
                        <div className="flex items-start  flex-col gap-1">
                            <div className="">Enter 4 digit pin</div>
                            <OtpForm
                                pins={pins}
                                setPins={setPins}
                                setup={setupOne}
                            />
                        </div>
                        <div className="flex items-start  flex-col gap-1">
                            <div className="">Re-Enter pin</div>
                            <OtpForm
                                pins={confirmpins}
                                setPins={setConfirmPins}
                                setup={setupTwo}
                            />
                        </div>
                        <button
                            onClick={submitPin}
                            className='w-full py-2 mt-4 px-5 rounded-md text-white bg-col'>Submit</button>

                    </div>
                </ModalLayout>
            }

            {(add || loading) &&
                <ModalLayout clas={`w-11/12 mx-auto lg:w-1/3 ${loading && 'h-96 '}`} setModal={setAdd}>
                    {add &&
                        <div className="w-full p-5 flex flex-col items-center rounded-md gap-10 bg-white">
                            <div className="">Confirm Card Request</div>
                            <div className="flex items-center justify-between w-full gap-5">
                                <button onClick={() => setAdd(false)} className='w-fit text-white px-4 py-1.5 rounded-md bg-red-600'>cancel</button>
                                <button
                                    onClick={requestCard}
                                    className='w-fit text-white px-4 py-1.5 rounded-md bg-green-500'>proceed</button>
                            </div>
                        </div>}
                    {loading &&
                        <div className="h-full flex flex-col  items-center justify-center">
                            <Loader />
                            <div className="text-white">processing ...</div>
                        </div>
                    }
                </ModalLayout>
            }
            <div className="font-bold text-lg lg:text-xl mb-10">Debit Cards</div>
            <div className="flex items-center flex-col  justify-center gap-5 lg:gap-10">
                {created !== 'created' && <img src={visademo} alt="visa" />}
                {created === 'pending' ?
                    <>
                        <div className="font-bold ">Card request processing, expect an email when it's ready!</div>
                        <Link to={`/user/settings`} className='w-fit px-3 py-1.5 rounded-md bg-col text-white'>back</Link>
                    </> : data === null && created === 'nil' ?
                        <>
                            <div className="">
                                <img src={downloaddemo} alt="image" />
                                <div className="mb-2">No card added yet!</div>

                                <div className="w-fit ">
                                    <ButtonComponent
                                        onclick={() => setAdd(true)}
                                        title="Request Debit Card"
                                        bg={`text-white bg-sec px-3 from-primary text-sm to-sec h-10`} />
                                </div>
                            </div>
                            <div className="mb-2">NB: requesting for a debit card requires you to have at least {currency}100 in your balance</div>
                        </> : data !== null && data.activated !== "true" ?

                            <>
                                <CreditCard
                                    cardNumber={data.card_no}
                                    cardholderName={data.holder}
                                    cardType={data.type}
                                    cvv={data.cvv}
                                    expiryDate={data.exp}
                                    status={data.activated}
                                />
                                <button
                                    onClick={() => setActivate(true)}
                                    className='w-fit px-4 py-1.5 rounded-md bg-primary text-white'>Activate My Card</button>
                                <div className="mb-2">NB: Activating your card requires you to at least <span className='text-primary font-bold'>{currency}100</span> in your balance</div>

                            </> :
                            <>
                                <CreditCard
                                    cardNumber={data.card_no}
                                    cardholderName={data.holder}
                                    cardType={data.type}
                                    cvv={data.cvv}
                                    expiryDate={data.exp}
                                    status={data.activated}
                                />
                                <div className="mb-2">Your Card is Active!</div>
                            </>
                }
            </div>
        </div>
    )
}

export default DebitCards