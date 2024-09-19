import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignupForm from '@/components/shared/userForms/SignupForm'
import UserUpdateForm from '@/components/shared/userForms/UserUpdateForm'
import { findUserByIdExternal } from '@/lib/database/actions/user.action'
import { IUser } from '@/lib/database/models/user.model'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
const session =  await getServerSession(authOptions)
const user = await findUserByIdExternal(String(session?.user.id)) as IUser
  return (
    <section className='custom_container mt-10 min-h-screen'>
      { session && session?.user && user && (
        <UserUpdateForm key={user._id} user={user} />
        // <p>just testing</p>
      )}
    </section>
  )
}

export default page