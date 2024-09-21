"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { createEntity, getAllEntities } from "@/lib/database/actions/entity.actions"
import { IEntity } from "@/lib/database/models/entity.model"
import { CreateProjectSchema, DefaultProjectFormValues } from "@/lib/FormSchemas/project"
import { zodResolver } from "@hookform/resolvers/zod"
import { Country } from "country-state-city"
import { startTransition, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
import { createProject, UpdateProject } from "@/lib/database/actions/project.action"
import { useRouter } from "next/navigation"
import { IProject } from "@/lib/database/models/project.model"
import { UpdateProjectParams } from "@/types"
import { ProjectStatus } from "@/lib/Constants"

type projectFormProps = {
  type: 'create' | 'edit',
  _id?: string,
  project?: IProject
}

const ProjectForm = ({ type, _id, project }: projectFormProps) => {
  const router = useRouter()
  // 1. Define your form.
  const defaultVals = (type === 'edit' && project) ? {
    title: project.title,
    country: project.country,
    description: project.description,
    collaboratingEntity: project.collaboratingEntity,
    status: project.status
  } : DefaultProjectFormValues
  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: defaultVals
  })
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreateProjectSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      let DBProject = null
      // create of update project
      if (type === 'create') {
        DBProject = await createProject(values)
      }
      else if (type === 'edit') {
        const updateProjVals : UpdateProjectParams = {
          ...values, _id : project?._id!
        }
        DBProject = await UpdateProject(updateProjVals);
      }
      //After create/update rest protocols are the same
      if (DBProject) {
        toast({
          title: "Success",
          description: "Project has been saved"
        });
        form.reset();
        router.back();
        router.refresh()
      }
    } catch (error : any) {
      toast ({
        variant: "destructive",
        title: 'Oh uh ! Something went wrong',
        description: error.message
      })
    }
  }
  // Entity creation and related stuff
  const { toast } = useToast()
  const [entities, setEntities] = useState<IEntity[]>([])
  const [newEntity, setNewEntity] = useState("")
  useEffect(() => {
    const getEntities = async () => {
      try {
        const entities = await getAllEntities() as IEntity[];
        entities && setEntities(entities);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.message,
        })
      }
    }
    getEntities()
  }, [])
  const createNewEntity = () => {
    try {
      if (newEntity) {
        createEntity(newEntity.trim())
          .then((newentity) => {
            setEntities((prevState) => [...prevState, newentity])
            toast({
              variant: "default",
              title: "Success !!",
              description: "New entity has been saved."
            })
          })
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      })
    }
  }
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
                  <Input placeholder="Title of the project" {...field} className="bg-background" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={project ? project.country : ''}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {Country.getAllCountries().map((val, index) => (
                        <SelectItem key={index} value={val.isoCode}> {val.name} </SelectItem>
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
            name="collaboratingEntity"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Collaborating Entity</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={project ? project.collaboratingEntity : ''}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select Entity" />
                    </SelectTrigger>
                    <SelectContent>
                      {entities.length > 0 && entities.map((entity, index) => (
                        <SelectItem key={index} value={entity._id} >{entity.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  <AlertDialog>
                    <AlertDialogTrigger className='pl-2 text-xs md:text-sm text-blue-500'>Create New Entity</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>New Entity Creation</AlertDialogTitle>
                        <AlertDialogDescription>
                          <Input type="text" placeholder="Entity Name" className="bg-background" autoFocus={true}
                            onChange={
                              (e) => {
                                setNewEntity(e.target.value)
                              }
                            }
                          />
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => startTransition(createNewEntity)}>Save</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </FormDescription>
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
                                            <SelectValue placeholder="Project Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                                {Object.values(ProjectStatus).map((val, index) => (
                                                    <SelectItem key={index} value={val}>{val[0].toUpperCase().concat(val.slice(1))}</SelectItem>
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
              <FormItem className="col-span-2 sm:col-span-4">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief detail of the project upto 250 characters" {...field} className="bg-background" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline" className="col-span-2 md:col-start-1" type="button" disabled={form.formState.isSubmitting || form.formState.isLoading} onClick={() => {
            router.back();
          }}>Cancel</Button>
          <Button className="col-span-2" type="submit" disabled={form.formState.isSubmitting || form.formState.isLoading}>
            {`${form.formState.isSubmitting ? 'Processing...' : type === "edit"? 'Update' : 'Create'}`}</Button>
        </form>
      </Form>
    </Card>
  )
}

export default ProjectForm