import SignupForm from '@/components/shared/userForms/SignupForm'
import { pageSignupInfo } from '@/lib/Constants'
import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/utils/authOptions'

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session && session?.user) {
    session.user.role === 'admin'? redirect('/admin/projects'): redirect('user/profile')
  }
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