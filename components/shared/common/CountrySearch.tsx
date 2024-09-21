
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
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils"


import { Country } from "country-state-city"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


const CountrySearch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [country, setCountry] = useState('')

    useEffect (() => {
        let newUrl = ''
        if (country) {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'country',
                value: country,
                keysToRemove: ['page']
            })
        }
        else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['country']
            })
        }
        router.push(newUrl, {scroll: false})
    }, [country])
    return (
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            <h4 className="normalText font-semibold">Country</h4>
            <div>
                <Select onValueChange={(value:string) => {
                    setCountry(value)
                }} value= {country}>
                    <SelectTrigger className="w-full bg-background">
                        <SelectValue placeholder="Select Country" />
                    </SelectTrigger >
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Countries</SelectLabel>
                            {Country.getAllCountries().map((cntry) => (
                                <SelectItem key={cntry.isoCode} value={cntry.isoCode} > {cntry.name} </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button variant={"ghost"} size={"sm"} className="text-blue-500 underline text-left size-fit"
                disabled= {country? false: true}
                onClick={() => {
                    setCountry('')
                }}
                >Reset Country</Button>
            </div>
        </div>
    )
}

export default CountrySearch