import React, { useState } from 'react'
import { CiMail } from 'react-icons/ci'
import { FaFacebookF, FaInstagram, FaLocationArrow, FaPinterestP, FaXTwitter } from 'react-icons/fa6'
import { FiPhoneIncoming, FiPrinter } from 'react-icons/fi'
import { errorMessage, SiteAddress, SiteContact, SiteEmail, successMessage } from '@/utils/functions';
import { Apis, ClientPostApi } from '@/services/Api';



const ContactUs = () => {

  const links = [
   
    {
      img: < FiPhoneIncoming />,
      title: 'Give us a call',
      desc: SiteContact
    },
    {
      img: <CiMail />,
      title: 'Send us an email',
      desc: SiteEmail,
      type:'email'
    },
    {
      img: <FaLocationArrow />,
      title: 'Visit us',
      desc: SiteAddress
    },
  ]



  const [loading, setLoading] = useState(false)
  const [forms, setForms] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setForms({
      ...forms,
      [e.target.name]: e.target.value
    })
  }

  const SubmitForm = async (e) => {
    e.preventDefault()
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    if (!forms.email) return errorMessage('Email is missing')
    if (forms.email) {
      if (!isValidEmail(forms.email)) return errorMessage('Invalid email')
    }
    if (!forms.message) return errorMessage('Message is missing')
    const formdata = {
      name: forms.name,
      email: forms.email,
      message: forms.message
    }
    setLoading(true)
    try {
      const res = await ClientPostApi(Apis.non_auth.contact_us, formdata)
      if (res.status === 200) {
        successMessage(`Message sent successfully`)
        setForms({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        errorMessage(`something went wrong`)
      }
    } catch (error) {
      console.log(error)
      errorMessage(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className=''>
      <div className="w-full h-full   pt-5 lg:pt-0 lg:border-none text-white ">
        <div className="w-11/12 mx-auto">
          <div className="flex items-start flex-col lg:flex-row lg:gap-10 w-full">
            <div className="lg:w-1/2 w-full text-dark flex items-start flex-col gap-6 h-fit pb-10 lg:pb-0">
              <div className="font-bold  text-4xl">Contact Our Team</div>
              <div className="font-semibold">Get in touch with our team to explore how we can support your financial journey. We're here to answer your questions and provide personalized assistance!</div>
              <div className="flex w-full lg:w-3/4 items-start flex-col gap-3 mt-5">
                {links.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white w-full p-4 rounded-md">
                    <div className="border-[#eef0f4] border rounded-full p-3 bg-white text-sec">
                      <div className="text-col text-xl">{item.img}</div>
                    </div>
                    <div className="flex items-start flex-col">
                      <div className="text-sm text-gray-600 font-semibold">{item.title}</div>
                      <a href={item.type  && `mailto:${item.desc}` } 
                      className={`text-sm  text-sec font-bold ${item.type && 'underline'}`}>{item.desc}</a>
                    </div>
                  </div>
                ))}
              </div>

            </div>
            <div className="lg:w-1/2 w-full bg-white h-fit rounded-2xl text-sec">
              <div className="h-full py-10 px-2">
                <div className="w-11/12 mx-auto flex items-start flex-col">
                  <div className=" text-2xl lg:text-4xl font-bold ">We'll get in touch shortly</div>
                  <div className="">We're here to answer your questions and provide personalized assistance!</div>

                </div>

                <div className="mt-5  w-11/12 mx-auto">
                  <form onSubmit={SubmitForm} className='flex w-full items-start flex-col gap-5'>
                    <div className="flex items-center w-full gap-4">
                      <div className="flex items-start flex-col w-1/2 ">
                        <label htmlFor="name" className='text-sm font-semibold'>Full Name</label>
                        <input type="text" name='name' value={forms.name} onChange={handleChange} placeholder='Enter your name' className='w-full border border-sec rounded-md px-3 py-2 outline-none focus:border-col transition-all duration-300 ease-in-out' />
                      </div>
                      <div className="flex items-start flex-col w-1/2">
                        <label htmlFor="email" className='text-sm font-semibold'>Email</label>
                        <input type="email" name='email' value={forms.email} onChange={handleChange} placeholder='Enter your email' className='w-full border border-sec rounded-md px-3 py-2 outline-none focus:border-col transition-all duration-300 ease-in-out' />
                      </div>
                    </div>
                    <div className="flex items-start flex-col w-full">
                      <label htmlFor="subject" className='text-sm font-semibold'>Subject</label>
                      <input type="text" name='subject' value={forms.subject} onChange={handleChange} placeholder='Enter subject' className='w-full border border-sec rounded-md px-3 py-2 outline-none focus:border-col transition-all duration-300 ease-in-out' />
                    </div>
                    <div className="flex items-start flex-col w-full">
                      <label htmlFor="message" className='text-sm font-semibold'>Message</label>
                      <textarea type="text" name='subject' value={forms.subject} onChange={handleChange} placeholder='Enter message' className='w-full min-h-20 border border-sec rounded-md px-3 py-2 outline-none focus:border-col transition-all duration-300 ease-in-out' />
                    </div>
                    <button type='button' className='bg-col w-full text-white rounded-md py-2.5'>submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ContactUs