'use client'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getAllProfCats } from "@/lib/database/actions/category.actions"
import { IprofCat, IprofSubCat } from "@/lib/database/models/category.model"
import { JobFormDefaultValues, JobFormSchema } from "@/lib/FormSchemas/job"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createJob } from "@/lib/database/actions/job.actions"
import { IJob } from "@/lib/database/models/job.model"
import { useToast } from "@/components/ui/use-toast"
import { JobStatus } from "@/lib/Constants"

type JobFormProps = {
  type: 'create' | 'update'
  projectId: string,
  job?: IJob
}

const JobForm = ({type, projectId, job} : JobFormProps) => {
  const { toast } = useToast()
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof JobFormSchema>>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: JobFormDefaultValues
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof JobFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const jobVals = { ...values, projectId: projectId }
      const job = await createJob(jobVals)
      if (job) {
        toast({
          title: "Success",
          description: "Job created successfully"
        })
      }
      form.reset()
      router.back()
      router.refresh();
    } catch (error) {
      
    }
  }
  //*Category and Sub Category Business
  const pCategoryFormValue = form.watch().professionCat;
  const [profCategories, setProfCategories] = useState<IprofCat[]>([])
  const [profSubCategories, setProfSubCategories] = useState<IprofSubCat[]>([])
  const [pSubCatFormDisabled, setpSubCatFormDisabled] = useState(true);
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
  // sub category fetch
  useEffect(() => {
    if (pCategoryFormValue) {
      setpSubCatFormDisabled(false)
      const currentCategory = profCategories.find((val) => val._id.toString().match(pCategoryFormValue));
      setProfSubCategories(currentCategory?.subCats || []);
      form.resetField("professionSubCat")
    }
  }, [pCategoryFormValue])
  return (
    <Card className='bg-hero_BG shadow-md p-5 sm:p-10 w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Nurse/ Welder/ carpenter" {...field} className="bg-background" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vacancies"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Vacancies</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} className="bg-background" 
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Category */}
          <FormField
                        control={form.control}
                        name="professionCat"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Choose Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                                {profCategories.map((cat) => (
                                                    <SelectItem key={cat._id} value={cat._id}>{cat.cat}</SelectItem>
                                                ))}
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
                                    <Select onValueChange={field.onChange} disabled= {pSubCatFormDisabled} value= {form.getValues().professionSubCat}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Choose Sub Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                                {profSubCategories.map((subCats) => (
                                                    <SelectItem key={subCats._id} value={subCats._id}>{subCats.subCat}</SelectItem>
                                                ))}
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
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue= {form.getValues().status}>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Job Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                                {Object.values(JobStatus).map((val, index) => (
                                                    <SelectItem key={index} value={val}>{val}</SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-4">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief Detail about project (Limit 250 character)" {...field} className="bg-background" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline" className="col-span-2 md:col-start-1" type="button" disabled={form.formState.isSubmitting || form.formState.isLoading} onClick={() => {
            router.back();
          }}>Cancel</Button>
          <Button className="col-span-2" type="submit" disabled={form.formState.isSubmitting || form.formState.isLoading}>
            {`${form.formState.isSubmitting ? 'Processing...' : 'Create'}`}</Button>
        </form>
      </Form>
    </Card>
  )
}

export default JobForm