import ForgotPassCard from '@/components/shared/forgotPassword/ForgotPassCard'
import React from 'react'

const page = () => {
    return (
        <section className='custom_container mt-10'>
            <div className='custom_container flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
                <div className='flex flex-col items-center sm:gap-2'>
                    <h2 className="h2"> Password Rocovery  </h2>
                    <p className="subText" > Hmm... Lets try to recover your account </p>
                </div>
                <ForgotPassCard />
            </div>
        </section>
    )
}

export default page