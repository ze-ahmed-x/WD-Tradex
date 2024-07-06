import ImageTextSec from '@/components/shared/ImageTextSec'
import { aboutUs } from '@/lib/Constants'
import React from 'react'
import Loading from '../loading'

const page = () => {
  return (
    <section className='custom_container mt-10 min-h-screen'>

    <ImageTextSec imgSrc= {aboutUs.image} imgAlt= { aboutUs.imageAlt } text={aboutUs.text} title= {aboutUs.title} />
    </section>
  )
}

export default page