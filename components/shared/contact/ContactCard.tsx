import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { contactInfo, homeContactInfo } from "@/lib/Constants"
import Image from "next/image"
import { DrawingPinIcon, MobileIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { mailBox } from "@/public"
import ContactForm from "./ContactForm"

const ContactCard = () => {
    return (
<Card className='bg-hero_BG shadow-md p-10'>
            <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 sm:justify-between">
                    <div className="flex flex-col gap-4 sm:gap-8 sm:w-1/2">
                        <h3 className="h3"> {homeContactInfo.description} </h3>
                        <div className="flex flex-col gap-2 sm:gap-4">
                            <div className="flex gap-2 sm:gap-4 items-center">
                                <div>
                                    <DrawingPinIcon className="text-primary size-4 sm:size-6" />
                                </div>
                                <p className="regularText sm:max-w-[25ch]"> {contactInfo.address} </p>
                            </div>
                            <div className="flex gap-2 sm:gap-4 items-center">
                                <div>
                                    <MobileIcon className="text-primary size-4 sm:size-6" />
                                </div>
                                <p className="regularText sm:max-w-[25ch]"> {contactInfo.phone} </p>
                            </div>
                            <div className="flex gap-2 sm:gap-4 items-center">
                                <div>
                                    <EnvelopeClosedIcon className="text-primary size-4 sm:size-6" />
                                </div>
                                <p className="regularText sm:max-w-[25ch]"> {contactInfo.email} </p>
                            </div>
                            <div className="hidden sm:block">
                                <Image src={mailBox.src} alt="mailbox" height={250} width={250} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 sm:gap-8 sm:w-1/2">
                        <h3 className="h3">Send Message</h3>
                        <ContactForm />

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ContactCard