import ProfileDetail from '@/components/shared/profile/ProfileDetail'
import UserCard from '@/components/shared/user/UserCard'
import UserCardInfo from '@/components/shared/user/UserCardInfo'
import { Separator } from '@/components/ui/separator'
import { findDetailedUserById } from '@/lib/database/actions/user.action'
import { IUser } from '@/lib/database/models/user.model'
import React from 'react'

type props = {
    params: {userId: string}
}

const page = async ({ params: { userId }} : props) => {
    const user = await findDetailedUserById(userId) as IUser
  return (
    <section className='custom_container mt-10 min-h-screen'>
    <div className='flex flex-col gap-6'>
      <UserCardInfo user={user} />
      <Separator />
        <ProfileDetail user={user} />
    </div>
  </section>
  )
}

export default page