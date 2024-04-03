"use client"
 
import { contactMeFormSchema } from "@/lib/validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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

const ContactForm = () => {
    // 1. Define your form.
  const form = useForm<z.infer<typeof contactMeFormSchema>>({
    resolver: zodResolver(contactMeFormSchema),
    defaultValues: {
    name: '',
     email:'',
     mobile: '',
     message: '',
     subject: '',
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof contactMeFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex flex-col gap-4 mt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Name</FormLabel> */}
                    <FormControl>
                      <Input placeholder="Name" {...field} className="bg-background"/>
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Name</FormLabel> */}
                    <FormControl>
                      <Input placeholder="Email" {...field} className="bg-background"/>
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Name</FormLabel> */}
                    <FormControl>
                      <Input placeholder="Contact No (Optional)" {...field} className="bg-background"/>
                    </FormControl>
                    {/* <FormDescription>
                      Example +923331234567 or 03331234567
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Name</FormLabel> */}
                    <FormControl>
                      <Input placeholder="Subject" {...field} className="bg-background"/>
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Name</FormLabel> */}
                    <FormControl>
                      <Textarea placeholder="Message..." {...field} className="h-20 md:h-40 bg-background" />
                    </FormControl>
                    <FormDescription>
                      Message can be 1,000 characters long
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
        <Button type="submit" className="w-full">Send Message</Button>
      </form>
    </Form>
  )
}

export default ContactForm