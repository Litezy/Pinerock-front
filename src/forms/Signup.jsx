import { MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Apis, PostApi } from '@/services/Api'
import CountryStates from '@/utils/CountryStates'
import DailOptions from '@/utils/DailOption'
import Formbutton from '@/utils/Formbutton'
import Forminput from '@/utils/Forminput'
import { errorMessage, successMessage } from '@/utils/functions'
import blocksImg from '@/assets/general/blocks.png'
import savingsImg from '@/assets/general/house_savings.png'
import offerImg from '@/assets/general/offer.png'
import GoogleIcon from '@/components/general/GoogleIcon'
import ButtonComponent from '@/utils/ButtonComponent'

export default function Signup() {
    const [log, setLog] = useState(false)
    const [forms, setForms] = useState({
        firstname: '',
        lastname: '',
        email: '',
        gender: '',
        country: '',
        state: '',
        dialcode: '',
        phone: '',
        password: '',
        confirm_password: '',
    })
    const [submit, setSubmit] = useState(false)
    const [loading, setLoading] = useState(false)

    const [agree, setAgree] = useState(false);
    const [checkError, setCheckError] = useState(false);
    const navigate = useNavigate()

    const handleCheckboxChange = (e) => {
        setAgree(e.target.checked);
        if (!e.target.checked) {
            setCheckError(true);
        } else {
            setCheckError(false);
        }
    };

    const handleForms = (e) => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    }

    const setup = (value) => {
        setForms({ ...forms, dialcode: value })
    }

    const handleCountry = (country, state) => {
        setForms({ ...forms, country: country, state: state })
    }

    async function handleSubmission(e) {
        e.preventDefault()
        setSubmit(true)
        if (!agree) {
            return setCheckError(true);
        }
        if (!forms.dialcode) return errorMessage('Country dial code is required')
        if (forms.password !== forms.confirm_password) return errorMessage('password mismatched')
        if (!forms.country) return errorMessage('Country  is required')
        if (!forms.state) return errorMessage('State is required')
        const formdata = {
            firstname: forms.firstname,
            lastname: forms.lastname,
            email: forms.email,
            gender: forms.gender,
            country: forms.country,
            state: forms.state,
            dialcode: forms.dialcode,
            phone: forms.phone,
            password: forms.password,
            confirm_password: forms.confirm_password,
        }
        setLoading(true)
        try {
            const res = await PostApi(Apis.non_auth.create_acc, formdata)
            if (res.status === 200) {
                successMessage(`sign up success`)
                navigate(`/verify-email?email=${encodeURIComponent(forms.email)}`);
            } else {
                errorMessage(res.msg)
            }
        } catch (error) {
            errorMessage(`sorry, something went wrong on our end`, error.message)
            // console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='bg-gradient-to-tr  from-sec h-screen to-primary overflow-x-hidden flex items-start '>
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

                {!log &&
                    <form onSubmit={handleSubmission} className="mt-5 w-11/12 mx-auto flex flex-col gap-4">
                        <div className="w-fit ml-auto">Already have an account? <Link to={`/login`}
                            className='underline text-col'>Sign in</Link></div>
                        <div className="flex items-start  w-full flex-col">
                            <div className="text-3xl font-bold text-sec">Create Account </div>
                            <div className="">Become a member and grow your passive income into greater heights</div>
                        </div>
                        <Forminput isError={submit && !forms.firstname ? "First name is missing" : ""}
                            name={'firstname'}
                            onClick={() => setSubmit(false)}
                            value={forms.firstname}
                            onChange={handleForms} formtype="text" label="First Name" />


                        <div className="grid grid-cols-7 gap-1 lg:gap-5">
                            <div className="col-span-5">
                                <Forminput
                                    name={'lastname'}
                                    value={forms.lastname}
                                    onClick={() => setSubmit(false)}
                                    onChange={handleForms} formtype="text" label="Last Name"
                                    isError={submit && !forms.lastname ? "Last name is missing" : ""}
                                />
                            </div>


                            <div className="col-span-2">
                                <Forminput
                                    name={'gender'}
                                    value={forms.gender}
                                    onClick={() => setSubmit(false)}
                                    isError={submit && !forms.gender ? "Gender is missing" : ""}
                                    onChange={handleForms}
                                    formtype="select" label={'Gender'}>
                                    <MenuItem value={'male'}>Male</MenuItem>
                                    <MenuItem value={'female'}>Female</MenuItem>
                                </Forminput>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 lg:gap-3">
                            <div className="col-span-2">
                                <DailOptions title="+1" setup={setup} />
                            </div>
                            <div className="col-span-5">
                                <Forminput
                                    name={'phone'}
                                    value={forms.phone}
                                    onChange={handleForms}
                                    formtype="text"
                                    onClick={() => setSubmit(false)}
                                    isError={submit && !forms.phone ? "Phone number is missing" : ""}
                                />
                            </div>
                        </div>


                        <Forminput
                            name={'email'}
                            value={forms.email}
                            onClick={() => setSubmit(false)}
                            onChange={handleForms}
                            formtype="text" label="Email Address"
                            isError={submit && !forms.email ? "Email is missing" : ""}
                        />
                        <CountryStates onChange={handleCountry} />


                        <Forminput
                            name={'password'}
                            value={forms.password}
                            onChange={handleForms}
                            formtype="password"
                            label="Password"
                            onClick={() => setSubmit(false)}
                            isError={submit && !forms.password ? "Password is missing" : ""}
                        />

                        <Forminput
                            name={'confirm_password'}
                            value={forms.confirm_password}
                            onChange={handleForms}
                            formtype="password"
                            label="Confirm Password"
                            onClick={() => setSubmit(false)}
                            isError={submit && !forms.confirm_password ? "Confirm password is missing" : ""}
                        />


                        <div className="flex items-center mb-3">
                            <Forminput
                                isError={checkError ? "Agree to our T&C's" : ""}
                                formtype="checkbox"
                                placeholder=""
                                signup={true}
                                onChange={handleCheckboxChange}
                            />
                            <div className="text-sm">Confirm you agree to our
                                <Link className='text-col font-semibold' to={`/terms`}> terms of use</Link> and
                                <Link to={`/privacy-policy`} className='text-col' > privacy policy</Link>.</div>
                        </div>


                        <ButtonComponent bg={`bg-col text-white h-12`} title={loading ? "...Logging in" : "Create Account"} />
                        
                        <Link to="/" className='text-col underline text-center w-full font-semibold'>Go Home</Link>
                    </form>
                }
            </div>
        </div>
    )
}