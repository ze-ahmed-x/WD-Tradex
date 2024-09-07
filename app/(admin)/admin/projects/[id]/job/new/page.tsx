import JobForm from "@/components/shared/job/JobForm"
import { getProjectById } from "@/lib/database/actions/project.action"

type props = {
  params: {id: string},
}

const page = async ({params: {id}} : props) => {
  //Check the project Id as it can be manupulated from address
  const project = await getProjectById(id)
  return (
    <>
    { project?
      (<section className='custom_container mt-10 min-h-screen'>
            <div className='flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
                <div className='flex flex-col items-center sm:gap-2 w-full'>
                    <h2 className="h2"> Job </h2>
                    <p className="subText" > Create New Job </p>
                    <JobForm type="create" projectId={project._id} />
                </div>
            </div>
        </section>) : (
          <section className='custom_container mt-10 min-h-screen'>
          <h4 className='h4 text-center'>Oh uh! something went wrong</h4>
        </section>
        )
    }
    </>
  )
}

export default page