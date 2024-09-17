import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Separator } from '@/components/ui/separator'
import { userStatus } from '@/lib/Constants'
import { findDetailedUserById } from '@/lib/database/actions/user.action'
import { formatDate } from '@/lib/utils'
import { getStateByCodeAndCountry } from 'country-state-city/lib/state'
import { getServerSession } from 'next-auth'


const ProfileDetail = async () => {
  const session = await getServerSession(authOptions)
  const user = await findDetailedUserById(String(session?.user.id))

  return (
    <main>
      {user && (
        <div className='flex flex-col gap-4'>
          <section>
            <h3 className='h4 underline mb-3'>Basic:</h3>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-3'>
              <h4 className='regularText font-semibold'>First Name: <span className='regularText font-normal'> {user.firstName} </span></h4>
              <h4 className='regularText font-semibold'>Last Name: <span className='regularText font-normal'> {user.lastName}</span></h4>
              <h4 className='regularText font-semibold'>Profession: <span className='regularText font-normal'> {user.profession}</span></h4>
              <h4 className='regularText font-semibold'>Yrs of Experience: <span className='regularText font-normal'> {user.yearsOfExperience}</span></h4>
              <h4 className='regularText font-semibold'>Category: <span className='regularText font-normal'> {user.professionCat}</span></h4>
              <h4 className='regularText font-semibold'>Sub Category: <span className='regularText font-normal'> {user.professionSubCat}</span></h4>
              <h4 className='regularText font-semibold'>CNIC: <span className='regularText font-normal'> {user.cnic}</span></h4>
              <h4 className='regularText font-semibold'>Email: <span className='regularText font-normal'> {user.email}</span></h4>
              <h4 className='regularText font-semibold'>Gender: <span className='regularText font-normal'> {user.gender}</span></h4>
              <h4 className='regularText font-semibold'>DOB: <span className='regularText font-normal'> {formatDate(user.dob)}</span></h4>
              <h4 className='regularText font-semibold'>Marital Status: <span className='regularText font-normal'> {user.maritalStatus}</span></h4>
              <h4 className='regularText font-semibold'>You are: <span className='regularText font-normal'> {userStatus[user.status as keyof typeof userStatus]}</span></h4>
              <h4 className='regularText font-semibold'>Religion: <span className='regularText font-normal'> {user.religion}</span></h4>
              <h4 className='regularText font-semibold'>Domicile Province: <span className='regularText font-normal'> { getStateByCodeAndCountry(user.domicileProvince, "PK")?.name}</span></h4>
              <h4 className='regularText font-semibold'>Domicile City: <span className='regularText font-normal'> {user.domicileCity}</span></h4>
            </div>
          </section>
          <Separator />
          <section>
            <h3 className='h4 underline mb-3'>Address:</h3>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-3'> 
            <h4 className="h4 text-center col-span-2 md:col-span-3">Current Address</h4>
              <h4 className='regularText font-semibold col-span-2 md:col-span-3'>Current Address: <span className='regularText font-normal'> {user.cAddress}</span></h4>
              <h4 className='regularText font-semibold'>City: <span className='regularText font-normal'> {user.cCity}</span></h4>
              <h4 className='regularText font-semibold'>Province: <span className='regularText font-normal'> { getStateByCodeAndCountry(user.cProvince, "PK")?.name}</span></h4>
              <h4 className="h4 text-center col-span-2 md:col-span-3">Pernament Address</h4>
              <h4 className='regularText font-semibold col-span-2 md:col-span-3'>Address: <span className='regularText font-normal'> {user.pAddress}</span></h4>
              <h4 className='regularText font-semibold'>City: <span className='regularText font-normal'> {user.pCity}</span></h4>
              <h4 className='regularText font-semibold'>Province: <span className='regularText font-normal'> {getStateByCodeAndCountry(user.pProvince, "PK")?.name}</span></h4>
              </div>
              </section>
              <Separator />

        </div>

      )}
    </main>
  )
}

export default ProfileDetail