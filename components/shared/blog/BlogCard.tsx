import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type blogPorps = {
  imgSrc: string
  imgAlt: string
  blogId: string
  blogTitle: string
}

const BlogCard = ({ imgSrc, imgAlt, blogId, blogTitle } : blogPorps) => {
  return (
    <Link href= {`/blog/${blogId}`}>
      <Card className='hover:shadow-lg transition-shadow pt-6'>
        <CardContent>
          <div className='flex flex-col items-center sm:flex-row gap-4 sm:gap-6'>
            <div>
              <Image src={imgSrc} alt={imgAlt} height={150} width={200} className='rounded-md'/>
            </div>
            <div>
              <h3 className='h3 text-center'> { blogTitle } </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default BlogCard