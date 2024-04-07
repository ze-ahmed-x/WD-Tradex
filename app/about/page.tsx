import ImageTextSec from '@/components/shared/ImageTextSec'
import { aboutUs } from '@/lib/Constants'
import React from 'react'

const page = () => {
  return (
    <section className='custom_container mt-10'>

    <ImageTextSec imgSrc= {aboutUs.image} imgAlt= { aboutUs.imageAlt } text={aboutUs.text} title= {aboutUs.title} />
    </section>
  )
}

export default page