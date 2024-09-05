import { Schema, model, models, Document } from "mongoose";

export interface IProject extends Document {
    _id: string;
    title: string;
    country: string;
    description: string;
    collaboratingEntity: string;
    collaboratingEntityName?: string;
    totalVacancies?: number;
    totalJobs?: number;
    jobs?: string[];
  }

const projectSchema = new Schema({
    title: { type: String, required: true, trim: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    collaboratingEntity: { type: Schema.Types.ObjectId, ref: "Entity", required: true },
    jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }]
},
    {
        timestamps: true
    }
)

const Project = models.Project || model('Project', projectSchema);

export default Project;