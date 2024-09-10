import { z } from "zod"
import { ProjectStatus } from "../Constants"
export const CreateProjectSchema = z.object({
    title: z.string()
    .min(2, "Title must be at least 2 characters long")
    .max(100, "Title cannot be longer than 100 characters")
    .regex(new RegExp("^[a-zA-Z0-9 ]+$"), "Special characters are not allowed!")
    .transform(str => str.trim().toLowerCase()),
    country: z.string()
    .min(2, "Please a select country"),
    description: z.string()
    .min(2, "Too short")
    .max(250, "Description cannot be longer than 250 characters")
    .transform(str => str.trim()),
    collaboratingEntity: z.string().min(1, "Please select a collaborating entity"),
    status: z.string()
  })

export const DefaultProjectFormValues = {
    title: "",
    country: "",
    description: "",
    collaboratingEntity: "",
    status: ProjectStatus.OPEN
}