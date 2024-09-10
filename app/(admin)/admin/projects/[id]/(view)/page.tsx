import BackButton from '@/components/shared/job/BackButton'
import JobCard from '@/components/shared/job/JobCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ProjectStatus } from '@/lib/Constants'
import { getAllProfCats } from '@/lib/database/actions/category.actions'
import { getProjectById } from '@/lib/database/actions/project.action'
import { IProject } from '@/lib/database/models/project.model'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Country } from 'country-state-city'
import Link from 'next/link'

type pageProps = {
  params: { id: string }
}


const page = async ({ params: { id } }: pageProps) => {
  const project = await getProjectById(id) as IProject;
  const profCats = await getAllProfCats();
  console.log(profCats)
  return (
    <>
      {project ?
        (<section className='custom_container mt-10 min-h-screen'>
          <div className='flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
            <div className='flex flex-col items-center sm:gap-2'>
              <h2 className="h2 text-center"> {project.title.toUpperCase()} </h2>
              <p className="subText" > {project.description} </p>
            </div>
          </div>
          <div className='flex justify-between mt-5 mb-5'>
          <BackButton />
            <Button variant='outline' asChild>
              <Link href={`/admin/projects/${project._id}/edit`} >
                <span className='flex flex-row gap-2 items-center'> <Pencil2Icon /> <p>Edit</p> </span>
              </Link>
            </Button>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 mt-10'>
            <h3 className='h4'>Sponser: <span className='regularText font-normal'> {project.collaboratingEntityName} </span> </h3>
            <h3 className='h4'>Country: <span className='regularText font-normal'> {Country.getCountryByCode(project.country)?.name} </span> </h3>
            <h3 className='h4'>Type of Jobs: <span className='regularText font-normal'> {project.totalJobs} </span> </h3>
            <h3 className='h4'>vacancies: <span className='regularText font-normal'> {project.totalVacancies} </span> </h3>
            <h3 className='h4'>Status: <span className={`regularText font-normal ${
               project.status === ProjectStatus.OPEN? 'text-green-500' :
               project.status === ProjectStatus.PAUSE? 'text-yellow-500':
               'text-red-500' }`}> {project.status[0].toUpperCase().concat(project.status.slice(1))} </span> </h3>
          </div>
          <Separator className='mt-5 mb-5' />
          <div className='flex justify-center sm:justify-end'>
            { project.status === ProjectStatus.OPEN? (
            <Button asChild>
              <Link  href={`/admin/projects/${project._id}/job/new`} >
                <span className='flex flex-row gap-2 items-center'> <p>Create Job</p> </span>
              </Link>
            </Button>
            ) : (
              <Button asChild variant={'secondary'} disabled={true}>
                <span className='flex flex-row gap-2 items-center cursor-not-allowed opacity-50'> <p>Create Job</p> </span>
            </Button>
            )

            }
          </div>
          {project.jobs && project.jobs.length > 0 &&
            <section className='flex flex-row flex-wrap items-center justify-center gap-7 mt-8 '>
              {project.jobs.map(job => (
                <JobCard key={job._id} _id= {job._id} title= {job.title} city= {job.city? job.city : 'N/A'} professionCat= {profCats.find( (pCat:any) => pCat._id.toString().match(job.professionCat)).cat} projectId= {job.professionCat} state= {job.state? job.state : 'N/A'} status= {job.status} vacancies={job.vacancies} />
              ))}
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