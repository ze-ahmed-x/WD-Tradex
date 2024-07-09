import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignupForm from '@/components/shared/userForms/SignupForm'
import UserUpdateForm from '@/components/shared/userForms/UserUpdateForm'
import { findUserById } from '@/lib/database/actions/user.action'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
const session =  await getServerSession(authOptions)
const user = await findUserById(String(session?.user.id))

  return (
    <section className='custom_container mt-10 min-h-screen'>
      { session && session?.user && user && (
        <UserUpdateForm user={user} />
      )}
    </section>
  )
}

export default page