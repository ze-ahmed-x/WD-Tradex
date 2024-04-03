import React from 'react'
import { processInfo } from '@/lib/Constants'
import ProcessCircle from './ProcessCircle'

const Process = () => {
    return (
        <div className='custom_container flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8'>
            <div className='flex flex-col items-center sm:gap-2'>
                <h2 className='h2'> {processInfo.title} </h2>
                <p className='subText'> {processInfo.sub_text} </p>
            </div>
            <div className='flex justify-center gap-4 lg:gap-20 flex-wrap'>
                {processInfo.steps.map(step => (
                    <ProcessCircle key={step.seqNo} number={step.seqNo} label={step.description} />
                ))}
            </div>

        </div>
    )
}

export default Process