'use client'
import React, { useEffect, useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { defaultSignupValues, SignupSchema } from '@/lib/FormSchemas/signup'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Gender, listOfReligions, MaritalStatus } from '@/lib/Constants'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { State, City, ICity } from 'country-state-city';



const SignupForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: defaultSignupValues,
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof SignupSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const GenderValues = Object.entries(Gender).filter(([key]) => isNaN(Number(key)))
    // console.log(listOfReligions)
    // console.log(State.getStatesOfCountry('PK'))
    // *Feth Categories
    // const professionCategories = useRef<Icategory[]>([])
    const pCategoryFormValue = form.watch().professionCat;
    const [pSubCatFormDisabled, setpSubCatFormDisabled] = useState(true);
    // const [pSubCategories, setpSubCategories] = useState<IsubCategory[]>([])
    //initial category fetch 
    useEffect(() => {
        console.log("I only ran once!");
      }, []);
    useEffect (()=>{
        // const getProfessionCategories = async () => {
        //     // await createCategory();
        //     const categoriesList = await getAllCategories() as Icategory[];
        //     if (categoriesList) {
        //          professionCategories.current = categoriesList as Icategory[];
        //     }
        // }
        // getProfessionCategories();
        
    }, [])
    // sub category fetch
    // useEffect (()=> {
    //     if (pCategoryFormValue) {
    //         setpSubCatFormDisabled(false)
    //         // const currentCategory = professionCategories.current.find((val) => val._id.toString().match(pCategoryFormValue));
    //         setpSubCategories(currentCategory?.subCategories || []);
    //     }
    // }, [pCategoryFormValue])
    // *Current Address
    const cProvince = form.watch().cProvince
    const [cCityDisable, setcCityDisable] = useState(true)
    const [cCityList, setCityList] = useState<ICity[]>([])
    useEffect(() => {
        if (!!cProvince) {
            setcCityDisable(false)
            setCityList(City.getCitiesOfState('PK', cProvince))
            console.log("Enabling cities: Province Value: " + cProvince)
        }

    }, [cProvince])
    // *Permanent address
    const pProvince = form.watch().pProvince
    const [pCityDisable, setpCityDisable] = useState(true)
    const [pCityList, setpCityList] = useState<ICity[]>([])
    useEffect(() => {
        if (!!pProvince) {
            setpCityDisable(false)
            setpCityList(City.getCitiesOfState('PK', pProvince))
            console.log("Enabling cities: Province Value: " + pProvince)
        }

    }, [pProvince])

    return (
        <Card className='bg-hero_BG shadow-md p-5 sm:p-10 w-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="First Name" {...field} className="bg-background" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Last Name" {...field} className="bg-background" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cnic"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>CNIC (without dashes)</FormLabel>
                                <FormControl>
                                    <Input placeholder="4567898765431" {...field} className="bg-background" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmCnic"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Confirm CNIC (without dashes)</FormLabel>
                                <FormControl>
                                    <Input placeholder="4567898765431" {...field} className="bg-background" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Mobile Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="03334545454" {...field} className="bg-background" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="abc@gmail.com" {...field} className="bg-background" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Gender</SelectLabel>
                                                {Object.entries(Gender).filter(([key]) => isNaN(Number(key))).map((val, index) => (
                                                    <SelectItem key={index} value={val[0]}>{val[0][0].toUpperCase() + val[0].slice(1)}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                    <div className=
                                        "flex items-center h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-background focus:ring-1 focus:ring-red-400"
                                    >
                                        <DatePicker
                                            selected={field.value} onChange={(date: Date) => field.onChange(date)}
                                            showIcon
                                            dateFormat="dd/MM/yyyy"
                                            wrapperClassName="datePicker"
                                            minDate={new Date(1950, 1, 1)}
                                        />
                                    </div>

                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="maritalStatus"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Marital Status</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} >
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Marital Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Marital Status</SelectLabel>
                                                {Object.entries(MaritalStatus).filter(([key]) => isNaN(Number(key))).map((val, index) => (
                                                    <SelectItem key={index} value={val[0]}>{val[0][0].toUpperCase() + val[0].slice(1)}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="religion"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Religion</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Select Religion" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Religion</SelectLabel>
                                                {listOfReligions.map((val, index) => (
                                                    <SelectItem key={index} value={val}>{val[0].toUpperCase() + val.slice(1)}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* current address */}
                    <p className='subText col-span-2 md:col-span-4'>Current Address</p>
                    <FormField
                        control={form.control}
                        name="cAddress"
                        render={({ field }) => (
                            <FormItem className='col-span-2 md:col-span-4'>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="House # 1, Street #2, xyz town/colony" {...field} className="bg-background" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cProvince"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Province</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Select Province" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Province</SelectLabel>
                                                {State.getStatesOfCountry('PK').map((val, index) => (
                                                    <SelectItem key={index} value={val.isoCode}>{val.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cCity"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} disabled={cCityDisable}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Select City" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>City</SelectLabel>
                                                {cCityList.map((val, index) => (
                                                    <SelectItem key={index} value={val.name}>{val.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* permanent address */}
                    <p className='subText col-span-2 md:col-span-4'>Permanent Address</p>
                    <FormField
                        control={form.control}
                        name="pAddress"
                        render={({ field }) => (
                            <FormItem className='col-span-2 md:col-span-4'>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="House # 1, Street #2, xyz town/colony" {...field} className="bg-background" />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pProvince"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Province</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Select Province" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Province</SelectLabel>
                                                {State.getStatesOfCountry('PK').map((val, index) => (
                                                    <SelectItem key={index} value={val.isoCode}>{val.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pCity"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} disabled={pCityDisable}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Select City" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>City</SelectLabel>
                                                {pCityList.map((val, index) => (
                                                    <SelectItem key={index} value={val.name}>{val.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className='subText col-span-2 md:col-span-4'>Profession</p>
                    <FormField
                        control={form.control}
                        name="profession"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Profession</FormLabel>
                                <FormControl>
                                    <Input placeholder="Profession" {...field} className="bg-background" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /><FormField
                    control={form.control}
                    name="yearsOfExperience"
                    render={({ field }) => (
                        <FormItem className='col-span-2'>
                            <FormLabel>Years of Experience</FormLabel>
                            <FormControl>
                                <Input placeholder="No of years" {...field} className="bg-background" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* category */}
                <FormField
                        control={form.control}
                        name="pProvince"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Select Province" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Province</SelectLabel>
                                                {State.getStatesOfCountry('PK').map((val, index) => (
                                                    <SelectItem key={index} value={val.isoCode}>{val.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className='col-span-2 md:col-start-2' type="submit">Submit</Button>
                </form>
            </Form>
        </Card>
    )
}

export default SignupForm