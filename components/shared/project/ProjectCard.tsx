import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export type ProjectCardProps = {
    _id: string,
    title: string,
    country: string,
    collaboratingEntityName: string,
    totalJobs: number,
    totalVacancies: number,
    status: string
}
import { Country } from 'country-state-city';
import Image from "next/image";
import ProjDelete from "./ProjDelete";
import { ProjectStatus } from "@/lib/Constants";

const ProjectCard = ({ _id, title, country, collaboratingEntityName, totalJobs, totalVacancies, status }: ProjectCardProps) => {
    const countryName = Country.getCountryByCode(country)?.name
    return (
        <Card className="relative bg-hero_BG shadow-md hover:shadow-lg hover:border-foreground/15 transition-all sm:min-h-[180px] md:min-h-[210px] lg:min-h-[235px]">
            <Link href={`/admin/projects/${_id}`}>
                <CardHeader>
                    <CardTitle className="h4 text-primary line-clamp-2 text-center"> {title.toUpperCase()}  </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="regularText font-semibold line-clamp-1">Country:<span className="subText font-normal"> {countryName} </span></p>
                    <p className="regularText font-semibold line-clamp-1">Sponser:<span className="subText font-normal"> {collaboratingEntityName} </span></p>
                    <p className="regularText font-semibold line-clamp-1">Job Types:<span className="subText font-normal"> {totalJobs} </span></p>
                    <p className="regularText font-semibold line-clamp-1">Vacancies:<span className="subText font-normal"> {totalVacancies} </span></p>
                    <p className="regularText font-semibold line-clamp-1">Status:<span className={`text-xs md:text-sm lg:text-base font-normal ${
                        status === ProjectStatus.OPEN? 'text-green-500' :
                        status === ProjectStatus.PAUSE? 'text-yellow-500':
                        'text-red-500'
                        }`}> {status[0].toUpperCase().concat(status.slice(1))} </span></p>
                </CardContent>
            </Link>
            <div className="absolute right-2 top-2">
                <Link href={`/admin/projects/${_id}/edit`}>
                    <Image src='/icons/edit.svg' alt="edit" height={20} width={20} />
                </Link>
            </div>
            <div className="absolute right-2 bottom-2">
                <ProjDelete _id={_id} />
            </div>
        </Card>
    )
}

export default ProjectCard