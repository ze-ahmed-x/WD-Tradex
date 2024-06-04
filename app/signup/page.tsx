import SignupForm from '@/components/shared/signup/SignupForm'
import { pageSignupInfo } from '@/lib/Constants'
import React from 'react'

const page = () => {
  return (
    <section className='custom_container mt-10'>
         <div className='custom_container flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
        <div className='flex flex-col items-center sm:gap-2'>
            <h2 className="h2"> {pageSignupInfo.title} </h2>
            <p className="subText" > {pageSignupInfo.sub_text} </p>
        </div>
        <SignupForm />
        </div>
    </section>
  )
}

export default page