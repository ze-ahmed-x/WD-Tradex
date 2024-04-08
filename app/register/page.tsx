import { underConstructionImage } from '@/public'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <section className='custom_container mt-10 min-h-screen'>
        <div className='flex items-start justify-center'>
            <Image src = { underConstructionImage.src} alt='underConstruction' height={729} width={972} />
        </div>
    </section>
  )
}

export default page