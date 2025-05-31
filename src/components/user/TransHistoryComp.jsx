import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import image from "@/assets/download.png"

const TransHistoryComp = ({ filteredData }) => {
    const currency = useSelector((state) => state.profile?.currency)

    console.log(filteredData)
    return (
        <div className='w-full'>
            <div class={`relative overflow-x-auto ${filteredData.length > 0 && 'shadow-md'}  sm:rounded-lg`}>

                <table class="w-full text-sm text-left rtl:text-right ">
                    <thead class="text-xs text-white uppercase bg-col">
                        <tr>
                            <th scope="col" class="px-4 py-3">
                                Type
                            </th>
                            <th scope="col" class="px-4 py-3">
                                Amount
                            </th>
                            <th scope="col" class="px-4 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-4 py-3">
                                Content
                            </th>
                            <th scope="col" class="px-4 py-3">
                                Date
                            </th>
                        </tr>
                    </thead>

                    {filteredData.length > 0 ?
                        <>
                            <tbody>{filteredData.map((item, i) => (
                                <tr key={i} class="odd:bg-white text-sec even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" class="px-4 py-3 font-medium  whitespace-nowrap dark:text-white">
                                        {item?.type}
                                    </th>
                                    <td class={` truncate px-4 py-3 text-center`}>
                                       {currency}{item?.amount.toLocaleString()}
                                    </td>
                                    <td class={`px-4 py-3 ${item?.status === 'success' ? 'text-green-500' : item?.status === 'pending' ? 'text-yellow-500' : 'text-red-600'}`}>
                                        {item.status}
                                    </td>
                                    <td class={`px-4 py-3 truncate lg:whitespace-normal`}>
                                        {item?.message}
                                    </td>
                                    <td class="px-4 py-3 truncate">
                                        {moment(item?.createdAt).format(`DD-MM-yyyy hh:mm a`)}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </> :
                        <tbody>
                            <tr>
                                <td colSpan={5}>
                                    <div className="flex flex-col items-center justify-center py-10">
                                        <img src={image} alt="trans image" className="mb-4" />
                                        <div>No transactions yet!</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div >

        </div >
    )
}

export default TransHistoryComp