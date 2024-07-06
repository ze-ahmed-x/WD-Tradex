'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent
} from "@/components/ui/card"
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
import { useToast } from "@/components/ui/use-toast"
import { restUserPassword, setUserPassword } from "@/lib/database/actions/user.action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    password: z.string()
    .min(6, "Password must be at least 6 characters ")
    .max(50, "Password must be less than 50 characters"),
  confirmPassword: z.string()
    .min(6, "Password must be at least 6 characters ")
    .max(50, "Password must be less than 50 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ["confirmPassword"],
  })
const ResetPassword = ({userId}: {userId:string}) => {
    const { toast } =useToast()
    const { data: session } = useSession();
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            const result = await setUserPassword(userId, values.password)
            if (result === "success") {
                toast ({
                    title: "Success",
                    description: "Password updated successfully"
                })
                form.reset();
                router.push('/login')
            }
            else if (result === "userNotFound") {
                toast( {
                    variant: "destructive",
                    title: "Hmmm...",
                    description: "We couldn't find the user...",
                })
            }
            else {
                toast( {
                    variant: "destructive",
                    title: "oh uh !",
                    description: "Something unexpected happened, please try again later sometime",
                })
            }
        } catch (error : any) {
            toast( {
                variant: "destructive",
                title: "Uh oh !",
                description: error.message,
            })
        }
    }
    // check if user is already login
    useEffect (() => {
        
        if (session?.user) {
            router.push(session?.user.role === 'admin'? '/admin/projects' : 'user/profile');
        }
    }, [session])
    
    return (
        <Card className='bg-hero_BG shadow-md p-5 sm:p-10 w-full md:w-1/2 md:min-w-[400px]'>
            {session && session.user? (<p>Hello <span>{session.user.firstName}</span> <span>{session.user.lastName}</span> Welcome !</p>): (
                <CardContent>                    
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="3123481234512" {...field} className="bg-background"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="3123481234512" {...field} className="bg-background"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            
                            <Button className="w-full" type="submit" disabled={form.formState.isSubmitting || form.formState.isLoading}>
                            {`${form.formState.isSubmitting? 'Processing...' : 'Update'}`}
                            </Button>
                            <div>
                                <p>Need more help? Contact us on:</p>
                                <p className="text-blue-600" > contact@tradex.com </p>
                            </div>
                        </form>
                    </Form>
                </div>
                {/* <div className="hidden sm:block">
                    <Image className="rounded-lg shadow-md" src='/images/rocovery.jpg' alt="Login" height={360} width={498} />
                </div> */}
            </CardContent>
            )}
            
        </Card>
    )
}

export default ResetPassword