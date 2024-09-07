import ProjectForm from '@/components/shared/project/ProjectForm'
import { getProjectById } from '@/lib/database/actions/project.action'
import { IProject } from '@/lib/database/models/project.model'
import React from 'react'

type pageProps = {
    params: {id:string}
}

const page = async ({params: {id}} : pageProps) => {
  const project = await getProjectById(id) as IProject
  return (
    <>
    { project? 
    (
    <section className='custom_container mt-10 min-h-screen'>
      <div className='flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
        <div className='flex flex-col items-center sm:gap-2'>
          <h2 className="h2"> Projects </h2>
          <p className="subText" > Edit the project </p>
        </div>
      </div>
      <ProjectForm type='edit' _id= {project._id} project={project} />
    </section>

    ) : (
      <section className='custom_container mt-10 min-h-screen'>
        <h4 className='h4 text-center'>Oh uh! something went wrong</h4>
      </section>
    )

    }
    </>
  )
}

export default page