import { findBlogById } from '@/lib/Blog'
import React from 'react'

type segmentItem = {
    heading?: string,
    text?: string,
    segments?: segmentItem[],
    list?: segmentItem[],
}
// write the segment
const writeSegment = (segments: segmentItem[]) => {
    return (
        <>
            {segments.map((seg, index) => (
                <div key={index} className='ml-3 flex flex-col gap-4'>
                    {seg.heading && <h3 className='h3'> {seg.heading} </h3>}
                    {seg.text && <p className='regularText'> {seg.text} </p>}
                    {seg.segments && writeSegment(seg.segments)}
                    {seg.list && writelist(seg.list)}
                </div>
            ))}
        </>
    )
}

// write list items
const writelist = (list: segmentItem[]) => {
    return (
        <ul className='list-disc ml-3 flex flex-col gap-3'>

            {list.map((seg, index) => (
                <li key={index}>
                    {seg.heading && <h4 className='h4'> {seg.heading} </h4>}
                    {seg.text && <p className='regularText'> {seg.text} </p>}
                    {seg.segments && writeSegment(seg.segments)}
                    {seg.list && writelist(seg.list)}
                </li>
            ))}
        </ul>
    )
}

const page = ({ params: { id } }: { params: { id: string } }) => {
    const blog = findBlogById(id)
    console.log({ id: id, blo: blog })

    return (
        <section className='custom_container'>
            <div className='flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 mt-10'>
                {blog &&
                    <h2 className='h2 text-center'>{blog.title}</h2>
                }
                <div className='flex flex-col gap-4'>
                    {blog && writeSegment(blog.segments)}
                </div>
            </div>
        </section>
    )
}

export default page