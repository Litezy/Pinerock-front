import React, { useCallback, useEffect, useRef, useState } from 'react'
import { GetApi, Apis, PostApi } from '@/services/Api'
import ModalLayout from '@/utils/ModalLayout'
import { errorMessage,successMessage } from '@/utils/functions'
import Loader from '@/utils/Loader'
import FormComponent from '@/utils/FormComponent'


const AdminDebitCards = () => {

    const [create, setCreate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const refdiv = useRef(null)

    const fetchUserCards = useCallback(async () => {
        try {
            const res = await GetApi(Apis.admin.get_debit_cards)
            const data = res.data
            if (typeof (data) === String) return setData([]);
            else {
                setData(data)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])
    useEffect(() => {
        fetchUserCards()
    }, [])

    const [cards, setCards] = useState({
        type: "", card_no: "", cvv: '', exp: "",
    })


    const [selected, setSelected] = useState({})

    const handleCardNumberChange = (event) => {
        let value = event.target.value.replace(/\D/g, '');
        value = value.substring(0, 16);
        const formattedValue = value.match(/.{1,4}/g)?.join('-') || value; // Insert hyphens every 4 digits
        setCards({
            ...cards,
            card_no: formattedValue
        });
    };

    const handleCvv = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 3)
        setCards({
            ...cards,
            cvv: value
        })
    }

    const handleChange = (e) => {
        setCards({
            ...cards,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() => {
        if (refdiv) {
            window.addEventListener('click', e => {
                if (refdiv.current !== null && !refdiv.current.contains(e.target)) {
                    setAdd(false)
                }
            }, true)
        }
    }, [])



    const handleCardDate = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 4)
        const formattedValue = value.match(/.{1,2}/g)?.join('/') || value;
        setCards({
            ...cards,
            exp: formattedValue
        })
    }

    const CreateCard = async () => {
        if (!cards.type) return errorMessage('Card type is required')
        if (!cards.card_no) return errorMessage('Card number is required')
        if (!cards.cvv) return errorMessage('Card cvv is required')
        if (!cards.exp) return errorMessage('Card expiry date is required')
        const formdata = {
            id: selected?.id,
            type: cards.type,
            card_no: cards.card_no,
            cvv: cards.cvv,
            exp: cards.exp,
            holder: `${selected?.firstname} ${selected?.lastname}`
        }
        setCreate(false)
        setLoading(true)
        try {
            const res = await PostApi(Apis.admin.create_debit_cards,formdata)
            if (res.status !== 201) return errorMessage(res.msg)
            successMessage(res.msg)
            fetchUserCards()
            await new Promise((resolve, _) => setTimeout(resolve, 1000))
        } catch (error) {
            console.log(`failed to create debit card`, error)
        } finally {
            setLoading(false)
        }
    }


    const selectUser = (val) => {
        setSelected(val)
        setCreate(true)
    }

    return (
        <div className='w-full'>
            {(create || loading) &&
                <>
                    <ModalLayout setModal={setCreate} clas={`lg:w-[60%] ${loading && 'h-96 '} w-11/12 mx-auto`}>
                        {create && <div ref={refdiv} className={`w-full relative mx-auto rounded-lg bg-white  py-6 px-5 `}>

                            <div className="text-xl font-semibold text-balance">Enter Card Details</div>
                            <div className="my-5 flex flex-col items-start gap-5">
                                <div className="w-full flex items-center justify-between gap-5 lg:flex-row lg:gap-10 flex-col">
                                    <div className="flex items-start flex-col justify-between w-full">
                                        <div className="text-lg ">Card type:</div>
                                        <div className="w-full ">
                                            <div className="w-full">
                                                <FormComponent formtype={'text'} name={`type`} value={cards.type.toUpperCase()} onchange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start flex-col justify-between w-full">
                                        <div className="text-lg ">Card No:</div>
                                        <div className="w-full">
                                            <FormComponent formtype={'text'} value={cards.card_no} onchange={handleCardNumberChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-between gap-5 lg:flex-row lg:gap-10 flex-col">
                                    <div className="flex items-start flex-col justify-between w-full">
                                        <div className="text-lg ">Card Holder's Name:</div>
                                        <div className="w-full">
                                            <FormComponent readOnly={true} formtype={'text'} value={`${selected?.firstname} ${selected?.lastname}`} />
                                        </div>
                                    </div>
                                    <div className="flex items-start flex-col justify-between w-full">
                                        <div className="text-lg ">Card CVV:</div>

                                        <div className="w-full">
                                            <FormComponent formtype={'cvv'} name={`cvv`} value={cards.cvv} onchange={handleCvv} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start flex-col justify-between w-full">
                                    <div className="text-lg ">Card Exp:</div>
                                    <div className="w-1/2">
                                        <FormComponent formtype={'text'} name={`exp`} value={cards.exp} onchange={handleCardDate} />
                                    </div>
                                </div>

                            </div>
                            <button disabled={loading ? true : false} onClick={CreateCard} className=' h-12 w-full bg-col  text-white rounded-lg'>Create</button>
                        </div>}
                        {loading &&
                            <div className="h-full flex flex-col  items-center justify-center">
                                <Loader />
                                <div className="">processing ...</div>
                            </div>
                        }
                    </ModalLayout>
                </>
            }

            <div className="w-11/12 mx-auto py-5">
                <div className="text-center w-full font-bold text-lg lg:text-xl">User's who have requested debit cards</div>
                <div className="relative overflow-x-auto rounded-md mt-10">
                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className=" bg-gradient-to-tr from-primary to-sec  text-base text-white">
                            <tr>
                                <th scope="col" className="px-3 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    User
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    More
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map((item, i) => (
                                <tr className="bg-white border-b " key={i}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {item.id}
                                    </th>
                                    <td className="px-3 py-3 capitalize">
                                        {item?.firstname} {item?.lastname}
                                    </td>
                                    <td className="px-3 py-3">
                                        {item?.email}
                                    </td>
                                    <td className="px-3 truncate py-3">
                                        <button
                                            onClick={() => selectUser(item)}
                                            className='w-fit px-4 py-1.5 rounded-md bg-col text-white'>explore</button>
                                    </td>

                                </tr>
                            )) :
                                <tr className=" w-full text-lg font-semibold flex items-center justify-center">
                                    <td>No records found</td>
                                </tr>
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminDebitCards