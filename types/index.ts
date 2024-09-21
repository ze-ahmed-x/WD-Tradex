import { IJob } from "@/lib/database/models/job.model";
import { IUser } from "@/lib/database/models/user.model";

export type CreateUserParams = {
    firstName: string;
    lastName: string;
    cnic: string;
    mobile: string;
    email: string;
    gender: string; 
    dob: Date;
    maritalStatus: string;
    status: string;
    religion: string;
    domicileProvince: string;
    domicileCity: string;
    cAddress: string;
    cProvince: string;
    cCity: string;
    pAddress: string;
    pProvince: string;
    pCity: string;
    profession: string;
    yearsOfExperience: number;
    professionCat: string;
    professionSubCat: string;
    password: string;
    role: string;
    termsAccepted: boolean;
}

export type CreateProjectParams = {
    title: string;
    country: string;
    description: string;
    collaboratingEntity: string;
    status: string;
}


export type UpdateProjectParams  = CreateProjectParams & {
    _id: string;
}


export type CreateApplicationParams = {
    userId: string,
    jobId: string,
    status?: string,
}

export type UpdateApplParams = {
    applicationId: string,
    status?: string,
    comment?: string,
}

export type UpdateApplReqParams = {
    applicationId: string,
    requirementId: string;
    completed?: boolean;
    verified?: boolean;
    comment?: string
}

export type CreateJobParams = {
    projectId: string,
    title: string,
    description: string,
    professionCat: string,
    professionSubCat: string,
    state?: string,
    city?: string,
    status: string,
    vacancies: number,
}

export type updateJobParams = CreateJobParams & {
    _id: string
}

export type UpdateJobParams = CreateJobParams & {
    _id: string
}

export type JobRequirementParams = {
    jobId: string,
    description: string,
    optionalFlag: boolean
}

export type GetAllUserParams = {
    page: number, 
    limit: number,
    username: string,
    userId: string,
    category: string,
    subCategory: string,
    status: string,
    // userType: string[]
}

export type GetAllJobsParams = {
    page: number, 
    limit: number,
    query: string,
    category: string,
    subCategory: string,
    country: string,
}
export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export type userSearchResult = {
    userCount: number,
    data: IUser[]
}

export type JobSearchResult = {
    totalPages: number,
    jobs: IJob[]
}
//url related types

export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
    keysToRemove?: string[]
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }