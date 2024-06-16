'use client'
import {
    Card,
    CardContent
} from "@/components/ui/card"
import Image from "next/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import Link from "next/link"

const formSchema = z.object({
    username: z.string().min(2, "Invalid Login").max(50),
    password: z.string().min(2, "Invalid Password").max(50, "Invalid Password"),
})


const LoginCard = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Card className='bg-hero_BG shadow-md p-5 sm:p-10 w-full'>
            <CardContent className="flex flex-row gap-5 justify-center sm:justify-between items-center">
                <div className="w-full sm:w-1/2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CNIC/ Email address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="3123481234512" {...field} className="bg-background"/>
                                        </FormControl>
                                        <FormDescription>
                                            Enter either CNIC or Email address
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Type here..." {...field} className="bg-background" />
                                        </FormControl>
                                        {/* <FormDescription>
                                            Enter either CNIC or Email address
                                        </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <p>Not a member? <Link className="text-blue-600 underline" href= '/signup'>Register</Link> 
                                </p>
                                <Link className="text-blue-600 underline" href='/recovery'>Forgot Password</Link>
                            </div>

                            
                            <Button className="w-full" type="submit" disabled={form.formState.isSubmitting || form.formState.isLoading}>
                            {`${form.formState.isSubmitting? 'Processing...' : 'Login'}`}
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="hidden sm:block">
                    <Image className="visible:" src='/images/login.png' alt="Login" height={396} width={322} />
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginCard