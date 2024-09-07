'use server'

import { CreateJobParams, GetAllJobsParams, JobRequirementParams } from "@/types";
import { connectToDatabase } from "..";
import Job from "../models/job.model";
import { handleError } from "@/lib/utils";
import { addNewRequirementInApplications, removeRequirementFromApplications } from "./application.action";

export async function createJob(job: CreateJobParams) {
    try {
        await connectToDatabase()
        const newJob = await Job.create({
            ...job
        })
        if (!newJob) throw new Error("Job could not be created");
        return JSON.parse(JSON.stringify(newJob));
    } catch (error) {
        handleError(error);
    }
}

export async function getJobbyId(id: string) {
    try {
        await connectToDatabase()
        const job = await Job.findById(id);
        if (!job) throw new Error("Could not find the job");
        return JSON.parse(JSON.stringify(job));
    } catch (error) {
        handleError(error);
    }
}

export async function getJobsByProjectId(projectId: string) {
    try {
        await connectToDatabase();
        const jobs = await Job.find({ projectId: projectId });
        if (!jobs) throw new Error("Could not find the jobs for the project");
        return JSON.parse(JSON.stringify(jobs));
    } catch (error) {
        handleError(error);
    }
}

export async function getJobDetailById(jobId: string) {
    try {
        await connectToDatabase();
        const projectId = await Job.findById(jobId).select("projectId requirements");
        if (!projectId) throw new Error("Could not find project with given jobId");
        return projectId;
    } catch (error) {
        handleError(error);
    }
}

export async function getAllJobs() {
    try {
        await connectToDatabase();
        const jobs = await Job.find();
        if (!jobs) throw new Error("Could not find any job");
        return JSON.parse(JSON.stringify(jobs));
    } catch (error) {
        handleError(error);
    }
}

export async function getJobsWithCountry({limit = 20, page = 1}: GetAllJobsParams) {
    try {
        await connectToDatabase();
        const jobs = await Job.aggregate([
                        {
                          $lookup: {
                            from: 'projects', // The collection to join with (Project collection)
                            localField: 'projectId', // The field in Job model
                            foreignField: '_id', // The field in Project model
                            as: 'project', // The field name to store the joined document
                          },
                        },
                        {
                          $unwind: '$project', // Flatten the array to get a single project document
                        },
                        {
                          $project: {
                            _id: 1,
                            projectId: 1,
                            title: 1,
                            description: 1,
                            state: 1,
                            city: 1,
                            vacancies: 1,
                            country: '$project.country', // Add the country field from Project
                          },
                        },
                        {
                            $sort: {createdAt: -1}
                        },
                        {
                          $skip: (page - 1) * limit, // Skip records according to the page number
                        },
                        {
                          $limit: limit, // Limit the number of records to the specified amount per page
                        }
                      ]);
                      if (!jobs) throw new Error('Jobs not found');
                      return JSON.parse(JSON.stringify(jobs))
    } catch (error) {
        handleError(error);
    }
}

// async function fetchJobsWithFilters({ page = 1, limit = 20, country, state, city, query }) {
//     try {
//       const matchConditions = {};
//       // Apply filters if they exist
//       if (country) {
//         matchConditions['project.country'] = country;
//       }
//       if (state) {
//         matchConditions.state = state;
//       }
//       if (city) {
//         matchConditions.city = city;
//       }
//       if (query) {
//         matchConditions['title'] = { $regex: query, $options: 'i' }; // Case-insensitive search for title
//       }
  
//       const jobsWithFilters = await Job.aggregate([
//         {
//           $lookup: {
//             from: 'projects', // The collection to join with (Project collection)
//             localField: 'projectId', // The field in Job model
//             foreignField: '_id', // The field in Project model
//             as: 'project', // The field name to store the joined document
//           },
//         },
//         {
//           $unwind: '$project', // Flatten the array to get a single project document
//         },
//         {
//           $match: matchConditions, // Apply the match conditions
//         },
//         {
//           $project: {
//             _id: 1,
//             title: 1,
//             description: 1,
//             state: 1,
//             city: 1,
//             vacancies: 1,
//             country: '$project.country', // Add the country field from Project
//           },
//         },
//         {
//           $skip: (page - 1) * limit, // Skip records according to the page number
//         },
//         {
//           $limit: limit, // Limit the number of records to the specified amount per page
//         },
//       ]);
  
//       return jobsWithFilters;
//     } catch (error) {
//       console.error('Error fetching jobs with filters:', error);
//       throw error;
//     }
//   }

export async function addJobRequirement(req: JobRequirementParams) {
    try {
        await connectToDatabase();
        const job = await Job.findById(req.jobId);
        if (!job) throw new Error("Could not find the Job");
        const updatedJob = await Job.findByIdAndUpdate(req.jobId, {
            $push: {
                requirements: {
                    description: req.description,
                    optionalFlag: req.optionalFlag
                }
            }
        },
            {
                new: true, runValidators: true
            })
        if (!updatedJob) throw new Error("Could not Update the Job");
        // add the subject requirment in all relevant jobs
        await addNewRequirementInApplications(updatedJob._id, updatedJob.requirements[updatedJob.requirements.length - 1]._id)

        return JSON.parse(JSON.stringify(updatedJob));
    } catch (error) {
        handleError(error);
    }
}

export async function removeJobRequirement({ jobId, requirementId}: {jobId: string, requirementId: string}) {
    try {
        await connectToDatabase();
        const job = await Job.findOne({_id: jobId, 'requirements._id': requirementId});
        if (!job) throw new Error("Could not find the Job with specified jobId and requirementId");
        const updatedJob = await Job.findByIdAndUpdate(jobId, {
            $pull: { requirements: {_id: requirementId} }
        });
        if (!updatedJob) throw new Error ("Couldn't update the job");
        await removeRequirementFromApplications(jobId, requirementId)
        return JSON.parse(JSON.stringify(updatedJob));
    } catch (error) {
        handleError(error);
    }
}