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
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createEntity, getAllEntities } from "@/lib/database/actions/entity.actions"
import { IEntity } from "@/lib/database/models/entity.model"
import { startTransition, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

type props = {
    val: string,
    onChangeHandler: () => void
}

const DropDown = ({ val, onChangeHandler }: props) => {
    const { toast } = useToast()
    const [entities, setEntities] = useState<IEntity[]>([])
    const [newEntity, setNewEntity] = useState("")
    useEffect(() => {
        const getEntities = async () => {
            try {
                const entities = await getAllEntities() as IEntity[];
                entities && setEntities(entities);
            } catch (error:any) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                  })
            }
        }
        getEntities()
    }, [])
    const createNewEntity = () => {
        try {
            if (newEntity) {
                createEntity(newEntity.trim())
                .then((newentity) => {
                    setEntities((prevState) => [...prevState, newentity])
                    toast({
                        variant: "default",
                        title:"Success !!",
                        description: "New entity has been saved."
                    })
                })
            }
        } catch (error:any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
              })
        }
    }
    return (
        <Select onValueChange={onChangeHandler} defaultValue={val}>
            <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="Select Entity" />
            </SelectTrigger>
            <SelectContent>
                {entities.length > 0 && entities.map((entity, index) => (
                    <SelectItem key={index} value={entity._id} >{entity.name}</SelectItem>
                ))}
                <AlertDialog>
                    <AlertDialogTrigger className='pl-2 text-xs md:text-sm text-blue-500'>Create New Entity</AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>New Entity Creation</AlertDialogTitle>
                            <AlertDialogDescription>
                               <Input type="text" placeholder="Entity Name" className="bg-background" autoFocus={true}
                               onChange={
                                    (e) => {
                                        setNewEntity(e.target.value)
                                    }
                               } 
                               />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => startTransition(createNewEntity)}>Save</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </SelectContent>
        </Select>
    )
}

export default DropDown