import { z } from "zod"
import { Gender, MaritalStatus } from "../Constants/index";
import { listOfReligions } from "../Constants";

const religionEnum = z.enum(listOfReligions);

  export const SignupSchema = z.object({
    photoUrl: z.string().url().optional(),
    firstName: z.string().min(3, "Name cannot be less the 3 characters").max(50, "Name cannot be more than 50 characters").transform(str => str.trim().toLowerCase()),
    lastName: z.string().min(3, "Name cannot be less the 3 characters").max(50, "Name cannot be more than 50 characters").transform(str => str.trim().toLowerCase()),
    cnic: z.string().length(13, "Invalid CNIC").regex(/^\d+$/, 'CNIC must be numeric only, without any hashes'),
    confirmCnic: z.string().length(13, "Invalid CNIC").regex(/^\d+$/, 'CNIC must be numeric only, without any hashes'),
    mobile: z.string().regex(/^0\d+$/, 'Invalid Mobile number'),
    email: z.string().email().transform(str => str.trim().toLowerCase()),
    gender: z.nativeEnum(Gender),
    dob: z.date(),
    maritalStatus: z.nativeEnum(MaritalStatus),
    religion: religionEnum,
    domicileCity: z.string(),
    cAddress: z.string().min(5, "Please enter valid address").max(200, "Address looks too long"),
    cProvince: z.string(),
    cCity: z.string(),
    pAddress: z.string().min(5, "Please enter valid address").max(200, "Address looks too long"),
    pProvince: z.string(),
    pCity: z.string(),
    profession: z.string().min(5, "Please describe better").max(100, "Too long"),
    yearsOfExperience: z.number().max(50, "Well, maybe you should should consider retiring now").optional(),
    professionCat: z.string(),
    professionSubCat: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters ")
    .max(50, "Password must be less than 50 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters ")
    .max(50, "Password must be less than 50 characters"),
  });


  export const defaultSignupValues = {
    photoUrl: "",
    firstName: "",
    lastName: "",
    cnic: "",
    confirmCnic: "",
    mobile: "",
    email: "",
    gender: Gender.male, // Assuming default is empty string or you can set a specific value from Gender enum
    dob: new Date(), // Or set to null/undefined if not providing a default date
    maritalStatus: MaritalStatus.single, // Assuming default is empty string or you can set a specific value from MaritalStatus enum
    religion: religionEnum.Values.Islam, // Assuming default is empty string or you can set a specific value from religionEnum
    domicileCity: "",
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
    password: "",
    confirmPassword: ""
  };