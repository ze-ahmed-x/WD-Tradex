import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getAllOpenJobs } from '@/lib/database/actions/job.actions'
import { IJob } from '@/lib/database/models/job.model'
import { JobSearchResult, SearchParamProps } from '@/types'
import { Country, City, State } from 'country-state-city'
import Link from 'next/link'
import React, { Suspense } from 'react'
import Loading from '../loading'
import Pagination from '@/components/shared/common/Pagination'
import SearchJob from '@/components/shared/job/SearchJob'

const page = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1
  const query = searchParams?.query as string || ''
  const category = searchParams?.cat as string || ''
  const subCategory = searchParams?.subCat as string || ''
  const country = searchParams?.country as string || ''


  const jobs = await getAllOpenJobs({ query: query, category: category, subCategory: subCategory, country: country, limit: 2, page: page }) as JobSearchResult
  //  console.log(jobs.jobs[0].professionSubCatDetail)
  //  console.log(jobs.jobs[0].professionSubCat)
  return (
    <section className='custom_container mt-10 min-h-screen'>
      <div className='flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
        <div className='flex flex-col items-center sm:gap-2'>
          <h2 className="h2"> Jobs </h2>
          <p className="subText" > List of available jobs </p>
        </div>
        <Separator />
        {/* <section className='md:grid grid-cols-4 w-full'> */}
        <section className='flex gap-5 w-full'>
          <SearchJob />
          {/* <div className='col-span-3 p-3'> */}
          <div className='w-full'>
            {/* <Suspense fallback= { <Loading />}> */}
            <Suspense fallback={<Loading />}>
              {
                jobs.jobs ?
                  (<div className='flex flex-col gap-4'>
                    {(jobs.jobs.map((jb, index) => (
                      <Link key={jb._id} href={`/jobs/${jb._id}`}>
                        <Card key={jb._id} className='p-5 w-full shadow-md hover:shadow-lg transition-all bg-hero_BG/25 hover:ring-1 ring-hero_BG/50 flex flex-col gap-3'>
                          <h4 className='h4'> {jb.title} </h4>
                          <p className='normalText font-semibold'> Vacancies <span className='font-normal'> {jb.vacancies} </span></p>
                          <p className='normalText font-semibold'> Country <span className='font-normal'> {jb.country ? Country.getCountryByCode(jb.country)?.name : 'N/A'} </span></p>
                          <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
                            <p className='normalText font-semibold'> State/ Porvince <span className='font-normal'> {jb.state ? State.getStateByCodeAndCountry(jb.state, jb.country!)?.name : 'N/A'} </span></p>
                            <p className='normalText font-semibold'> City <span className='font-normal'> {jb.city ? jb.city : 'N/A'} </span></p>
                          </div>
                          <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
                            <p className='normalText font-semibold'> Category <span className='font-normal'> {jb.professionCatName} </span></p>
                            <p className='normalText font-semibold'> Sub Category <span className='font-normal'> {jb.professionSubCatDetail?.find((sCat) => sCat._id === jb.professionSubCat).subCat} </span></p>
                          </div>
                        </Card>
                      </Link>
                    ))
                    )}
                    
                    {jobs.totalPages > 1 && <Pagination page={page} totalPages={jobs.totalPages} />}
                  </div>) : (
                    <section className='mt-10'>
                      <h4 className='h4 text-center'>There are no jobs so far</h4>
                    </section>
                  )
              }
            </Suspense>
          </div>
        </section>
      </div>
    </section>
  )
}

export default page