import Loading from '@/app/loading'
import ProfileDetail from '@/components/shared/profile/ProfileDetail'
import ProfileHeader from '@/components/shared/profile/ProfileHeader'
import { Separator } from '@/components/ui/separator'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <section className='custom_container mt-10 min-h-screen'>
      <div className='flex flex-col gap-6'>
        <ProfileHeader />
        <Separator />
        <Suspense fallback= { <Loading />}> 
          <ProfileDetail />
        </Suspense>
      </div>
    </section>
  )
}

export default page 