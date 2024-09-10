import { z } from "zod"
import { JobStatus } from "../Constants"

export const JobFormSchema = z.object({
    title: z.string()
    .min(2, "Title must be at least 2 characters long")
    .max(100, "Title cannot be longer than 100 characters")
    .regex(new RegExp("^[a-zA-Z0-9 ]+$"), "Special characters are not allowed!")
    .transform(str => str.trim().toLowerCase()),
    description: z.string()
    .min(2, "Too short")
    .max(250, "Description cannot be longer than 250 characters")
    .transform(str => str.trim()),
    professionCat: z.string()
    .min(2, "Category must be at least 2 characters long"),
    professionSubCat: z.string()
    .min(2, "Category must be at least 2 characters long"),
    vacancies: z.number()
    .nonnegative(),
    status: z.enum(["open", "close"]).default(JobStatus.OPEN)
  })

export const JobFormDefaultValues = {
        projectId: "",
        title: "",
        description: "",
        professionCat: "",
        professionSubCat: "",
        vacancies: 0,
        status: JobStatus.OPEN
}