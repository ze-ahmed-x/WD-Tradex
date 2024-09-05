import ProjectForm from '@/components/shared/project/ProjectForm'
import React from 'react'

const page = () => {
    return (
        <section className='custom_container mt-10 min-h-screen'>
            <div className='flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
                <div className='flex flex-col items-center sm:gap-2 w-full'>
                    <h2 className="h2"> Projects </h2>
                    <p className="subText" > Create New Prject </p>
                    <ProjectForm />
                </div>
            </div>

        </section>
    )
}

export default page