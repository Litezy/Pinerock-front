import React from 'react'
import image from '@/assets/download.png'
import { IoIosMailUnread } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { FaCopy, FaMinus } from 'react-icons/fa'
import { successMessage } from '@/utils/functions'

const TransComp = ({ records }) => {

    const profile = useSelector((state) => state.profile.profile)
    const newCurr = useSelector((state) => state.profile.newCurr)
    const terminated = 'Goal Savings Terminated'
    const currency = useSelector((state) => state.profile.currency)
    const [selectedItem, setSelectedItem] = React.useState({})
    const copyToClip = (e) => {
        e.stopPropagation()
        navigator.clipboard.writeText(selectedItem?.transaction_id)
        successMessage('Transaction ID copied to clipboard')
    }


  

    return (
        <div className=" w-full ">
            {records.length > 0 ? records.map((item, index) => (
                <div className="rounded-xl mb-3 bg-[#fdf8ef] shadow-md border" key={index}>
                    <div className="flex flex-col">
                        <div className="p-3 border-b last:border-none cursor-pointer">
                            <div className="grid grid-cols-2">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full p-1 bg-sec text-blue-50">
                                        <div className="bg-whiterounded-full p-1">
                                            <IoIosMailUnread className='text-xl' />
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold">{item.type}</div>
                                    <FaMinus className='text-slate-500 hidden lg:block' />
                                    <div className={`text-xs font-semibold hidden lg:block ${item.status === 'success' ? 'text-green-600' : item.status === 'pending' ? 'text-yellow-500' : 'text-red-600'}`}>{item.status}</div>
                                </div>
                                <div className="">
                                    <div className={`text-base font-bold text-right 
                           ${item.type === 'Deposit' && item.status === 'pending' ? 'text-yellow-500' :
                                            item.type === 'Deposit' && item.status === 'success' ? 'text-green-600' :
                                                item.type === terminated && item.status === 'success' ? 'text-green-600' : "text-red-600"
                                        }`}>
                                        {item.type === 'Deposit' && item.status === 'success' ? '+' :
                                            item.type === 'Deposit' && item.status === 'pending' ? '' :
                                                item.type === terminated && item.status === 'success' || item.status ==='complete' ? '+' : '-'}{profile?.currency === '?' ? newCurr : currency}{item.amount}
                                    </div>
                                    <div className="text-xs text-right">{item.date}</div>
                                </div>
                            </div>
                            <div className="text-sm text-sec">{item.message}</div>
                            <div className="flex items-center gap-3 text-sm mt-2 text-slate-500">
                                <div>Transaction ID:</div>
                                <div>{item.transaction_id}</div>
                                <div onClick={copyToClip} onMouseOver={() => setSelectedItem(item)}>
                                    <FaCopy className='text-sec text-lg' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )) :
                <>
                    <div className="w-full flex items-center justify-center flex-col">
                        <img src={image} className='w-auto' alt="" />
                        <div className="text-center w-full">No transactions data found</div>
                    </div>

                </>
            }
        </div>
    )
}

export default TransComp