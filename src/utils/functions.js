import toast from "react-hot-toast"

export const SiteName = 'Pinerock Credit Union'
export const SiteEmail = 'support@pinerockcreditunion.com'
export const SiteContact = '+44 45 7200 8200'
export const SiteAddress = 'L.K.Road, Vashi -410200'
export const Currency = '£'
export const errorMessage = (message) => {
    return toast.error(message, {
        duration: 4000,
        position: "top-center"
    })
}
export const successMessage = (message) => {
    return toast.success(message, {
        duration: 4000,
        position: "top-center",
        
    })
}

export const CookieName = 'bankingmain'
export const UserRole = [
    {
        role: 'user',
        url: '/user'
    },
    {
        role: 'admin',
        url: '/admin/overview'
    }
]
export const MoveToBottom = ()=>{
    const div = document.querySelector('.downdiv')
    if(div){
        div.scrollTo({
            top:div.scrollHeight,
            behavior:'smooth'
        })
    }
}
export const MoveToTop= () =>{
    const div = document.querySelector('.updiv')
    if(div){
        div.scrollTop =0
    }
}