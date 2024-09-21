'use client'

import { RegisterFormSchema } from '@/lib/FormSchemas/register'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import ProfilePictureUploader from './ProfilePictureUploader'
import { useUploadThing } from '@/lib/uploadthing'
import { useToast } from "@/components/ui/use-toast"


const RegisterForm = () => {
    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing('imageUploader')
    const { toast } = useToast()
    // 1. Define your form.
    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            name: ""
        },
      })
// 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // console.log(values)
        let uploadedImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadImages = await startUpload(files);
      if (!uploadImages) {
        toast({
            variant: "destructive",
            title: "Uh oh! Image Could not be uploaded.",
            description: "You can continue and upload it later",
          })
      }
      else {
        toast({
            title: "Success !",
            description: "Image uploade successfuly.",
          })
          uploadedImageUrl = uploadImages[0].url
      }
    }
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Abc" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* profile image */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <ProfilePictureUploader 
                imageUrl = {field.value}
                onFiledChange = {field.onChange}
                setFiles = {setFiles}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >{
            form.formState.isSubmitting ? ('Submitting...') : (`Register`)
          }</Button>
      </form>
    </Form>
  )
}

export default RegisterForm