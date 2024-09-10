import { ProjectStatus } from "@/lib/Constants";
import { Schema, model, models, Document } from "mongoose";
import { IJob } from "./job.model";

export interface IProject extends Document {
    _id: string;
    title: string;
    country: string;
    description: string;
    collaboratingEntity: string;
    collaboratingEntityName?: string;
    status: string;
    totalVacancies?: number;
    totalJobs?: number;
    jobs?: IJob[];
  }

const projectSchema = new Schema({
    title: { type: String, required: true, trim: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    collaboratingEntity: { type: Schema.Types.ObjectId, ref: "Entity", required: true },
    status: { type: String, required: true, enum: Object.values(ProjectStatus), default: ProjectStatus.OPEN},
    jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }]
},
    {
        timestamps: true
    }
)

const Project = models.Project || model('Project', projectSchema);

export default Project;