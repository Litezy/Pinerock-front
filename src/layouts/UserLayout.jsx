import { Box, LinearProgress } from '@mui/material';
import { dispatchCurrency, dispatchProfile } from '@/app/reducer';
import UserSidebar from '@/components/user/UserSidebar';
import { BiUser } from "react-icons/bi";
import VerifyEmailAccount from '@/forms/VerifyEmail';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BsBell } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Apis, GetApi, profileImg } from '@/services/Api';
import { errorMessage } from '@/utils/functions';
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { AnimatePresence, motion } from 'framer-motion'
import { dispatchNewPath } from '@/app/reducer';



export default function UserLayout({ children }) {
    const [loading, setLoading] = useState(true)
    const [chats, setChats] = useState(false)
    const [openside, setOpenSide] = useState(false)
    const path = useSelector((state) => state.profile.path);
    const [profile, setProfile] = useState({})
    const dispatch = useDispatch()
    const [notice, setNotice] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const refdiv = useRef(null)
    // console.log(path)
    const fetchUserProfile = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.profile);
            if (response.status !== 200) return navigate('/login')
            setProfile(response.data);
            dispatch(dispatchProfile(response.data));
            dispatch(dispatchCurrency(response.data?.currency));

        } catch (error) {
            navigate('/login')
            errorMessage(error.message);
        }
    }, [dispatch, navigate]);


    useEffect(() => {
        fetchUserProfile()
    }, [fetchUserProfile])

    const fetchUserNotifications = useCallback(async () => {
        try {
            const response = await GetApi(Apis.auth.user_notifications)
            if (response.status !== 200) return;
            const filter = response.data.filter((item) => item.status === 'unread')
            setNotice(filter)
        } catch (error) {
            console.error('Error fetching currency:', error);
        }
    }, [])

    useEffect(() => {
        fetchUserNotifications()
    }, [fetchUserNotifications])

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])

    useEffect(() => {
        if (refdiv) {
            window.addEventListener('click', (e) => {
                if (refdiv.current !== null && !refdiv.current.contains(e.target)) return setOpenSide(false)
            }, true)
        }
    }, [])

    useEffect(() => {
        if (location.pathname.includes(`active_chats/` || `closed_chats/`)) {
            setChats(true)
        } else {
            setChats(false)
        }
    }, [location.pathname])

    if (loading) return (
        <div>
            <div className="flex items-center h-screen">
                <div className="hidden lg:block w-[23%] bg-white border-r h-full pt-10">
                    {new Array(10).fill(0).map((ele, index) => (
                        <div className="bg-#fdf8ef h-14 mb-2 w-11/12 mx-auto rounded-lg" key={index}></div>
                    ))}
                </div>
                <div className="w-full ml-auto bg-#fdf8ef h-screen">
                    <div className="flex items-center justify-between bg-white p-3">
                        <div className="">
                            <div className="w-10 h-10 bg-#fdf8ef rounded-lg"></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-#fdf8ef rounded-lg"></div>
                            <div className="w-10 h-10 bg-#fdf8ef rounded-lg"></div>
                            <div className="w-10 h-10 bg-#fdf8ef rounded-lg"></div>
                        </div>
                    </div>
                    <div className="h-[91.1dvh] flex items-center w-4/5 max-w-xl mx-auto justify-center pb-10 overflow-y-auto">
                        <Box sx={{ width: '100%', }} className="bg-col">
                            <LinearProgress />
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )


    return (
        <div>
            {profile?.verified === 'false' &&
                <VerifyEmailAccount />
            }
            {profile?.verified === 'true' &&
                <div className="flex items-center h-screen  bg-white">
                    <div className="h-screen hidden lg:block lg:w-[20%] bg-white text-sec">
                        <UserSidebar setOpenSide={setOpenSide} />
                    </div>
                    <div className=" lg:w-[80%] h-screen overflow-y-auto w-full relative">
                        
                            <div className={` h-[4rem] border-b fixed w-full lg:w-[79%] bg-white flex z-40 items-center px-5`}>
                                <div className="flex items-center gap-2 w-2/3">

                                    <div className="font-semibold text-base capitalize">{path}</div>
                                </div>
                                <div className="w-1/2 ">
                                    <div className="text-2xl hidden  lg:flex items-center justify-end gap-5">
                                        <Link to="/user/notifications" className='relative'>
                                            {notice && notice.length > 0 && <div className="w-3 h-3 bg-red-600 rounded-full border-2  absolute top-0 right-0 shadow-lg"></div>}
                                            <BsBell className='text-col' />
                                        </Link>
                                        <Link
                                            className='flex items-center gap-2'
                                            to={`/user/profile`}
                                            onClick={()=> dispatch(dispatchNewPath('profile'))}
                                            >    
                                            <div className="w-full flex items-center justify-center">
                                                {profile?.image ? <img src={`${profileImg}/profiles/${profile?.image}`} className='w-10 h-10 object-cover rounded-full' alt={`profile image`} /> :
                                                    <BiUser />
                                                }
                                            </div>
                                            <div className="flex text-sm items-start flex-col">
                                                <p className='font-bold'>{profile?.firstname} {profile?.lastname}</p>
                                                <p className='text-xs'>{profile?.email}</p>
                                            </div>
                                        </Link>

                                    </div>
                                    <div className="lg:hidden w-fit ml-auto">
                                        <HiOutlineBars3BottomRight onClick={() => setOpenSide(prev => !prev)} className='text-4xl cursor-pointer font-bold' />
                                    </div>
                                </div>


                            </div>
                        {openside &&
                            <AnimatePresence onExitComplete={() => setOpenSide(false)}>
                                <motion.div
                                    initial={{ x: '100vw', opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ type: 'tween', mass: 0.4, damping: 10, delay: 0.5, duration: 1 }}
                                    exit={{ x: '100vw', opacity: 0 }}
                                    ref={refdiv} className="w-[65%] border-tl-md border border-bl-md md:w-[35%] rounded-s-lg z-50 top-0  right-0 bg-white fixed">
                                    <UserSidebar smallView={true} setOpenSide={setOpenSide} />

                                </motion.div>
                            </AnimatePresence>
                        }
                        <div className={`h-fit ${chats ? '' : 'mt-14 pb-10 pt-5'} overflow-x-hidden `}>
                            {children}
                        </div>

                    </div>
                </div>}
        </div>
    )
}
