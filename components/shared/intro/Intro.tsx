import Image from 'next/image'
import React from 'react'
import { weDo } from '@/public'
import { introText } from '@/lib/Constants'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Intro = () => {
  return (
    <div className='custom_container flex flex-col-reverse sm:flex-row gap-8 items-center'>
        <Image src={weDo.src} alt='we do' width={480} height={270} className='rounded-md shadow-md'/>
        <div className='flex flex-col sm:gap-2'>
            <h2 className='h2'>
                {introText.title}
            </h2>
            <p className='subText'>
                {introText.description}
            </p>
            <Button asChild className='sm:w-fit mt-4'>
                <Link href={introText.button.route}>{introText.button.lebal}</Link>
            </Button>
        </div>
    </div>
  )
}

export default Intro