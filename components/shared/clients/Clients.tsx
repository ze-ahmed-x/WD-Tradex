import { clientFlags } from '@/lib/Constants'
import Image from 'next/image'
import React from 'react'

const Clients = () => {
  return (
    <div className='custom_container flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
        <div className='flex flex-col items-center sm:gap-2'>
            <h2 className='h2'>Our Clients</h2>
            <p className='subText'>We have employers from all over the world</p>
        </div>
        <div className='flex gap-8 sm:gap-9 md:gap-10 lg:gap-12 flex-wrap justify-center'>
            {clientFlags.map(flag => (
                <Image src={flag.flagSrc}
                alt={flag.countryName}
                key={flag.countryName}
                height={47}
                width={79}
                className='rounded sm:rounded-md shadow-md w-9 sm:w-12 md:w-14 lg:w-20 border'/>
            ))}
        </div>
    </div>
  )
}

export default Clients