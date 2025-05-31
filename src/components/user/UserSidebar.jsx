import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Apis, GetApi, PostApi } from '@/services/Api'
import { CookieName, errorMessage, successMessage } from '@/utils/functions'
import ModalLayout from '@/utils/ModalLayout'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchNewCurr,  dispatchProfile } from '@/app/reducer'
import axios from 'axios'
import logo from '@/assets/logo.png'
import { BiMoneyWithdraw } from "react-icons/bi";
import { CiSaveDown1 } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { CiLink } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { FaTicket } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { dispatchNewPath } from '@/app/reducer'

const SideLinks = [
    { path: 'dashboard', url: '/user', icon: <RxDashboard className='font-bold text-2xl' />,main:"dashbaord" },
    { path: 'deposit / save funds', url: '/user/deposits', icon: <CiSaveDown1 className='font-bold text-2xl' />,main:'Depost funds' },
    { path: ' withdrawal', url: '/user/withdrawals', icon: <BiMoneyWithdraw className='font-bold text-2xl' />,main:'withdrawal' },
    { path: ' linked accounts', url: '/user/linked_accounts', icon: <CiLink className='font-bold text-2xl' />,
        main:'linked accounts'
     },
    { path: 'transactions', url: '/user/transactions', icon: <GrTransaction className='font-bold text-2xl' />,
        main:'transactions'
     },
    { path: 'notifications', url: '/user/notifications', icon: <IoNotificationsOutline className='font-bold text-2xl' />,main:'notifications' },
    { path: 'profile', url: '/user/profile', icon: <CiUser className='font-bold text-2xl' />,main:'profile' },
]

const TicketFolder = [
    {
        name: 'tickets',
        icon: <FaTicket className='font-bold text-2xl' />
    }
]
const ticketsArr = [
    { path: 'create tickets', url: 'create', icon: <BsFillTicketPerforatedFill className='font-bold text-2xl' />,main:'create tickets' },
    { path: 'active tickets', url: 'active', icon: <BsFillTicketPerforatedFill className='font-bold text-2xl' />,main:'active tickets' },
    { path: 'closed tickets', url: 'closed', icon: <BsFillTicketPerforatedFill className='font-bold text-2xl' />, main:'closed tickets' },
]

const SideLinks2 = [
    { path: 'settings', url: '/user/settings', icon: <IoSettingsOutline className='font-bold text-2xl' />, log: false,main:'settings' },
    { path: 'logout', url: '', icon: <CiLogout className='font-bold text-2xl text-red-500' />, log: true },
]

export default function UserSidebar({ setOpenSide, smallView = false}) {
    const location = useLocation()
    const dispatch = useDispatch()
    const [viewall, setViewAll] = useState(false)
    const [logout, setLogout] = useState(false)
    const [hide, setHide] = useState(false)
    const [isRotating, setIsRotating] = useState(false)
    const navigate = useNavigate()
    const logOut = (item) => {
        if (item.path === 'logout') {
            setLogout(true)
        } else if (smallView) {
            setViewAll(false)
            setOpenSide(false)
        }
        else {
            setViewAll(false)
            dispatch(dispatchNewPath(item.path))
        }
    }

    const LogoutUser = async () => {
        try {
            const response = await PostApi(Apis.auth.logout)
            // console.log(response)
            if (response.status === 200) {
                successMessage(response.msg)
                Cookies.remove(CookieName)
                navigate('/login')
            } else {
                errorMessage(response.msg)
            }
        } catch (error) {
            return errorMessage(error.message)
        }
    }


    const profile = useSelector((state) => state.profile.profile)

    const fetchUserProfile = useCallback(async () => {
        setIsRotating(true)
        try {
            const response = await GetApi(Apis.auth.profile);
            if (response.status === 200) {
                dispatch(dispatchProfile(response.data));
            } else {
                errorMessage(response.msg);
            }
        } catch (error) {
            errorMessage(error.message);
        } finally {
            setIsRotating(false)
        }
    }, [dispatch]);
    const fetchCurrency = async () => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${profile?.country}`);
            if (response.data && response.data.length > 0) {
                if (profile?.country === 'china') {
                    const countryData = response.data[2];
                    const currencySymbol = Object.values(countryData.currencies)[0].symbol;
                    dispatch(dispatchNewCurr(currencySymbol))
                    // console.log(currencySymbol)
                } else {
                    const countryData = response.data[0];
                    const currencySymbol = Object.values(countryData.currencies)[0].symbol;
                    dispatch(dispatchNewCurr(currencySymbol))
                    console.log(currencySymbol)
                }
            } else {
                console.error('Unexpected response format:', response);
            }
        } catch (apiError) {
            console.error('Error fetching currency:', apiError);
        }
    }

    const newCurr = useSelector((state) => state.profile.newCurr)

    useEffect(() => {
        if (newCurr === null) { fetchCurrency() }
    }, [newCurr])


    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);




    const containerRef = useRef(null)


    // const searchParams = new URLSearchParams(location.search);


    useEffect(() => {
        if (viewall && containerRef) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [viewall])

    const closeDiv = (val) => {
        setViewAll(false)
        setOpenSide(false)
        dispatch(dispatchNewPath(val))

    }

    const closeUp = (val) => {
        if (smallView) {
            setOpenSide(false)
            dispatch(dispatchNewPath(val))
        }
        dispatch(dispatchNewPath(val))
    }

    useEffect(() => {
        const filterPath = SideLinks.filter((item) => item.url === location.pathname)
        if (filterPath.length > 0) {
            dispatch(dispatchNewPath(filterPath[0].main))
        } else {
            const filterTicket = ticketsArr.filter((item) => item.url === location.pathname.split('/')[4])
            if (filterTicket.length > 0) {
                dispatch(dispatchNewPath(filterTicket[0].main))
            }
        }
    }, [])



    return (
        <div>
            <div className="flex flex-col  border-r  h-[95dvh] ">
                {logout &&
                    <ModalLayout setModal={setLogout} clas={`lg:w-[35%] w-11/12 mx-auto`}>
                        <div className="bg-white py-5 px-3 h-fit flex-col text-black rounded-md flex items-center justify-center">
                            <div className="text-xl font-semibold self-center">Confirm Logout</div>
                            <div className="flex items-center justify-between w-full">
                                <button onClick={() => setLogout(false)} className='w-fit text-white px-4 py-2 rounded-lg bg-red-500'>cancel</button>
                                <button onClick={LogoutUser} className='w-fit text-white px-4 py-2 rounded-lg bg-green-500'>confirm</button>
                            </div>
                        </div>
                    </ModalLayout>
                }
                <div className="w-full flex items-center justify-center min-h-16 mb-10 border-b">
                    <img src={logo} alt="logo" className='w-1/3 mx-auto ' />
                </div>
                <div ref={containerRef} className={` ${viewall ? ' transition-all delay-500 h-[30rem]' : 'h-30rem'} scroll w-full overflow-y-auto overflow-x-hidden px-3 flex items-start  flex-col`}>
                    {SideLinks.map((item, index) => (
                        <Link to={item.url}
                            key={index} q
                            onClick={() => closeDiv(item.main)}
                            className={`text-sm lg:text-base flex items-center gap-3 rounded-lg w-full hover:scale-10  hover:text-sec/40 ${item.url === location.pathname ? 'bg-col text-white' : 'text-sec'} hover:translate-x-1 px-3 mb-3 py-2 font-semibold capitalize transition-all`}>
                            {item.icon}
                            <div className="">{item.path}</div>
                        </Link>
                    ))}

                    {TicketFolder.map((item, index) => (
                        <div key={index}
                            onClick={() => setViewAll(prev => !prev)}
                            className={`text-sm lg:text-base gap-3 mb-2 cursor-pointer  w-full hover:scale-10 flex items-center   hover:text-sec/40 ${viewall ? 'bg-col rounded-md text-white' : 'text-sec'} px-3  py-2 font-semibold capitalize transition-all`}>
                            {item.icon}
                            <div className="">{item.name}</div>

                        </div>
                    ))}
                    {viewall && ticketsArr.map((item, index) => (
                        <Link
                            to={`/user/tickets/status/${item.url}`}
                            onClick={()=>closeUp(item.main)}
                            key={index}
                            className={`text-sm lg:text-base flex items-center gap-3 rounded-lg  first:mt-2 w-full hover:scale-10  hover:text-sec/40 ${`/user/tickets/status/${item.url}` === location.pathname ? 'bg-col text-white' : 'text-sec'} hover:translate-x-2 px-3 mb-3 py-2 font-semibold capitalize transition-all`}>
                            {item.icon}
                            <div className="">{item.main}</div>
                        </Link>
                    ))}

                    <div className="flex flex-col w-full mt- mb-3">
                        {SideLinks2.map((item, index) => (
                            <Link to={item.url} onClick={() => logOut(item)} key={index}
                                className={`text-sm lg:text-base rounded-lg flex items-center gap-3  hover:scale-10  ${item.url === location.pathname ? 'bg-col text-white' : 'text-sec'} hover:text-sec/40 px-3 mb-2 py-2 hover:translate-x-2 font-semibold capitalize transition-all`}>
                                {item.icon}
                                <div className={`${item.log && 'text-red-500'}`}>{item.path}</div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}
