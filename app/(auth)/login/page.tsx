import LoginCard from '@/components/shared/login/LoginCard'
import { useSession } from 'next-auth/react'

type props = {
  searchParams: {
    callbackUrl: string
  }
}


const page = ( { searchParams } : props) => {
  return (
    <section className='custom_container mt-10'>
         <div className='custom_container flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
        <div className='flex flex-col items-center sm:gap-2'>
            <h2 className="h2"> Log In </h2>
            <p className="subText" > Please provide credentials </p>
        </div>
        <LoginCard callbackUrl= {searchParams.callbackUrl} />
    </div>
    </section>
  )
}

export default page