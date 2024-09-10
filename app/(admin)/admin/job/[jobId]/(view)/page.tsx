import { Button } from "@/components/ui/button";
import { getJobbyId } from "@/lib/database/actions/job.actions";
import { IJob } from "@/lib/database/models/job.model";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Country, State, City } from "country-state-city";
import { JobStatus } from "@/lib/Constants";
import { Separator } from "@/components/ui/separator";
import BackButton from "@/components/shared/job/BackButton";
import AddRequirement from "@/components/shared/job/AddRequirement";

type pageProps = {
  params: { id: string; jobId: string}
}

const page = async ({params: {id, jobId}} : pageProps) => {
  const job = await getJobbyId(jobId) as IJob;
  return (
    <>
      {job ?
        (<section className='custom_container mt-10 min-h-screen'>
          <div className='flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
            <div className='flex flex-col items-center sm:gap-2'>
              <h2 className="h2 text-center"> {job.title.toUpperCase()} </h2>
              <p className="subText" > {job.description} </p>
            </div>
          </div>
          <div className='flex justify-between mt-5 mb-5'>
            <BackButton />
            <Button variant='outline' asChild>
              <Link href={`/admin/job/${job._id}/edit`} >
                <span className='flex flex-row gap-2 items-center'> <Pencil2Icon /> <p>Edit</p> </span>
              </Link>
            </Button>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 mt-10'>
            <h3 className='h4'>Country: <span className='regularText font-normal'> {job.country? Country.getCountryByCode(job.country)?.name: 'N/A'} </span> </h3>
            <h3 className='h4'>vacancies: <span className='regularText font-normal'> {job.vacancies} </span> </h3>
            <h3 className='h4'>State: <span className='regularText font-normal'> {(job.state && job.country)? State.getStateByCodeAndCountry(job.state, job.country)?.name : 'N/A'} </span> </h3>
            <h3 className='h4'>City: <span className='regularText font-normal'> { job.city? job.city: 'N/A'} </span> </h3>
            <h3 className='h4'>Status: <span className={`regularText font-normal ${
               job.status === JobStatus.OPEN? 'text-green-500' :
               'text-red-500' }`}> {job.status[0].toUpperCase().concat(job.status.slice(1))} </span> </h3>
          </div>
          <Separator className='mt-5 mb-5' />
          <div className='flex justify-center sm:justify-end'>
            { job.status === JobStatus.OPEN? (

            <AddRequirement jobId= {job._id} />
            ) : (
              <Button asChild variant={'secondary'} disabled={true}>
                <span className='flex flex-row gap-2 items-center cursor-not-allowed opacity-50'> <p>Add Requirement</p> </span>
            </Button>
            )

            }
          </div>
          {job.requirements && job.requirements.length > 0 &&
            <section className='flex flex-col items-center w-full gap-5 mt-8 '>
              <div className="flex flex-row items-center justify-between">
                <h3 className="mr-1 h4 text-center">Descriptioin</h3>
                <h3 className="ml-1 h4 text-center">Mandatory</h3>
                <h3 className="ml-1 h4 text-center">Edit</h3>
                <h3 className="ml-1 h4 text-center">Delete</h3>
              </div>
            </section>
          }
        </section>) : (
          <section className='custom_container mt-10 min-h-screen'>
            <h4 className='h4 text-center'>Oh uh! something went wrong</h4>
          </section>
        )}
    </>
  )
}

export default page