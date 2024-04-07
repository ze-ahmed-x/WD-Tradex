import ImageTextSec from '@/components/shared/ImageTextSec'
import { services } from '@/lib/Constants'
import React from 'react'
import { Separator } from '@/components/ui/separator'

const page = () => {
    return (
        <section className='custom_container mt-10'>
            {services.map((service, index) => (
                <>
                    <ImageTextSec key={index} imgSrc={service.image.src} imgAlt={service.imageAlt} title={service.title}
                        text={service.text} />
                    <Separator className='mt-2 sm:mt-4 mb-4 sm:mb-10' />
                    {/* empty tag is given so that even odd keep working */}
                    <p></p>
                </>
            ))}
        </section>
    )
}

export default page