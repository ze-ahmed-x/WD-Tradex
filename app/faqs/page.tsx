import { Separator } from '@/components/ui/separator'
import { faqs } from '@/lib/FAQs/faqs'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "FAQs"
  }

const page = () => {
  return (
    <section className='custom_container mt-10'>
        <div className='flex flex-col gap-8'>
            <h2 className='h2 text-center'> FAQs </h2>
            <div className='flex flex-col gap-6'>
                { faqs.map( (quest, index) => (
                    <>
                    <div key={index} className='flex flex-col gap-3'>
                        <h3 className='h4'><span className='h3 text-primary'>Q:</span> { quest.question }</h3>
                        <p className='regularText'> <span className='h3 text-primary'> A: </span> {quest.answer} </p>
                    </div>
                    <Separator />
                    </>
                ))}
            </div>
        </div>

    </section>
)
}

export default page