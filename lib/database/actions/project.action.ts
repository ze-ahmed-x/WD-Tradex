'use server'
import { CreateProjectParams, UpdateProjectParams } from "@/types";
import { connectToDatabase } from "..";
import Project from "../models/project.model";
import { handleError } from "@/lib/utils";
import Entity from "../models/entity.model";
import Job from "../models/job.model";


export async function createProject(project: CreateProjectParams) {
    try {
        await connectToDatabase();
        const newProject = await Project.create({
            ...project
        })
        if (!newProject) throw new Error("Could not create project");
        return JSON.parse(JSON.stringify(newProject))
    } catch (error) {
        handleError(error);
    }
}

export async function UpdateProject(project: UpdateProjectParams) {
    try {
        await connectToDatabase();
        // should we read the document again?
        const updatedProj = await Project.findByIdAndUpdate(project._id, {
            ...project
        })
        if (!updatedProj) throw new Error("Could not Update project");
        return JSON.parse(JSON.stringify(updatedProj))
    } catch (error) {
        handleError(error);
    }
}

export async function getProjectById(id: string) {
    try {
        await connectToDatabase();
        const project = await Project.findById(id)
            .populate({ path: 'collaboratingEntity', model: Entity, select: '_id name' })
            .populate({ path: 'jobs', model: Job })
        // .exec();
        if (!project) throw new Error("Could not find project");
        const totalVacancies = project.jobs?.length > 0 ? project.jobs.reduce((acc: any, job: any) => acc + job.vacancies, 0) : 0;
        const totalJobs = project.jobs ? project.jobs.length : 0;
        // const proj = { ...project._doc}
        const proj = { ...project._doc, collaboratingEntity: project.collaboratingEntity._id, collaboratingEntityName: project.collaboratingEntity.name, totalVacancies: totalVacancies, totalJobs: totalJobs }
        return JSON.parse(JSON.stringify(proj));
    } catch (error) {
        handleError(error); 
    }
}

export async function getAllProjects() {
    // we need to return the total vacancies and number of job types
    try {
        await connectToDatabase();
        const projects = await Project.aggregate([
            {
                $lookup: {
                    from: 'jobs', // Collection name for jobs
                    localField: 'jobs',
                    foreignField: '_id',
                    as: 'jobDetails'
                }
            },
            {
                $lookup: {
                    from: 'entities', // Collection name for entities, in this case we use the exact name which we have in database
                    localField: 'collaboratingEntity',
                    foreignField: '_id',
                    as: 'collaboratingEntityDetails'
                }
            },
            {
                $addFields: {
                    totalVacancies: { $ifNull: [{ $sum: "$jobDetails.vacancies" }, 0] },
                    totalJobs: { $size: "$jobDetails" },
                    // collaboratingEntityName: { $size: '$collaboratingEntityDetails' }
                    collaboratingEntityName: { $arrayElemAt: ['$collaboratingEntityDetails.name', 0] }
                }
            },
            {
                $project: {
                    title: 1,
                    country: 1,
                    description: 1,
                    collaboratingEntity: 1,
                    collaboratingEntityName: 1,
                    totalVacancies: 1,
                    totalJobs: 1,
                    createdAt: 1
                }
            },
            {
                $sort: { createdAt : -1}
            }
        ])
        if (!projects) throw new Error("Project not found");
        console.log(projects)
        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        handleError(error);
    }
}
