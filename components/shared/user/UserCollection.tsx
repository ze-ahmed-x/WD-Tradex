import { IprofCat } from '@/lib/database/models/category.model'
import { IUser } from '@/lib/database/models/user.model'
import React from 'react'
import UserCard from './UserCard'
import Pagination from '../common/Pagination'



const UserCollection = ({users, categories, page, totalPages} : { users: IUser[], categories: IprofCat[], page: number, totalPages: number}) => {
  return (
    <>
    {
        (users && users.length >0) ? (
        <section className='flex flex-col gap-5'>
            {users.map(user => {
                const userCat = categories.find( cat => cat._id === user.professionCat);
                const userSubCat = userCat?.subCats.find(sCat => sCat._id === user.professionSubCat);
                const cardUser = {...user, professionCat: userCat?.cat, professionSubCat: userSubCat? userSubCat.subCat : ''} as IUser
                return (<UserCard key={user._id} user={cardUser}>
                </UserCard>)
            })}
            {totalPages > 1 && (<Pagination page={page} totalPages={totalPages} />)}
        </section>
        ) : (
        <section>
            <h4 className='h4 text-center'>No user found</h4>
        </section>
        )
    }
    </>
  )
}

export default UserCollection