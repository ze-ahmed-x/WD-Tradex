'use server'
import { CreateApplicationParams, UpdateApplParams, UpdateApplReqParams } from "@/types";
import { connectToDatabase } from "..";
import { getJobDetailById } from "./job.actions";
import Application from "../models/application.model";
import { handleError } from "@/lib/utils";

export async function createNewJobApplication(application: CreateApplicationParams) {
    try {
        await connectToDatabase();
        const jobDetail = await getJobDetailById(application.jobId)
        if (!jobDetail) throw new Error('Job not found for the given jobId');
        if (!application.status) {
            application.status = 'selected'
        }
        const requirementsStatus: any[] = []
        jobDetail.requirements.map((req: any) => {
            requirementsStatus.push({
                requirementId: req._id,
                completed: false,
                verified: false
            })
        })
        console.log(requirementsStatus);
        const newApplication = await Application.create({
            ...application, projectId: jobDetail.projectId, requirementsStatus: requirementsStatus
        })
        if (!newApplication) throw new Error("Application could not be created");
        return JSON.parse(JSON.stringify(newApplication));
    } catch (error) {
        handleError(error);
    }
}

export async function updateJobApplLessRequirements(application: UpdateApplParams) {
    try {
        if (!application.applicationId) throw new Error("Application Id not found");
        await connectToDatabase();
        const existingVals = await Application.findById(application.applicationId);
        if (!existingVals) throw new Error("Application not found");
        const updatedFields: any = {} 
        if (typeof application.status !== 'undefined') {
            updatedFields['$set'] = {}
            updatedFields['$set']['status'] = application.status;
        }
        if (typeof application.comment !== 'undefined') {
            updatedFields['$push'] = {}
            updatedFields['$push']['comments'] = application.comment
        }
        console.log(updatedFields)
        // const comments = existingVals.comments ? [...existingVals.comments] : [];
        // if (application.comment) {
        //     comments.push(application.comment)
        // }
        // const newVals = {
        //     status: application.status ? application.status : existingVals.status,
        //     comments: comments
        // }
        const updatedApplication = await Application.findByIdAndUpdate(application.applicationId, updatedFields,
            {
                new: true
            }
        )
        if (!updatedApplication) throw new Error("Application update failed");
        return JSON.parse(JSON.stringify(updatedApplication));
    } catch (error) {
        handleError(error);
    }
}

export async function updateJobApplRequirement(applReq: UpdateApplReqParams) {
    try {
        if (!applReq.applicationId || !applReq.requirementId) throw new Error("Application/ Requirement Id is null");
        await connectToDatabase();
        const updatedFields: any = {}
        if (typeof applReq.completed !== 'undefined' || typeof applReq.verified !== 'undefined') {
            updatedFields["$set"] = {}
            if (typeof applReq.completed !== 'undefined') {
                updatedFields["$set"]["requirementsStatus.$.completed"] = applReq.completed
            }
            if (typeof applReq.verified !== 'undefined') {
                if (applReq.verified === false) {
                    updatedFields["$set"]["requirementsStatus.$.verified"] = false;
                    updatedFields["$set"]["requirementsStatus.$.completed"] = false;
                }
                else {
                    updatedFields["$set"]["requirementsStatus.$.verified"] = true;
                }
            }
        }
        if (typeof applReq.comment !== 'undefined') {
            updatedFields["$push"] = { "requirementsStatus.$.comments": applReq.comment }
        }
        if (!updatedFields) throw new Error("Nothing to update");
        // find the specific application and requirement
        const existingAppl = await Application.findOne({ _id: applReq.applicationId, 'requirementsStatus.requirementId': applReq.requirementId })
        if (!existingAppl) throw new Error("Application or requirement couldn't be found");
        // update the required fields
        const updatedAppl = await Application.findOneAndUpdate({ _id: applReq.applicationId, 'requirementsStatus.requirementId': applReq.requirementId }, updatedFields,
            { new: true, runValidators: true }
        )
        return JSON.parse(JSON.stringify(updatedAppl));
        // console.log(updatedAppl);
    } catch (error) {
        handleError(error);
    }
}

export async function addNewRequirementInApplications (jobId: string, requirementId: string) {
    try {
        await connectToDatabase()
        const applCount = await Application.countDocuments({jobId: jobId})
        if (applCount> 0) {
            const updatedAppls = await Application.updateMany({jobId: jobId}, {$push: {
                requirementsStatus: {
                    requirementId: requirementId,
                    completed: false,
                    verified: false
                }
            }});
            if (!updatedAppls) throw new Error("Couldn't update the applications");
        }
    } catch (error) {
        handleError(error)
    }
}

export async function removeRequirementFromApplications(jobId: string, requirementId: string) {
    try {
        await connectToDatabase();
        const applCount = await Application.countDocuments({jobId: jobId, 'requirementsStatus.requirementId': requirementId});
        if (applCount> 0) {

            const updatedAppls = await Application.updateMany({jobId: jobId}, {$pull : {
                requirementsStatus: { requirementId: requirementId }
            }})
            if (!updatedAppls) throw new Error("Couln't update applications")
        }
    } catch (error) {
        
    }
}