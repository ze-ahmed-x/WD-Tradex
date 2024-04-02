'use client'
import Image from 'next/image'
import React from 'react'
import { logo } from '@/public'
import { navItems } from '@/lib/Constants'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { usePathname } from 'next/navigation'
import MobileNav from './MobileNav'

const Navbar = () => {
    const pathName = usePathname();
  return (
    <header>
        <nav className='custom_container'>
            <div className='flex justify-between items-center my-1 sm:my-2 md:my-3 lg:my-4'>
                <Image src={logo.src} alt='logo' height={30} width={114}/>
                <div className='hidden sm:flex sm:gap-4 md:gap-6 lg::gap-12'>
                {navItems.map( item => {
                    const isActive = pathName === item.href;
                    return (
                        <Link href={item.href} key={item.label} className= {`${isActive && 'font-semibold text-primary' } regularText`} >{ item.label }</Link>
                    )})}
                </div>
                <div className='sm:hidden'>
                    <MobileNav />
                </div>
            </div>
        </nav>
        <Separator />
    </header>    
  )
}

export default Navbar