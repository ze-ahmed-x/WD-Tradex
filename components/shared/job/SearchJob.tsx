'use client'
import React from 'react'
import InputSearch from '../common/InputSearch'
import CategorySearch from '../common/CategorySearch'
import CountrySearch from '../common/CountrySearch'

const SearchJob = () => {
  return (
    <div className='bg-hero_BG rounded-xl shadow-md border-black p-5 hidden sm:flex flex-col gap-4'>
      <h4 className='h4 text-center underline text-primary'>Filters</h4>
    <InputSearch lebal='Search' placeholder='Job Description' searchKey='query' />
    <CategorySearch />
    <CountrySearch />
  </div>
  )
}

export default SearchJob