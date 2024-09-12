'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { addJobRequirement, updateJobRequirement } from "@/lib/database/actions/job.actions"
import { useRouter } from "next/navigation"
import Image from "next/image"

type pageProps = {
    jobId: string,
    requirementId: string,
    description: string,
    optional: boolean
}

const EditRequirement = ({ jobId, requirementId, description, optional }: pageProps) => {
    const { toast } = useToast();
    const router = useRouter()

    const FormSchema = z.object({
        description: z.string().min(2, "Description cannot be less than 2 characters")
            .max(100, "Too long, please try to stay under 100 characters"),
        optional: z.boolean().default(false),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            description: description,
            optional: optional,
        },
    })


    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            console.log(values)
            const jobRequirement = await updateJobRequirement({
                description: values.description,
                optional: values.optional,
                jobId: jobId,
                requirementId: requirementId
            });
            if (jobRequirement) {
                console.log(jobRequirement)
                toast({
                    title: 'Success',
                    description: 'Job requirement has been updated.'
                })
                router.refresh()
            }
            else {
                toast({
                    variant: "destructive",
                    title: "Oh uh !",
                    description: "Something went wrong"
                })
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Oh uh !",
                description: error.message
            })
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"}>
                    <Image src='/icons/edit.svg' alt="edit" height={20} width={20} />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Create Requirement</DialogTitle>
                    <DialogDescription>
                        Please provide description and check if its optional.
                    </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Experience certificate" {...field} className="bg-background" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                        <FormField
                            control={form.control}
                            name="optional"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Optional
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <DialogClose>
                            <Button disabled={form.formState.isLoading || form.formState.isSubmitting} type="submit">
                                {(form.formState.isLoading || form.formState.isSubmitting)? 'Wait...': 'Save'}
                            </Button>
                        </DialogClose>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default EditRequirement