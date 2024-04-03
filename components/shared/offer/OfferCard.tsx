import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type offerProps = {
    imageSrc: string,
    imageAlt: string,
    title: string,
    description: string,
    buttonLabel: string,
    route: string
}

const OfferCard = ({
    imageSrc,
    imageAlt,
    title,
    description,
    buttonLabel,
    route
}: offerProps) => {
    return (
        <Card className='bg-hero_BG shadow-md'>
            <CardContent>
                <div className='flex flex-col sm:flex-row gap-4  items-center p-4'>
                    <div className='min-w-16'>
                        <Image src={imageSrc} alt={imageAlt} height={72} width={72} />
                    </div>
                    <div className='flex flex-col gap-2 sm:gap-4'>
                        <div className='flex flex-col items-center sm:items-start sm:gap-2'>
                            <h3 className='h3'> {title}</h3>
                            <p className='subText'> {description} </p>
                        </div>
                        <Button asChild className='sm:w-fit'>
                            <Link href={route}> {buttonLabel} </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default OfferCard