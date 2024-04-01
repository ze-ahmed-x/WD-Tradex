import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { navItems } from "@/lib/Constants"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MobileNav = () => {
    const pathName = usePathname();
    return (
        <Sheet>
            <SheetTrigger>
                <HamburgerMenuIcon />
            </SheetTrigger>
            <SheetContent>
                {/* <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader> */}
                <div className="flex flex-col gap-4 justify-start items-center mt-5">
                    {navItems.map(item => {
                        const isActive = pathName === item.href
                        return (
                            <Link href={item.href} key={item.label} className={`${isActive && 'text-primary font-semibold'} regular`}>
                                {item.label}
                            </Link>
                        )

                    })}

                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav