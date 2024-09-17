'use client'
import { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import { Card } from '@/components/ui/card'
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Gender, listOfReligions, MaritalStatus, userStatus } from '@/lib/Constants'
import { getAllProfCats } from '@/lib/database/actions/category.actions'
import { IprofCat, IprofSubCat } from '@/lib/database/models/category.model'
import { baseUserSchema, defaultSignupValues } from '@/lib/FormSchemas/signup'
import { zodResolver } from "@hookform/resolvers/zod"
import { City, ICity, State } from 'country-state-city'
import Link from 'next/link'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useForm } from "react-hook-form"
import { z } from "zod"
// import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { sendMail } from '@/lib/mail'
import { IUser } from '@/lib/database/models/user.model'
import { updateUser } from '@/lib/database/actions/user.action'
import { getStateByCodeAndCountry } from 'country-state-city/lib/state'

type props = {
    user: IUser,
}




const UserUpdateForm = ({ user }: props) => {
    // // email testing
    const { toast } = useToast()
    const router = useRouter();
    // const [defDomCity, setDefDomCity] = useState(user.domicileCity)
    // const [defCCity, setDefCCity] = useState(user.cCity)
    // const [defPCity, setDefPCity] = useState(user.pCity)
    // const [defSubCat, setDefSubCat] = useState(user.professionSubCat)
    // 1. Define your form.
    const form = useForm<z.infer<typeof baseUserSchema>>({
        resolver: zodResolver(baseUserSchema),
        defaultValues: user ? {
            ...user, status: user.status as keyof typeof userStatus,
            gender: Gender.male === user.gender ? Gender.male : Gender.female,
            maritalStatus: user.maritalStatus as MaritalStatus,
            religion: listOfReligions.find((r) => r === user.religion)
        } : defaultSignupValues,
    })
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof baseUserSchema>) {
        const { yearsOfExperience, ...data } = values;
        try {
            const updatedUser = await updateUser(user._id, { ...values, role: String(user.role), yearsOfExperience: yearsOfExperience!, status: String(values.status) });
            if (updatedUser) {
                toast({
                    title: "User has been updated successfully!",
                    description: "In case updated information doesn't show up immediately, try refreshing the page.",
                })
                router.push('/user/profile')
                router.refresh()
            }
            else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Please try again later sometime",
                })
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
            })
        }
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // console.log(values)
    }

    const GenderValues = Object.entries(Gender).filter(([key]) => isNaN(Number(key)))

    // *Feth Categories
    const pCategoryFormValue = form.watch().professionCat;
    const [profCategories, setProfCategories] = useState<IprofCat[]>([])
    const [profSubCategories, setProfSubCategories] = useState<IprofSubCat[]>([])
    const [pSubCatFormDisabled, setpSubCatFormDisabled] = useState(true);
    //initial category fetch
    useEffect(() => {
        const getProfCats = async () => {
            const catList = await getAllProfCats();
            // console.log(catList)
            if (catList) {
                setProfCategories(catList as IprofCat[]);
                // console.log(profCategories)
            }
        }
        getProfCats();
    }, [])

    useEffect(() => {
        if (pCategoryFormValue) {
            setpSubCatFormDisabled(false)
            // console.log("fetching sub categories..." + profCategories)
            const currentCategory = profCategories.find((val) => val._id.toString().match(pCategoryFormValue));
            setProfSubCategories(currentCategory?.subCats || []);
            // console.log("VAlue of sub cat: " + form.getValues().professionSubCat)
            if (pCategoryFormValue !== user.professionCat) {
                form.setValue("professionSubCat", '')
            }

            else if (pCategoryFormValue === user.professionCat
                //&& (!profSubCategories.some(val => val._id ===  form.getValues().professionSubCat) || form.getValues().professionSubCat === '')
            ) {
                form.getValues().professionSubCat === user.professionSubCat ? form.setValue("professionSubCat", user.professionSubCat) : form.setValue("professionSubCat", '')
            }
        }
    }, [profCategories, pCategoryFormValue])

    // *Domicile City
    const domProvince = form.watch().domicileProvince
    const [domCityDisable, setDomCityDisable] = useState(true)
    const [domCityList, setDomCityList] = useState<ICity[]>([])
    useEffect(() => {
        // console.log("fetching domicile cities")
        if (!!domProvince) {
            setDomCityDisable(false)
            setDomCityList(City.getCitiesOfState('PK', domProvince))
            // console.log("Enabling cities: Province Value: " + cProvince)
            if (domProvince !== user.domicileProvince) {
                form.setValue("domicileCity", '')
            }

            else if (domProvince === user.domicileProvince
                //&& (!profSubCategories.some(val => val._id ===  form.getValues().professionSubCat) || form.getValues().professionSubCat === '')
            ) {
                form.getValues().domicileCity === user.domicileCity ? form.setValue("domicileCity", user.domicileCity) : form.setValue("domicileCity", '')
            }
        }

    }, [domProvince])

    // *Current Address
    const cProvince = form.watch().cProvince
    const [cCityDisable, setcCityDisable] = useState(true)
    const [cCityList, setCityList] = useState<ICity[]>([])
    useEffect(() => {
        if (!!cProvince) {
            setcCityDisable(false)
            setCityList(City.getCitiesOfState('PK', cProvince))
            // console.log("Enabling cities: Province Value: " + cProvince)
            if (cProvince !== user.cProvince) {
                form.setValue("cCity", '')
            }

            else if (cProvince === user.cProvince
                //&& (!profSubCategories.some(val => val._id ===  form.getValues().professionSubCat) || form.getValues().professionSubCat === '')
            ) {
                form.getValues().cCity === user.cCity ? form.setValue("cCity", user.cCity) : form.setValue("cCity", '')
            }
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
            // console.log("Enabling cities: Province Value: " + pProvince)
            if (pProvince !== user.pProvince) {
                form.setValue("pCity", '')
            }

            else if (pProvince === user.pProvince
                //&& (!profSubCategories.some(val => val._id ===  form.getValues().professionSubCat) || form.getValues().professionSubCat === '')
            ) {
                form.getValues().pCity === user.pCity ? form.setValue("pCity", user.pCity) : form.setValue("pCity", '')
            }
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
                        // control={form.control}
                        name="cnic"
                        render={({ field }) => (
                            <FormItem className='col-span-2' defaultValue={user.cnic} aria-readonly={true}>
                                <FormLabel>CNIC (without dashes)</FormLabel>
                                <FormControl>
                                    <Input disabled={true} placeholder="4567898765431" {...field} className="bg-background" />
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
                        // control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='col-span-2' defaultValue={user.email} aria-disabled={true}>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input disabled={true} placeholder="abc@gmail.com" {...field} className="bg-background" />
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
                                    <Select onValueChange={field.onChange} defaultValue={user.gender}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Gender</SelectLabel>
                                                {Object.entries(Gender).map((val, index) => (
                                                    <SelectItem key={index} value={val[1]}>{val[1]}</SelectItem>
                                                ))}
                                                {/* {Object.entries(Gender).filter(([key]) => isNaN(Number(key))).map((val, index) => (
                                                    <SelectItem key={index} value={val[0]}>{val[0][0].toUpperCase() + val[0].slice(1)}</SelectItem>
                                                ))} */}
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
                                    <Select onValueChange={field.onChange} defaultValue={user.maritalStatus}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Marital Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Marital Status</SelectLabel>
                                                {Object.values(MaritalStatus).map((val, index) => (
                                                    <SelectItem key={index} value={val}>{val}</SelectItem>
                                                ))}
                                                {/* {Object.entries(MaritalStatus).filter(([key]) => isNaN(Number(key))).map((val, index) => (
                                                    <SelectItem key={index} value={val[0]}>{val[0][0].toUpperCase() + val[0].slice(1)}</SelectItem>
                                                ))} */}
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
                        name="status"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>You are</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={user.status}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Current Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Current Status</SelectLabel>
                                                {Object.entries(userStatus).map(([key, value]) => (
                                                    <SelectItem key={key} value={key}>{value}</SelectItem>
                                                ))}
                                                {/* {Object.entries(MaritalStatus).filter(([key]) => isNaN(Number(key))).map((val, index) => (
                                                    <SelectItem key={index} value={val[0]}>{val[0][0].toUpperCase() + val[0].slice(1)}</SelectItem>
                                                ))} */}
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
                                    <Select onValueChange={field.onChange} defaultValue={user.religion}>
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
                    <Separator className='col-span-2 md:col-span-4' />
                    {/* Domicile */}
                    <p className='subText col-span-2 md:col-span-4'>Domicile</p>
                    <FormField
                        control={form.control}
                        name="domicileProvince"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Province</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={user.domicileProvince}>
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
                        name="domicileCity"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={user.domicileCity} value={form.getValues().domicileCity}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Select City" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>City</SelectLabel>
                                                {domCityList.map((val, index) => (
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
                    <Separator className='col-span-2 md:col-span-4' />
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
                                    <Select onValueChange={field.onChange} defaultValue={user.cProvince}>
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
                                    <Select onValueChange={field.onChange} defaultValue={user.cCity} value={form.getValues().cCity}>
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
                                    <Select onValueChange={field.onChange} defaultValue={user.pProvince}>
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
                                    <Select onValueChange={field.onChange} defaultValue={user.pCity} value={form.getValues().pCity}>
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
                    <Separator className='col-span-2 md:col-span-4' />
                    {/* profession */}
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
                                    <Input type='number' placeholder="No of years" {...field} className="bg-background"
                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* category */}
                    <FormField
                        control={form.control}
                        name="professionCat"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={user.professionCat}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Choose Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Category</SelectLabel>
                                                {profCategories.map((cat) => (
                                                    <SelectItem key={cat._id} value={cat._id}>{cat.cat}</SelectItem>
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
                        name="professionSubCat"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Sub Category</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={user.professionSubCat} value={form.getValues().professionSubCat}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Choose Sub Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Sub Category</SelectLabel>
                                                {profSubCategories.map((subCats) => (
                                                    <SelectItem key={subCats._id} value={subCats._id}>{subCats.subCat}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator className='col-span-2 md:col-span-4' />
                    {/* password */}
                    <Button variant='outline' className='col-span-2' onClick={() => router.back()} disabled={form.formState.isSubmitting || form.formState.isLoading}>
                        {`${form.formState.isSubmitting ? 'Processing...' : 'Cancel'}`}</Button>
                    <Button className='col-span-2' type="submit" disabled={form.formState.isSubmitting || form.formState.isLoading}>
                        {`${form.formState.isSubmitting ? 'Processing...' : 'Save'}`}</Button>
                </form>
            </Form>
        </Card>
    )
}
export default UserUpdateForm