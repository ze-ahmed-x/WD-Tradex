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
import { restUserPassword } from "@/lib/database/actions/user.action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    cnic: z.string()
    .length(13, "Invalid CNIC")
    .regex(/^\d+$/, 'CNIC must be numeric only, without any hashes')
})

const ForgotPassCard = () => {
    const { toast } =useToast()
    const { data: session } = useSession();
    const [linkSent, setLinkSent] = useState(false)
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cnic: ""
        },
    })
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            const result = await restUserPassword(values.cnic)
            toast ({
                title: "Check Your Email",
                description: "Resent link has been sent to you email address"
            })
            form.reset();
            setLinkSent(true)
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
        <Card className='bg-hero_BG shadow-md p-5 sm:p-10 w-full'>
            {session && session.user? (<p>Hello <span>{session.user.firstName}</span> <span>{session.user.lastName}</span> Welcome !</p>): (
                <CardContent className="flex flex-row gap-5 justify-center sm:justify-between items-center">
                    {linkSent? (
                       <div>
                            <p className="h4 text-center">An email has been sent, please check your email.</p>
                       </div> 
                    ) : (

                    
                <div className="w-full sm:w-1/2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="cnic"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CNIC</FormLabel>
                                        <FormControl>
                                            <Input placeholder="3123481234512" {...field} className="bg-background"/>
                                        </FormControl>
                                        <FormDescription>
                                            Enter CNIC without dashes
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            
                            <Button className="w-full" type="submit" disabled={form.formState.isSubmitting || form.formState.isLoading}>
                            {`${form.formState.isSubmitting? 'Processing...' : 'Send Reset Link on Email'}`}
                            </Button>
                            <div>
                                <p>Need more help? Contact us on:</p>
                                <p className="text-blue-600" > contact@tradex.com </p>
                            </div>
                        </form>
                    </Form>
                </div>
                )}
                <div className="hidden sm:block">
                    <Image className="rounded-lg shadow-md" src='/images/rocovery.jpg' alt="Login" height={360} width={498} />
                </div>
            </CardContent>
            )}
            
        </Card>
    )
}

export default ForgotPassCard