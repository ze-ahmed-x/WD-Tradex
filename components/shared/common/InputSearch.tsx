'use client'

import { Input } from "@/components/ui/input"
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export type SearchProps = {
    lebal: string,
    searchKey: string,
    placeholder: string
}

const InputSearch = ({searchKey, lebal, placeholder} : SearchProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState('')
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let newUrl = ''
            if(query) {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['page'],
                    key: searchKey,
                    value: query
                })
            }
            else {
                newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: [searchKey],
                })
            }
            router.push(newUrl, {scroll: false});
        }, 300);
        return ()=> clearTimeout(delayDebounceFn)
    }, [query, router, searchParams, searchKey])
  return (
    <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        <h4 className="normalText font-semibold"> {lebal} </h4>
        <Input type="text" placeholder= {placeholder} onChange={(e) => setQuery(e.target.value)} className="bg-background" />
    </div>
  )
}

export default InputSearch