import { UserStatus } from '@/lib/Constants'
import { IUser } from '@/lib/database/models/user.model'
import Image from 'next/image'
import React from 'react'


const UserCardInfo = ({user}: {user:IUser}) => {
  return (
    <div className='flex flex-col sm:flex-row gap-5 items-center'>
          <div>
            <Image className='rounded-md' height={180} width={120} src={user.photoUrl || '/images/profile.webp'} alt='profile' />
          </div>
          <div className='flex flex-col gap-3 w-full'>
            <h4 className='h4'> {`${user.firstName[0].toUpperCase().concat(user.firstName.slice(1))} ${user.lastName[0].toUpperCase().concat(user.lastName.slice(1))}`} </h4>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap5'>
              <p className='normalText font-semibold'> User ID: <span className='font-normal'> {user.customUserId} </span></p>
              <p className='normalText font-semibold'> Status: <span className='font-normal'> {UserStatus[user.status as keyof typeof UserStatus]} </span></p>
            </div>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap5'>
              <p className='normalText font-semibold'> Profession: <span className='font-normal'> {user.profession} </span></p>
              <p className='normalText font-semibold'> Yrs of Exp: <span className='font-normal'> {user.yearsOfExperience} </span></p>
            </div>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap5'>

              <p className='normalText font-semibold'> Contact: <span className='font-normal'> {user.mobile} </span></p>
              <p className='normalText font-semibold'> Email: <span className='font-normal'> {user.email} </span></p>
            </div>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap5'>

              <p className='normalText font-semibold'> Category: <span className='font-normal'> {user.professionCat} </span></p>
              <p className='normalText font-semibold'> Sub Category: <span className='font-normal'> {user.professionSubCat} </span></p>
            </div>
          </div>
        </div>
  )
}

export default UserCardInfo