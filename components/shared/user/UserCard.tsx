import { Card } from '@/components/ui/card'
import { UserStatus } from '@/lib/Constants'
import { IUser } from '@/lib/database/models/user.model'
import Image from 'next/image'
import Link from 'next/link'
import UserCardInfo from './UserCardInfo'



const UserCard = ({ user }: { user: IUser }) => {
  return (
    <Link key={user._id} href={`/admin/seekers/${user._id}`}>
      <Card key={user._id} className='p-5 w-full shadow-md hover:shadow-lg transition-all bg-hero_BG/25 hover:ring-1 ring-hero_BG/50'>
        <UserCardInfo user={user} />
      </Card>
    </Link>
  )
}

export default UserCard