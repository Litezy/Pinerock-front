import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import { Apis, GetApi } from '@/services/Api'
import { errorMessage } from './functions'
import image from "@/assets/download.png"

const ActiveComponent = () => {


    // const profile = useSelector((state) => state.profile.profile)
    // const actives = useSelector((state) => state.profile.active_chats)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [actives, setActives] = useState([])
    const TableHeaders = [
        "Ticket ID",
        "Ticket Subject",
        "Ticket Status",
        "Date Created",
        "Messages"
    ]

    const fetchActiveTickets = useCallback(async () => {
        try {
            const res = await GetApi(Apis.auth.active_tickets)
            if (res.status !== 200) return errorMessage(res.msg)
            setActives(res.data)
        } catch (error) {
            errorMessage(`something went wrong in fetching active tickets data`, error.message)
        }
    }, [])

    useEffect(() => {
        fetchActiveTickets()
    }, [])


    return (
        <div className='w-11/12 flex items-center justify-center mx-auto h-fit py-5'>
            <div className=" w-full bg-white rounded-md shadow-md h-fit p-5">
                <div className=" text-xl font-bold">Active Tickets</div>
                <hr className='my-2' />
                <div className="my-5">You have {actives && actives.length > 0 ? `${actives.length} active ticket(s), see them below.` : '0 active tickets.'}</div>
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
                            {actives.length > 0 ? actives.map((item, i) => (
                                <tr className="bg-white border-b last:border-none " key={i}>
                                    <td className="px-3 py-3">
                                        {item.id}
                                    </td>
                                    <td className="px-3 py-3 truncate w-fit">
                                        {item.subject}
                                    </td>
                                    <td className="px-3 py-3">
                                        {item.status}
                                    </td>
                                    <td className="px-3  py-3 truncate">
                                        {moment(item.createdAt).format('DD-MM-YYYY hh:mm A')}
                                    </td>
                                    <td className="px-3  py-3 truncate">
                                        <Link to={`/user/tickets/status/active_chats/${item.id}`}
                                            className='trucate w-fit px-3 py-1 rounded-md bg-gradient-to-tr from-primary to-sec text-white'>open message</Link>
                                    </td>
                                </tr>
                            )) :
                                    <tr className='border'>
                                        <td colSpan={5}>
                                            <div className="flex w-full flex-col items-center justify-center py-10">
                                                <img src={image} alt="trans image" className="mb-4" />
                                                <div>No active tickets yet!</div>
                                            </div>
                                        </td>
                                    </tr>
                            }

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )


}

export default ActiveComponent