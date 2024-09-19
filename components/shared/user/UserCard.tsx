import { Card } from '@/components/ui/card'
import { UserStatus } from '@/lib/Constants'
import { IprofCat } from '@/lib/database/models/category.model'
import { IUser } from '@/lib/database/models/user.model'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



const UserCard = ({user} : {user:IUser}) => {
  return (
    <Link key={user._id} href={`/admin/seekers/${user._id}`}>
                        <Card key={user._id} className='p-5 w-full shadow-md hover:shadow-lg transition-all bg-hero_BG/25 hover:ring-1 ring-hero_BG/50 flex flex-col sm:flex-row gap-3 items-center'>
                        <div>
                            <Image className='rounded-md' height={180} width={120} src={user.photoUrl || '/images/profile.webp'} alt='profile' />
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                          <h4 className='h4'> {`${user.firstName[0].toUpperCase().concat(user.firstName.slice(1))} ${user.lastName[0].toUpperCase().concat(user.lastName.slice(1))}`} </h4>
                          <div className='flex flex-col sm:flex-row gap-3 sm:gap5'>
                          <p className='normalText font-semibold'> User ID: <span className='font-normal'> {user.customUserId} </span></p>
                          <p className='normalText font-semibold'> Status: <span className='font-normal'> {UserStatus[ user.status as keyof typeof UserStatus]} </span></p>
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
                        </Card>
                      </Link>
  )
}

export default UserCard