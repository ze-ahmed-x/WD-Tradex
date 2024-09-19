import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ProfileDetail from '@/components/shared/profile/ProfileDetail'
import ProfileHeader from '@/components/shared/profile/ProfileHeader'
import { Separator } from '@/components/ui/separator'
import { findDetailedUserById } from '@/lib/database/actions/user.action'
import { IUser } from '@/lib/database/models/user.model'
import { getServerSession } from 'next-auth'

const page = async () => {
  const session = await getServerSession(authOptions)
  const user = await findDetailedUserById(String(session?.user.id)) as IUser
  return (
    <section className='custom_container mt-10 min-h-screen'>
      <div className='flex flex-col gap-6'>
        <ProfileHeader />
        <Separator />
        {/* <Suspense fallback= { <Loading />}>  */}
          <ProfileDetail user= {user} />
        {/* </Suspense> */}
      </div>
    </section>
  )
}

export default page 