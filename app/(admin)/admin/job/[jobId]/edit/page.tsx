import JobForm from "@/components/shared/job/JobForm"
import { getJobbyId } from "@/lib/database/actions/job.actions"
import { IJob } from "@/lib/database/models/job.model"


type pageProps = {
  params: { jobId: string }
}

const page = async ({ params: { jobId } }: pageProps) => {
  const job = await getJobbyId(jobId) as IJob
  return (
    <>
      {job ?
        (
          <section className='custom_container mt-10 min-h-screen'>
            <div className='flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
              <div className='flex flex-col items-center sm:gap-2'>
                <h2 className="h2"> Job </h2>
                <p className="subText" > Update Job </p>
              </div>
            </div>
            <JobForm projectId= {job.projectId} type="update" job={job} />
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