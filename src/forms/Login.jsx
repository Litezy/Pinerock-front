import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ButtonComponent from '@/utils/ButtonComponent'
import FormComponent from '@/utils/FormComponent'
import { CookieName, errorMessage, successMessage, UserRole } from '@/utils/functions'
import Cookies from 'js-cookie'
import { Apis, PostApi } from '@/services/Api'
import { decodeToken } from 'react-jwt'
import Loader from '@/utils/Loader'
// import blockImg from '@/assets/general/block.png'
import blocksImg from '@/assets/general/blocks.png'
import savingsImg from '@/assets/general/house_savings.png'
import offerImg from '@/assets/general/offer.png'
import GoogleSignButton from '@/components/general/GoogleSIgnButton'

export default function Login() {

    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        email: '',
        password: ''
    })

    const [login, setLogin] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    }


    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    const LoginAcc = async (e) => {
        e.preventDefault()
        if (!forms.email) return errorMessage('Email address is required')
        if (!isValidEmail(forms.email)) return errorMessage('Please input a valid email')
        if (!forms.password) return errorMessage('Password is required')
        const formdata = {
            email: forms.email,
            password: forms.password
        }
        setLoading(true)
        try {
            const response = await PostApi(Apis.non_auth.login, formdata)
            if (response.status === 200) {
                Cookies.set(CookieName, response.token,)
                successMessage(response.msg)
                const decoded = decodeToken(response.token)
                const findUserRole = UserRole.find((ele) => ele.role === decoded.role)
                if (findUserRole) {
                    navigate(findUserRole.url)
                }
            }
            else {
                errorMessage(response.msg)
            }
        }
        catch (error) {
            return errorMessage(error.message)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className='bg-gradient-to-tr  from-sec h-screen to-primary overflow-x-hidden flex items-start '>
            {loading &&
                <div className="absolute top-1/2 left-1/2  -translate-x-1/2">
                    <Loader />
                </div>
            }
            <div className="lg:w-1/2  hidden lg:block h-full bg-transparent">
                <div className="w-full h-full flex items-center relative py-2 flex-col">
                    <img src={blocksImg} className='h-24' alt="blocks img" />
                    <img src={offerImg} className='h-full' alt="offer img" />
                    <img src={savingsImg} className='absolute bottom-40 left-0' alt="savings img" />
                    <div className="self-start flex items-start flex-col gap-2 mt-3 w-11/12 mx-auto text-white">
                        <div className="text-2xl font-bold">Built for Speed, Security, and Savings</div>
                        <p className='text-sm text-zinc-300'>Our platform ensures a smooth and intuitive payment flow from start to finish. With no unnecessary redirects or delays, users can complete transactions in just a few taps—making the entire process fast, simple, and frustration-free.</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-full overflow-auto flex items-start py-10 justify-center lg:w-1/2 mx-auto  bg-white ">

                {!login && <div className='w-11/12 mx-auto'>
                    <div className="w-fit ml-auto">Don't have an account? <Link to={`/signup`} className='underline text-col'>Sign up</Link></div>
                    <div className="flex items-center mt-10 w-full flex-col gap-5">
                        <div className="">
                            <div className="text-3xl font-bold text-sec">Welcome Back to Pinerock </div>
                            <div className="">Please enter your details to sign in your account</div>
                        </div>
                        <form onSubmit={LoginAcc} className='mt-5 w-full flex items-start gap-4 flex-col'>
                            <div className="w-full flex items-start flex-col">
                                <div className="">Email Address</div>
                                <FormComponent formtype="email" name={`email`} value={forms.email} onchange={handleChange} placeholder="Email Address" />
                            </div>
                            <div className="w-full flex items-start flex-col">
                                <div className="">Password</div>
                                <FormComponent formtype="password" name={`password`} value={forms.password} onchange={handleChange} placeholder="minimum of 6 characters" />
                            </div>
                            <ButtonComponent bg={`bg-col text-white h-12`} title={loading ? "...Logging in" : "Login Account"} />
                            

                            <div className="w-full flex items-center justify-between gap-5">
                                <Link to="/forgot-password" className='text-col underline text-center w-full font-semibold'>Forgot Password?</Link>
                                <Link to="/" className='text-col underline text-center w-full font-semibold'>Go Home</Link>
                            </div>
                        </form>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}
