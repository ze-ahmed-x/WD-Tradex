import React from 'react'
type processProps = {
    number: string,
    label: string
}

const ProcessCircle = ({ number, label }: processProps) => {
    return (
        <div className='rounded-full bg-hero_BG border-2 border-primary/70 h-28 w-28 md:h-32 md:w-32 lg:h-[155px] lg:w-[155px] shadow-md
                    flex flex-col items-center justify-between'>
            <div className='bg-background mt-1 h-5 w-5 lg:h-9 lg:w-9 rounded-full mb-auto flex items-center justify-center'>

                <p className='regularText text-center font-medium'>
                    {number}
                </p>
            </div>
            <p className='regularText mx-2 mb-auto text-center place-self-center'>
                {label}
            </p>
        </div>
    )
}

export default ProcessCircle