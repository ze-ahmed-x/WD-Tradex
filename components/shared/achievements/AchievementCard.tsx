import { Card, CardContent } from '@/components/ui/card'
import { blochistanGovt } from '@/public'
import Image from 'next/image'

const AchievementCard = ({img, title, description} : {img:string, title: string, description: string}) => {
  return (
    <Card className='bg-hero_BG shadow-md'>
                <div className='flex flex-col sm:flex-row gap-4  items-center p-4'>
                    <div className='min-w-16'>
                        <Image src={img} alt= 'Blochistan Govt' height={72} width={72} />
                    </div>
                    <div className='flex flex-col gap-2 sm:gap-4'>
                        <div className='flex flex-col items-center sm:items-start sm:gap-2'>
                            <h3 className='h4'> {title}</h3>
                            <p className='subText'> {description} </p>
                        </div>
                    </div>
                </div>
        </Card>
  )
}

export default AchievementCard