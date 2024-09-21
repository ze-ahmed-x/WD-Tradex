'use client'

import { Button } from "@/components/ui/button"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

const BackButton = () => {
    const router = useRouter()
  return (
    <Button variant={"outline"} onClick={() => {
        router.back()
    }}> <span className='flex flex-row gap-2 items-center'> <ChevronLeftIcon /> <p>Back</p> </span>
    </Button>
  )
}

export default BackButton