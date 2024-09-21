'use server'
import ResetPassword from '@/components/shared/resetPassword/ResetPassword'
import { verifyJWT } from '@/lib/jwt'
import React from 'react'

type props = {
    params: {
        jwt: string
    }
}

const page = async ({params} : props) => {
   
    const payload = verifyJWT(params.jwt, process.env.JWT_USER_RESET_SECRET!)
    
  return (
    <section className='custom_container mt-10'>
    <div className='custom_container flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
        <div className='flex flex-col items-center sm:gap-2'>
            <h2 className="h2">Reset Password</h2>
            <p className="subText" >Please provide new Password</p>
        </div>
        {!payload? (
            <h3 className='h3 text-red-500'> Invalid URL</h3>
        ): 
        (<ResetPassword userId= {payload.id} />)
        }
    </div>
</section>
  )
}

export default page