import Image from 'next/image'
import { hero } from '@/public'
import { contactInfo } from '@/lib/Constants'
import { DrawingPinIcon, MobileIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const Hero = () => {
    return (
        <div className='bg-hero_BG'>
            <div className='custom_container flex flex-col sm:flex-row items-center sm:justify-between gap-6 py-5'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <h3 className='h3'>Leading Manpower Recruitment Agency of Pakistan</h3>
                        <h1 className='h1'>Simplify Global<br />Talent Management:</h1>
                        <h1 className='h1 text-primary'>Expert HR Export<br />Services</h1>
                        <p className='subText'>The Complete HR Export Solution</p>
                    </div>
                    {/* <div className='flex flex-col sm:grid sm:grid-cols-3 sm:overflow-auto gap-2'> */}
                    <div className='flex flex-col sm:flex-row gap-2'>
                        <div className='flex gap-2 items-center'>
                            <DrawingPinIcon className='text-primary min-w-8 sm:size-6' />
                            <p className='regularText sm:max-w-[17ch]'>{contactInfo.address}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <MobileIcon className='text-primary min-w-8 sm:size-6' />
                            <div className='flex flex-col'>

                            {contactInfo.phone.map((val, index) => (
                                <p key={index} className='regularText'>{val}</p>
                            ))
                        }
                        </div>
                            {/* <p className='regularText'>{contactInfo.phone}</p> */}
                        </div>
                        <div className='flex gap-2 items-center'>
                            <EnvelopeClosedIcon className='text-primary min-w-8 sm:size-6' />
                            <p className='regularText'>{contactInfo.email}</p>
                        </div>
                    </div>
                    <Button asChild className='sm:w-fit'>
                        <Link href='#contact'>Drop a Message</Link>
                    </Button>
                </div>
                <div>
                    <Image src={hero.src} alt='hero'
                        height={306} width={450}
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero