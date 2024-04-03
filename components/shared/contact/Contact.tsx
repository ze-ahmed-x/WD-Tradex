import { homeContactInfo } from "@/lib/Constants"
import ContactCard from "./ContactCard"

const Contact = () => {
  return (
    <div className='custom_container flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
        <div className='flex flex-col items-center sm:gap-2'>
            <h2 className="h2"> {homeContactInfo.title} </h2>
            <p className="subText" > {homeContactInfo.sub_text} </p>
        </div>
        <ContactCard />
    </div>
  )
}

export default Contact