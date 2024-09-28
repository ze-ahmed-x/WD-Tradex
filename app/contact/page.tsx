import ContactCard from '@/components/shared/contact/ContactCard'
import { pageContactInfo } from '@/lib/Constants'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Contact"
}

const page = () => {
  return (
    <section className='custom_container mt-10'>
      <div className='custom_container flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
        <div className='flex flex-col items-center sm:gap-2'>
          <h2 className="h2"> {pageContactInfo.title} </h2>
          <p className="subText" > {pageContactInfo.sub_text} </p>
        </div>
        <ContactCard />
      </div>
    </section>
  )
}

export default page