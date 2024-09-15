'use client'

import { getAllProfCats } from "@/lib/database/actions/category.actions"
import { IprofCat, IprofSubCat } from "@/lib/database/models/category.model"
import { useEffect, useState } from "react"

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
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

const CategorySearch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [profCategories, setProfCategories] = useState<IprofCat[]>([])
    const [profSubCategories, setProfSubCategories] = useState<IprofSubCat[]>([])
    const [pSubCatFormDisabled, setpSubCatFormDisabled] = useState(true);
    const [selectedCatValue, setSelectedCatValue] = useState('')
    const [selectedSubCatValue, setSelectedSubCatValue] = useState('')
    const [subCatSelectTrigger, setSubCatSelectTrigger] = useState(false)
    //initial category fetch
    useEffect(() => {
        const getProfCats = async () => {
            const catList = await getAllProfCats()
            // console.log(catList)
            if (catList) {
                setProfCategories(catList as IprofCat[]);
                // console.log(profCategories)
            }
        }
        getProfCats();
    }, [])
    // sub category fetch and search params change
    useEffect(() => {
        let newUrl = '';
        console.log("at lease value changed")
        if (selectedCatValue) {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'cat',
                value:selectedCatValue,
                keysToRemove: ['page', 'subCat']
            })
            console.log(newUrl)
            setpSubCatFormDisabled(false)
            const currentCategory = profCategories.find((val) => val._id.toString().match(selectedCatValue));
            setProfSubCategories(currentCategory?.subCats || []);
            if (selectedCatValue) {
                setSelectedSubCatValue('')
            }
        }
        else {
            console.log('removing sub cat and cat')
            setpSubCatFormDisabled(true)
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['subCat', 'cat']
            })
            console.log(newUrl)
            if (selectedCatValue) {
                setSelectedSubCatValue('')
            }
        }
        console.log("Before push")
        console.log(newUrl)
        router.push(newUrl, {scroll: false});
    }, [selectedCatValue])


    useEffect(() => {
        let newUrl = '';
        if (selectedSubCatValue) {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'subCat',
                value:selectedSubCatValue,
                keysToRemove: ['page']
            })
        }
        else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['subCat']
            })
        }
        router.push(newUrl, {scroll: false});
    }, [subCatSelectTrigger])
  return (
    <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
    <h4 className="normalText font-semibold">Category</h4>
    <div>
    <Select onValueChange={(value:string) => setSelectedCatValue(value)} value= {selectedCatValue}>
      <SelectTrigger className="w-full bg-background">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          { profCategories && profCategories.map(cat => (
          <SelectItem key={cat._id} value= {cat._id}> {cat.cat} </SelectItem>
          )) }
        </SelectGroup>
      </SelectContent>
    </Select>
    <div>
        <Button disabled={selectedCatValue? false: true} variant={"ghost"} size={"sm"} className="text-blue-500 underline size-fit" onClick={ () => {
            setSelectedCatValue('');
        }}>Reset Category</Button>
    </div>
    </div>
    <h4 className="normalText font-semibold">Sub Category</h4>
    <div>
    <Select onValueChange={(value:string) => {
        setSelectedSubCatValue(value)
        setSubCatSelectTrigger(!subCatSelectTrigger)}
    } disabled = {pSubCatFormDisabled} value={selectedSubCatValue}>
      <SelectTrigger className="w-full bg-background">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          { profSubCategories && profSubCategories.map(sCat => (
          <SelectItem key={sCat._id} value= {sCat._id}> {sCat.subCat} </SelectItem>
          )) }
        </SelectGroup>
      </SelectContent>
    </Select>
    <div>
        <Button disabled={selectedSubCatValue? false: true} variant={"ghost"} size={"sm"} className="text-blue-500 underline size-fit" onClick={ () => {
            setSelectedSubCatValue('')
            setSubCatSelectTrigger(!subCatSelectTrigger)
            }}>Reset Sub Category</Button>
    </div>
    </div>
    </div>
  )
}

export default CategorySearch