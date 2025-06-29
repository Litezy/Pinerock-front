import React, { useState } from 'react'
import { BiMoneyWithdraw } from 'react-icons/bi';
import { CiSaveDown1 } from 'react-icons/ci';
import { IoCopyOutline, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
import { successMessage } from '@/utils/functions';

const BalanceView = () => {

    const [show, setShow] = useState(true)
    const profile = useSelector((state) => state.profile.profile)
    const currency = useSelector((state) => state.profile.currency)


    const copyToClip = (e) => {
        e.stopPropagation()
        navigator.clipboard.writeText(profile?.account_number)
        successMessage('Account number copied to clipboard')
    }

    const reroute = (path) => {
        if (path === 'depo') {
            dispatch(dispatchNewPath('deposit funds'));
        } else {
            dispatch(dispatchNewPath('withdrawals'));
        }
    };
    const Icon = show ? IoEyeOutline : IoEyeOffOutline;
    // console.log(profile)
    return (
        <div className='w-full'>
            <div className="bg-col2 w-full rounded-md p-10 lg:h-72 flex flex-col lg:flex-row gap-10 lg:gap-0 items-center justify-between">
                <div className="w-full lg:w-1/2 flex items-start flex-col gap-1">
                    <div className="font-bold text-2xl lg:text-3xl">Account Balance</div>
                    <div className="flex items-center gap-5">
                        <div className="font-bold text-2xl lg:text-4xl">{show ? `${currency}${profile?.balance.toLocaleString()}` : '******'}</div>
                        <Icon className='text-2xl cursor-pointer' onClick={() => setShow(!show)} />
                    </div>

                    <div className="flex lg:items-center flex-col w-full lg:flex-row justify-between  gap-4 mt-5">
                        <Link to={`/user/deposits`} onClick={() => reroute('depo')} className="flex w-full items-center justify-center gap-2  py-2.5 rounded-md bg-col text-white">
                            <CiSaveDown1 className='text-2xl' />
                            <div>Save</div>
                        </Link>
                        <Link onClick={() => reroute('withdraw')} to={`/user/withdrawals`} className="w-full flex items-center justify-center gap-2 bg-[#fbf1df]  py-2.5 rounded-md">
                            <BiMoneyWithdraw className='text-2xl text-col' />
                            <div>Withdraw Funds</div>
                        </Link>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col gap-2 lg:flex-row lg:items-center justify-between lg:px-5">
                    <div className="flex items-start flex-col">
                        <div>Account Name</div>
                        <div className="font-bold text-2xl">{profile?.firstname} {profile?.lastname}</div>
                    </div>
                    <div className="flex items-start flex-col">
                        <div>Account Number</div>
                        <div className="flex items-center gap-2">
                            <div className="font-bold text-2xl">{profile?.account_number}</div>
                            <IoCopyOutline onClick={copyToClip} className='text-2xl text-col cursor-pointer' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BalanceView