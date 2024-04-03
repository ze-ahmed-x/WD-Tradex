import z from "zod"

export const contactMeFormSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").max(30, "Name cannot be more than 30 characters"),
    email: z.string().email("Please provide a valid email address"),
    mobile: z.string()
    // Remove whitespace and special characters (except + sign)
    .trim().optional()
    .refine((value) => {
      // Check if the number starts with a + sign (optional)
      const hasPlus = value?.startsWith('+');
      // Extract the numeric part of the number
      const number = hasPlus ? value?.slice(1) : value;
  
      // Regular expression for valid phone number characters (adjust as needed)
      const phoneRegex = /^[0-9]*$/;
  
      // Check if the number consists only of digits and optional + sign
      return number? (phoneRegex.test(number) && number.length >= 11 && number.length <= 13) : true;
    }, 'Invalid mobile number. Example: +923331234567 or 03331234567'),
    subject: z.string().min(4, "Subject must be at least 4 characters long").max(50, "Subject cannot be more than 50 characters"),
    message: z.string().min(5, "Message must be at least 5 characters long").max(1000, "Message cannot be more than 1000 characters")
})