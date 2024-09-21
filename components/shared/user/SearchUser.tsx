import React from 'react'
import InputSearch from '../common/InputSearch'
import CategorySearch from '../common/CategorySearch'
import StatusBasedSearch from '../common/StatusBasedSearch'

const SearchUser = () => {
  return (
    <div className='bg-hero_BG rounded-xl shadow-md border-black p-5 flex flex-col gap-4 sm:w-80'>
      <h4 className='h4 text-center underline text-primary'>Filters</h4>
    <InputSearch lebal='User Name' placeholder='User name' searchKey='username' />
    <InputSearch lebal='User Id' placeholder='1001' searchKey='userId' />
    <CategorySearch />
    <StatusBasedSearch />
  </div>
  )
}

export default SearchUser