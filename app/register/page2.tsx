'use client'
import { UploadButton } from '@/lib/uploadthing'
import { underConstructionImage } from '@/public'
import Image from 'next/image'
import React from 'react'
import { UploadDropzone } from "@uploadthing/react";
 
import { OurFileRouter } from "../api/uploadthing/core";


const page = () => {
  return (
    <section className='custom_container mt-10 min-h-screen'>
        <div className='flex items-start justify-center'>
            {/* <Image src = { underConstructionImage.src} alt='underConstruction' height={729} width={972} /> */}

            {/* Upload image default button */}
            {/* <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
              }}
                onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            /> */}
           

        </div>
    </section>
  )
}

export default page