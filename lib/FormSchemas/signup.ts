import { z } from "zod"
import { Gender, MaritalStatus, UserStatus } from "../Constants/index";
import { listOfReligions } from "../Constants";

const religionEnum = z.enum(listOfReligions);

export const baseUserSchema = z.object({
  // photoUrl: z.string().url().optional(),
  firstName: z.string()
    .min(2, "First name must be atleast 2 characters")
    .max(45, "First name must be less than 45 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "Numbers and spacial characters are not allowed!")
    .transform(str => str.trim().toLowerCase()),
  lastName: z.string()
    .min(2, "Last name must be atleast 2 characters")
    .max(45, "Last name must be less than 45 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "Numbers and spacial characters are not allowed!")
    .transform(str => str.trim().toLowerCase()),
  mobile: z.string()
    .regex(/^0\d+$/, 'Invalid Mobile number'),
  // gender: z.enum(Object.keys(Gender)as [keyof typeof Gender]), // one way to save the keys actually but we wont do it here
  gender: z.nativeEnum(Gender),
  dob: z.date(),
  maritalStatus: z.nativeEnum(MaritalStatus),
  status: z.enum(Object.keys(UserStatus) as [keyof typeof UserStatus]),
  religion: religionEnum,
  domicileProvince: z.string()
    .min(2, "Please Choose a Province"),
  domicileCity: z.string()
    .min(2, "Please Choose a City"),
  cAddress: z.string()
    .min(5, "Please enter valid address").max(200, "Address looks too long"),
  cProvince: z.string()
    .min(2, "Please Choose a Province"),
  cCity: z.string()
    .min(2, "Please Choose a City"),
  pAddress: z.string()
    .min(5, "Please enter valid address").max(200, "Address looks too long"),
  pProvince: z.string()
    .min(2, "Please Choose a Province"),
  pCity: z.string()
    .min(2, "Please Choose a City"),
  profession: z.string()
    .min(5, "Please describe better").max(100, "Too long"),
  yearsOfExperience: z.number()
    .nonnegative()
    .max(50, "Well, maybe you should should consider retiring now").optional(),
  professionCat: z.string()
    .min(2, "Please Choose a Category"),
  professionSubCat: z.string()
    .min(2, "Please Choose a Sub Category"),
})


export const SignupSchema = baseUserSchema.extend({
  cnic: z.string()
    .length(13, "Invalid CNIC")
    .regex(/^\d+$/, 'CNIC must be numeric only, without any hashes'),
  confirmCnic: z.string()
    .length(13, "Invalid CNIC")
    .regex(/^\d+$/, 'CNIC must be numeric only, without any hashes'),
  email: z.string()
    .email()
    .max(50, "Email is too long")
    .transform(str => str.trim().toLowerCase()),
  password: z.string()
    .min(6, "Password must be at least 6 characters ")
    .max(50, "Password must be less than 50 characters"),
  confirmPassword: z.string()
    .min(6, "Password must be at least 6 characters ")
    .max(50, "Password must be less than 50 characters"),
  termsAccepted: z.boolean().default(false)
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password and confirm password doesn't match!",
  path: ["confirmPassword"],
}).refine((data) => data.cnic === data.confirmCnic, {
  message: "CNIC and confirm CNIC doesn't match!",
  path: ["confirmCnic"]
}).refine((data) => data.termsAccepted, {
  message: "Please accept terms and conditions",
  path: ["termsAccepted"]
});

export const defaultBaseUserValues = {
  // photoUrl: "",
  firstName: "",
  lastName: "",
  mobile: "",
  gender: Gender.male, // Assuming default is empty string or you can set a specific value from Gender enum
  dob: new Date(), // Or set to null/undefined if not providing a default date
  maritalStatus: MaritalStatus.single, // Assuming default is empty string or you can set a specific value from MaritalStatus enum
  status: 'unemployedLooking' as keyof typeof UserStatus,
  religion: religionEnum.Values.Islam, // Assuming default is empty string or you can set a specific value from religionEnum
  domicileCity: "",
  domicileProvince: "",
  cAddress: "",
  cProvince: "",
  cCity: "",
  pAddress: "",
  pProvince: "",
  pCity: "",
  profession: "",
  yearsOfExperience: 0, // Or set a default number if preferred
  professionCat: "",
  professionSubCat: "",
}


export const defaultSignupValues = {
  ...defaultBaseUserValues,
  // photoUrl: "",
  cnic: "",
  confirmCnic: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false
};