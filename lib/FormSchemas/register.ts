import { z } from "zod"
 
export const RegisterFormSchema = z.object({
  name: z.string().min(2).max(50),
  imageUrl: z.string().optional()
})