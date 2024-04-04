import { navItems } from '@/lib/Constants'
import { fb, linkedIn, logo, x } from '@/public'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='mt-12 bg-foreground'>
            <div className='custom_container flex flex-col items-center gap-4 sm:flex-row sm:justify-between p-5 sm:p-10'>

                <div className='flex flex-col gap-2'>
                    <div className='w-28'>
                        <Image src={logo.src} alt='logo' height={30} width={114} />
                    </div>
                    <div className='flex items-center justify-between'>
                        <Link href='https://twitter.com/Tradexpk'
                            passHref={true} rel="noopener noreferrer" target="_blank">
                            <Image src={x} alt='x' height={16} width={16} />
                        </Link>
                        <Link href='https://www.facebook.com/tradexpioneerpk'
                            passHref={true} rel="noopener noreferrer" target="_blank">
                            <Image src={fb} alt='x' height={16} width={16} />
                        </Link>
                        <Link href='https://pk.linkedin.com/in/tradex-poineer-445924279'
                            passHref={true} rel="noopener noreferrer" target="_blank">
                            <Image src={linkedIn} alt='x' height={16} width={16} />
                        </Link>
                    </div>
               
                </div>
                <div className='hidden sm:flex flex-col flex-wrap gap-4 items-center h-32'>
                    {navItems.map( item => (
                        <Link href= { item.href } key={item.href} className='regularText text-white mr-20'> {item.label} </Link>
                    ))}
                </div>
                <div>
                    <p className='text-[8px] sm:text-xs text-white/75'>Copyright © Tradex pvt, ltd</p>
                    <p className='text-[8px] sm:text-xs text-white/75'>All rights reserved</p>
                </div>
            </div>

        </div>
    )
}

export default Footer