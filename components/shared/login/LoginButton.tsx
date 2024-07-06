'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const LoginButton = () => {
    const { data: session } = useSession()
    const router = useRouter();
    return (
        <div>
            {session && session?.user ? (
                <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={session?.user?.photoUrl} alt={session?.user?.firstName} />
                        <AvatarFallback>{ session?.user?.firstName[0]?.toUpperCase().concat(session?.user?.lastName[0]?.toUpperCase()) }</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={ () => router.push('/user/profile')}>Profile</DropdownMenuItem>
                    { session?.user?.role === 'admin' && (<DropdownMenuItem onClick={ () => router.push('/admin/projects')}>Projects</DropdownMenuItem> )}
                    <DropdownMenuItem onClick={ () => signOut() }>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            ) : (
                <Button asChild>
                    <Link href= '/login'>Login</Link>
                </Button>
            )}
        </div>
    )
}

export default LoginButton