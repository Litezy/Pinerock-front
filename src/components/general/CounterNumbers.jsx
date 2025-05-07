import React from 'react'
import Counter from '@/utils/Counter'

const CounterNumbers = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 w-11/12 mx-auto gap-5 font-bold">
            <div className="flex items-center flex-col gap-2">
                <div className="flex items-center">
                    <Counter end={46} duration={2000} /><span className="font-bold text-5xl  lg:text-6xl ">K</span>
                </div>
                <div className="">Total Users</div>
            </div>
            <div className="flex items-center flex-col gap-2">
                <div className="flex items-center">
                    <Counter end={32} duration={2000} /><span className="font-bold text-5xl  lg:text-6xl ">K</span>
                </div>
                <div className="">Active Users</div>
            </div>
            <div className="flex items-center flex-col gap-2">
                <div className="flex items-center">
                    <Counter end={350} duration={2000} /><span className="font-bold text-5xl  lg:text-6xl ">K</span>
                </div>
                <div className="">Daily Transactions</div>
            </div>
            <div className="flex items-center flex-col gap-2">
                <div className="flex items-center">
                    <Counter end={2.65} duration={2000} /><span className="font-bold text-5xl  lg:text-6xl ">M</span>
                </div>
                <div className="">Weekly Transactions</div>
            </div>
        </div>
    )
}

export default CounterNumbers