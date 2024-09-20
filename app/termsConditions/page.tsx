import { Separator } from '@/components/ui/separator'
import { termsConditions } from '@/lib/Constants'
import React from 'react'

const page = () => {
  return (
    <section className='custom_container mt-10 min-h-screen'>
        <h3 className='h3 text-center'>{ termsConditions.title }</h3>
        <p className='regularText text-center'>{termsConditions.discription}</p>
        <Separator className='mt-4 mb-4'/>
        <div className='flex flex-col gap-5'>
        {termsConditions.detail.map((item, index) => (
            <div key={index} className='flex flex-col gap-2'>
                <h4 className='h4'> {`${index+1}.  ${item.heading}`} </h4>
                <p className='normalText'> {item.text} </p>
            </div>
        ))}
        </div>
    </section>
  )
}

export default page