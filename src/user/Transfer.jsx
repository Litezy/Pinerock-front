import React, { useState } from 'react'
import { GoShieldLock } from 'react-icons/go'
import { IoEyeOutline, IoEyeOffSharp } from 'react-icons/io5'
import { FaAsterisk } from "react-icons/fa6";
import BankWithdrawal from '@/utils/BankWithdrawal';
import CardWithdrawal from '@/utils/CardWithdrawal';
import { useSelector } from 'react-redux';
import BalanceView from '@/components/user/BalanceView';

const Transfer = () => {
  const [bal, setBal] = useState(true)
  const [active, setActive] = useState(1)
  const Icon = bal ? IoEyeOffSharp : IoEyeOutline
  const profile = useSelector((state) => state.profile.profile)
  const currency = useSelector((state) => state.profile.currency)

  const newCurr = useSelector((state) => state.profile.newCurr)

  return (
    <div className='w-full mt-5'>
      <div className="w-11/12 mx-auto ">
        <BalanceView />

        <div className="w-11/12 mx-auto flex items-center  my-5 justify-center  gap-10">
          <div className="lg:w-1/2 w-full px-5 flex items-center ">
            <div onClick={() => setActive(1)} className={`${active === 1 ? 'border-b-col border-b text-col ' : ' bg-white '}  cursor-pointer w-1/2 text-center py-2 transition-all delay-50 duration-50`}>Bank Withdrawal</div>
          <div onClick={() => setActive(2)} className={`${active === 2 ? 'border-b-col border-b text-col ' : 'bg-white '}  transition-all delay-50 duration-50 text-center cursor-pointer w-1/2 py-2 truncate `}>Card Withdrawal</div>
          </div>
        </div>

        <div className="w-full">
          {active === 1 && <BankWithdrawal />}
          {active === 2 && <CardWithdrawal />}
        </div>


      </div>
    </div>
  )
}

export default Transfer