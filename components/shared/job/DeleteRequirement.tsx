'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
type pageProps = {
    jobId: string,
    requirementId: string,
}
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { startTransition } from "react"
import { removeJobRequirement } from "@/lib/database/actions/job.actions"

const DeleteRequirement = ({ jobId, requirementId }: pageProps) => {
    const { toast } = useToast();
    const router = useRouter()
    const deleteRequirement = () =>{
      
        removeJobRequirement({jobId: jobId, requirementId: requirementId})
        .then(() => {
          toast({
            title: "Success",
            description: "Job requirement deleted successfully"
          })
          router.refresh()
        }).catch(() => {
          toast({
            title: "Oh uh!",
            description: "Something went wrong"
          })
        })
      
    }
    return (
      <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Image src={"/icons/delete.svg"} alt="delete" height={20} width={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            startTransition(deleteRequirement)
          }}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    )
}
export default DeleteRequirement