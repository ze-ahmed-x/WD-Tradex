import EmailVarification from '@/components/shared/email/EmailVarification'
import React from 'react'

type props = {
    params: {
        jwt: string
    }
}

const page = ({params}: props) => {
  return (
    <section className='custom_container mt-10'>
         <div className='custom_container flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
        <div className='flex flex-col items-center sm:gap-2'>
            <h2 className="h2"> Email Verification </h2>
            <p className="subText" > Your email will be used to recover your password, if required. </p>
        </div>
        <EmailVarification jwt={params.jwt} />
    </div>
    </section>
  )
}

export default page