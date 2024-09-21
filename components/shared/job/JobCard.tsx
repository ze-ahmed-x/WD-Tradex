
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProjectStatus } from "@/lib/Constants";

type JobCardProps = {
  _id: string,
  projectId: string;
  title: string;
  state: string;
  city: string;
  vacancies: number;
  professionCat: string;
  status: string;
}

const JobCard = ({
  _id, professionCat, status, city, vacancies, projectId, title, state
}: JobCardProps) => {
  return (
    <Card className="relative bg-hero_BG shadow-md hover:shadow-lg hover:border-foreground/15 transition-all
    w-full max-w-64 sm:min-h-[185px] md:min-h-56 lg:min-h-60">
      <Link href={`/admin/job/${_id}`}>
        <CardHeader>
          <CardTitle className="regularText text-primary line-clamp-2 text-center"> {title.toUpperCase()}  </CardTitle>
        </CardHeader>
        <CardContent>
        <p className="regularText font-semibold line-clamp-1 w-full text-justify">Vacancies:<span className="subText font-normal text-right"> {vacancies} </span></p>
        <p className="regularText font-semibold line-clamp-1">Category:<span className="subText font-normal"> {professionCat} </span></p>
        <p className="regularText font-semibold line-clamp-1">State:<span className="subText font-normal"> {state} </span></p>
        <p className="regularText font-semibold line-clamp-1">City:<span className="subText font-normal"> {city} </span></p>
        <p className="regularText font-semibold line-clamp-1">Status:<span className={`text-xs md:text-sm lg:text-base font-normal ${
                        status === ProjectStatus.OPEN? 'text-green-500' :
                        status === ProjectStatus.PAUSE? 'text-yellow-500':
                        'text-red-500'
                        }`}> {status[0].toUpperCase().concat(status.slice(1))} </span></p>

        </CardContent>
      </Link>
    </Card>
  )
}

export default JobCard