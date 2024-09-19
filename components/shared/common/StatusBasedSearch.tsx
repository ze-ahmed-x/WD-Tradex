
'use client'
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { UserStatus } from "@/lib/Constants"
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils"


import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const StatusBasedSearch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState('')

    useEffect (() => {
        let newUrl = ''
        if (status) {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'status',
                value: status,
                keysToRemove: ['page']
            })
        }
        else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['status']
            })
        }
        router.push(newUrl, {scroll: false})
    }, [status])
  return (
    <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            <h4 className="normalText font-semibold">User Status</h4>
            <div>
                <Select onValueChange={(value:string) => {
                    setStatus(value)
                }} value= {status}>
                    <SelectTrigger className="w-full bg-background">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger >
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            {Object.entries(UserStatus).map(([key, value]) => (
                                <SelectItem key={key} value={key} > {value} </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button variant={"ghost"} size={"sm"} className="text-blue-500 underline text-left size-fit"
                disabled= {status? false: true}
                onClick={() => {
                    setStatus('')
                }}
                >Reset status</Button>
            </div>
        </div>
  )
}

export default StatusBasedSearch