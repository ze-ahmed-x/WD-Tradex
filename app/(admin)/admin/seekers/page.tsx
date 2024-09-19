import Loading from '@/app/loading'
import SearchUser from '@/components/shared/user/SearchUser'
import UserCollection from '@/components/shared/user/UserCollection'
import { Separator } from '@/components/ui/separator'
import { getAllProfCats } from '@/lib/database/actions/category.actions'
import { getAllUser } from '@/lib/database/actions/user.action'
import { IprofCat } from '@/lib/database/models/category.model'
import { SearchParamProps, userSearchResult } from '@/types'
import { Suspense } from 'react'

const page = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1
  const username = searchParams?.username as string || ''
  const userId = searchParams?.userId as string || ''
  const category = searchParams?.cat as string || ''
  const subCategory = searchParams?.subCat as string || ''
  const status = searchParams?.status as string || ''
  const limit = 2;

  const users = await getAllUser({
    username: username,
    category: category,
    limit: limit,
    page: page,
    subCategory: subCategory,
    userId: userId,
    status: status,
  }) as userSearchResult
  const categories = await getAllProfCats() as IprofCat[]
  return (
    <section className='custom_container mt-10 min-h-screen'>
      <div className='flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
        <div className='flex flex-col items-center sm:gap-2'>
          <h2 className="h2"> Users </h2>
          <p className="subText" > List of all users </p>
        </div>
        <Separator />
        {/* <section className='md:grid grid-cols-4 w-full'> */}
        <section className='flex flex-col sm:flex-row gap-5 w-full'>
          <SearchUser />
          {/* <div className='col-span-3 p-3'> */}
          <div className='w-full'>
            {/* <Suspense fallback= { <Loading />}> */}
            <Suspense fallback={<Loading />}>
              {
                (users.data && users.data.length > 0)?
                  (<div className='flex flex-col gap-4'>
                    <h4 className='h4 text-center text-primary underline'>List of Users</h4>
                    <UserCollection users={users.data} categories={categories} page={page} totalPages={Math.ceil(users.userCount/limit)} />
                    {/* {jobs.totalPages > 1 && <Pagination page={page} totalPages={jobs.totalPages} />} */}
                  </div>) : (
                    <section className='mt-10'>
                      <h4 className='h4 text-center'>Ops! No user found.</h4>
                    </section>
                  )
              }
            </Suspense>
          </div>
        </section>
      </div>
    </section>
  )
}

export default page