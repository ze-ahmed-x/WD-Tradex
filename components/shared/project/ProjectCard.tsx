import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

const ProjectCard = ({id}: {id:string}) => {
    return (
        <Link href={`/admin/projects/${id}`}>
        <Card className="bg-hero_BG shadow-md hover:shadow-lg hover:border-foreground/15 transition-all">
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
        </Link>
    )
}

export default ProjectCard