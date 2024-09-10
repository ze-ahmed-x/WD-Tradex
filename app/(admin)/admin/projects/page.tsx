import ProjectCard from '@/components/shared/project/ProjectCard'
import { Button } from '@/components/ui/button'
import { getAllProjects } from '@/lib/database/actions/project.action'
import { IProject } from '@/lib/database/models/project.model'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const projects = await getAllProjects() as IProject[];
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
        {(projects && projects.length > 0) ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-7 md:gap-9'>
            {projects && projects.map((proj) => (
              <ProjectCard key={proj._id} _id={proj._id} collaboratingEntityName={proj.collaboratingEntityName!} country={proj.country} title={proj.title} totalJobs={proj.totalJobs!} totalVacancies={proj.totalVacancies!} status= {proj.status} />
            ))
            }
          </div>
        ) : (
          <section className='custom_container mt-10 min-h-screen'>
            <h4 className='h4 text-center'>There are no projects so far</h4>
          </section>
        )}
      </div>
    </section>
  )
}

export default page