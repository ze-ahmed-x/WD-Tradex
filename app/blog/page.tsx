import BlogCard from '@/components/shared/blog/BlogCard'
import { blogArray } from '@/lib/Blog'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: "Blog"
}

const page = () => {
  return (
    <section className='custom_container mt-10'>
        <div className='flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8'>
            <h2 className='h2 text-center'>Blogs</h2>
            <div className='flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8'>
                { blogArray.map( blog => (
                    <BlogCard key={blog._id} imgSrc= { blog.thumbnail} imgAlt= { blog.thumbnailAlt } blogId= { blog._id } blogTitle= { blog.title } />
                )) }
            </div>
        </div>
    </section>
  )
}

export default page