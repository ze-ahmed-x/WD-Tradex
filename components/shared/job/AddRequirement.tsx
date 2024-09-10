'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { addJobRequirement } from "@/lib/database/actions/job.actions"
import { JobRequirementParams } from "@/types"
import { useRouter } from "next/navigation"
import { startTransition, useState } from "react"

type pageProps = {
    jobId: string
}

const AddRequirement = ({ jobId }: pageProps) => {
    const [description, setDescription] = useState('');
    const [optional, setOptional] = useState(false)
    const [btnDisable, setBtnDisable] = useState(false)
    const { toast } = useToast();
    const router = useRouter()
    const addRequiremnt = () => {
        try {
            setBtnDisable(true)
            if (description) {
                addJobRequirement({
                    description: description.trim(),
                    jobId: jobId,
                    optionalFlag: optional
                }).then(() => {
                    toast({
                        title: "Success",
                        description: "New requirement has been added"
                    })
                    router.refresh()
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
                <Button >Add Requirement</Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Create Requirement</DialogTitle>
                    <DialogDescription>
                        Please provide description and check if its optional.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Description
                        </Label>
                        <Textarea id="description" placeholder="German Language Certificate" className="col-span-3"
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Optional
                        </Label>
                        <Input size={2} type="checkbox" id="optional" className="col-span-1" onChange={(e) => {
                            setOptional(e.target.checked)
                        }} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button type="button" onClick={() => {
                            startTransition(addRequiremnt)
                        }} >Save</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default AddRequirement