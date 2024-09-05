import ProjectCard from '@/components/shared/project/ProjectCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <section className='custom_container mt-10 min-h-screen'>
    <div className='flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
        <div className='flex flex-col items-center sm:gap-2'>
            <h2 className="h2"> Projects </h2>
            <p className="subText" > Welcome to the Project Summary Page </p>
        </div>
        <div className='flex justify-end sm:w-full'>
          <Button asChild>
            <Link href={'/admin/projects/new'}> Create New </Link>
          </Button>
        </div>
        <ProjectCard id='24'/>
    </div>
</section>
  )
}

export default page