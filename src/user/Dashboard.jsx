import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosMailUnread } from 'react-icons/io';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { errorMessage, successMessage } from '@/utils/functions';
import { GoShieldLock } from 'react-icons/go';
import { IoCopyOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import img1 from '@/assets/withdraw.png';
import img3 from '@/assets/img3.png';
import { Apis, GetApi } from '@/services/Api';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchProfile} from "@/app/reducer";
import TransComp from '@/components/user/TransComp';
import BalanceView from '@/components/user/BalanceView';

const DashboardOptions = [
    { img: img1, url: '/user/withdrawals', title: 'Withdraw' },
    { img: img3, url: '/user/deposits', title: 'Savings' },
];

export default function Dashboard() {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null);
    const currency = useSelector((state) => state.profile.currency);
    const [records, setRecords] = useState([]);
    const [viewMore, setViewMore] = useState(false);
    const [show, setShow] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);

    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const npage = Math.ceil(filteredData.length / recordsPerPage);

    const types = ['All', 'Approved', 'Pending', 'Failed'];
    const [selectedType, setSelectedType] = useState(types[0]);


    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < npage) setCurrentPage(currentPage + 1);
    };

    const fetchUserProfile = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.profile);
            if (response.status === 200) {
                setProfile(response.data);
                dispatch(dispatchProfile(response.data));
            } else {
                errorMessage(response.msg);
            }
        } catch (error) {
            errorMessage(error.message);
        }
    }, [dispatch]);

    const fetchTransHistory = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.trans_history);
            if (response.status === 200) {
                setRecords(response.data);
                setFilteredData(response.data);
            } else {
                console.log(response.msg);
            }
        } catch (error) {
            errorMessage(error.message);
        }
    }, []);

   

    

    // Filter based on status
    useEffect(() => {
        let maindata = records;
        if (selectedType === 'Approved') {
            maindata = records.filter(item => item.status.toLowerCase() === 'success');
        } else if (selectedType === 'Pending') {
            maindata = records.filter(item => item.status.toLowerCase() === 'pending');
        } else if (selectedType === 'Failed') {
            maindata = records.filter(item => item.status.toLowerCase() === 'failed');
        }
        setCurrentPage(1); // Reset page on filter change
        setFilteredData(maindata);
    }, [selectedType, records]);

    // Slice filtered data per page
    useEffect(() => {
        setFilteredRecords(filteredData.slice(firstIndex, lastIndex));
    }, [filteredData, currentPage]);

    useEffect(() => {
        fetchUserProfile();
        fetchTransHistory();
    }, [fetchUserProfile, fetchTransHistory]);

    return (
        <div className='w-full mt-5'>
            <div className="w-11/12 mx-auto flex items-start flex-col gap-5">
                <div>Hi, Welcome Back <span className='font-bold'>{profile?.firstname}</span>.</div>

                {/* Account Balance Card */}
               <BalanceView />

                {/* Filter Tabs */}
                <div className="flex items-center gap-2">
                    {types.map((type, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedType(type)}
                            className={`cursor-pointer px-4 py-2 ${selectedType === type ? 'border-b border-b-col text-col' : 'text-sec'}`}>
                            {type}
                        </div>
                    ))}
                </div>
                <hr className='w-full' />

                {/* Transaction Component */}
                <TransComp records={filteredRecords} sliced={true} />

                {/* Pagination Controls */}
                {filteredData.length > 0 && (
                    <div className="w-fit ml-auto mr-5 mt-10 mb-5">
                        <div className="w-full flex flex-col items-center">
                            <span className="text-sm text-gray-700">
                                Showing <span className="font-semibold text-black">{firstIndex + 1}</span> to
                                <span className="font-semibold text-black"> {Math.min(lastIndex, filteredData.length)}</span> of
                                <span className="font-semibold text-black"> {filteredData.length} </span>
                                Transactions
                            </span>
                            <div className="flex items-center gap-3 mt-2">
                                <button onClick={prevPage} disabled={currentPage === 1} className="px-4 h-10 text-base font-medium text-white bg-col rounded-md">
                                    Prev
                                </button>
                                <button onClick={nextPage} disabled={currentPage === npage} className="px-4 h-10 text-base font-medium text-white bg-col rounded-md">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
