import { Button } from "@/components/ui/button";
import { getAllOpenJobs, getJobbyId } from "@/lib/database/actions/job.actions";
import { IJob } from "@/lib/database/models/job.model";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Country, State, City } from "country-state-city";
import { JobStatus } from "@/lib/Constants";
import { Separator } from "@/components/ui/separator";
import BackButton from "@/components/shared/job/BackButton";
import AddRequirement from "@/components/shared/job/AddRequirement";
import EditRequirement from "@/components/shared/job/EditRequirement";
import DeleteRequirement from "@/components/shared/job/DeleteRequirement";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import { cache } from "react";
import { JobSearchResult } from "@/types";

type pageProps = {
  params: { jobId: string}
}

// Below function will return array of Ids i.e. possible values for jobId. It will pre render it and make it static.
// It only execute on build time
// But should we do this? I guess not
// If you have implimented this and there comes a new id, than after first fetch nextjs will cache it as well
// However if you edit? than it will keep showing the old i guess
// export async function generateStaticParams() {
//   const jobs = await getAllOpenJobs({ query: '', category: '', subCategory: '', country: '', limit: 20, page: 1 }) as JobSearchResult
//   return jobs.jobs.map(job => job._id)
// }

// manually deduplicate data fetching/ request/ API if not using fetch (Nextjs automatically deduplicates fetch)
const getJob = cache(async (jobId: string) => {
  return await getJobbyId(jobId)
})


export async function generateMetadata ({params: {jobId}} : pageProps): Promise<Metadata> {
  const job = await getJob(jobId) as IJob;
  return {
    title: job.title,
    description:job.title + ' ' + job.country + ' ' + job.professionCatName + ' ' + job.professionSubCatName
    // openGraph: {
    //   images: [{
    //     url: 'some url'
    //   }]
    // }
  }
}

const page = async ({params: {jobId}} : pageProps) => {
  const job = await getJob(jobId) as IJob;
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
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 mt-10'>
            <h3 className='h4'>Country: <span className='regularText font-normal'> {job.country? Country.getCountryByCode(job.country)?.name: 'N/A'} </span> </h3>
            <h3 className='h4'>vacancies: <span className='regularText font-normal'> {job.vacancies} </span> </h3>
            <h3 className='h4'>Category: <span className='regularText font-normal'> {job.professionCatName} </span> </h3>
            <h3 className='h4'>Sub Category: <span className='regularText font-normal'> {job.professionSubCatName} </span> </h3>
            <h3 className='h4'>State: <span className='regularText font-normal'> {(job.state && job.country)? State.getStateByCodeAndCountry(job.state, job.country)?.name : 'N/A'} </span> </h3>
            <h3 className='h4'>City: <span className='regularText font-normal'> { job.city? job.city: 'N/A'} </span> </h3>
            <h3 className='h4'>Status: <span className={`regularText font-normal ${
               job.status === JobStatus.OPEN? 'text-green-500' :
               'text-red-500' }`}> {job.status[0].toUpperCase().concat(job.status.slice(1))} </span> </h3>
          </div>
          <Separator className='mt-5 mb-5' />
            <h3 className="mb-5 text-center h4">Job Requirements</h3>
          
          {job.requirements && job.requirements.length > 0 ?
            (<section className='flex flex-col items-center w-full gap-5 mt-8 '>
              {/* larg screen view */}
              <div className="hidden sm:grid grid-cols-8 gap-y-2 w-full">
                <h3 className="h4 text-center">Ser</h3>
                <h3 className="h4 col-span-6">Descriptioin</h3>
                <h3 className="h4 text-center">Mandatory</h3>
              </div>
              { job.requirements.map((req, index) => (
                <div key={req._id} className="hidden sm:grid grid-cols-8 gap-y-2 w-full">
                  <p className="normalText text-center">{index +1}</p>
                  <p className="normalText col-span-6">{req.description}</p>
                  <p className={`normalText text-center ${req.optionalFlag? 'text-green-500': 'text-red-500'}`}>{req.optionalFlag? 'No' : 'Yes'}</p>
                </div>
                ))
                }
                {/* Mobile view */}
                { job.requirements.map((req, index) => (
                  <Card key={req._id} className="p-3 w-full sm:hidden">
                  <p className="normalText"> {`${index+1}. ` }<span className="font-semibold">{req.description}</span></p>
                  <p className="normalText font-semibold">Mandatory: <span className={`font-normal 
                    ${req.optionalFlag? 'text-green-500': 'text-red-500'}`}>{req.optionalFlag? 'No' : 'Yes'}</span></p>
                  </Card>
                ))

                }
            </section>) : (
              <section className='mt-10'>
                <h4 className='h4 text-center'>There are no particular job requirements mentioned as such</h4>
            </section>
            )
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