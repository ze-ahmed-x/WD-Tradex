import { achievements } from "@/lib/Constants"
import AchievementCard from "./AchievementCard"

const Achievements = () => {
  return (
    <div className='custom_container flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
            <div className='flex flex-col items-center sm:gap-2'>
                <h2 className='h2'> {achievements.title} </h2>
                <p className='subText'> {achievements.sub_text} </p>
            </div>
            {/* <div className='flex justify-between gap-4 lg:gap-20 flex-wrap'> */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-20'>
                {achievements.data.map((ach, index) => (
                    <AchievementCard key={index} img= {ach.img} title= {ach.title} description= {ach.description} />
                ))}
            </div>
        </div>
  )
}

export default Achievements