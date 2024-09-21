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
import { sendMail } from "@/lib/mail"
import { useToast } from "@/components/ui/use-toast"

const ContactForm = () => {
  const { toast } = useToast()
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
  async function onSubmit(values: z.infer<typeof contactMeFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const mail =  await sendMail({
        to: 'contact@tradexpioneer.com',
        subject: "Contac from Website",
        body: `<div>
          <p>Name: <span>${values.name}</span></p>
          <p>Email: <span>${values.email}</span></p>
          <p>Contact: <span>${values.mobile}</span></p>
          <p>Subject:</p>
          <p>${values.subject}</p>
          <p>message: </p>
          <p>${values.message}</p>
        </div>`
      })
      toast({
        title: "Email sent",
        description: "We'll get back to you soon"
      })
    } catch (error) {
      toast({
        title: "Oh Uh!",
        description: "Something went wrong, try again later sometime."
      })
    }
    form.reset();
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
        <Button disabled = {form.formState.isSubmitting || form.formState.isLoading} type="submit" className="w-full">{form.formState.isSubmitting? 'Sending...': 'Send Message'}</Button>
      </form>
    </Form>
  )
}

export default ContactForm