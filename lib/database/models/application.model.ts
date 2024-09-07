import { Document, Schema, model, models } from "mongoose";
interface IRequirementStatus {
    requirementId: string;
    completed: boolean;
    verified: boolean;
    comments?: string[];
}

export interface IApplication extends Document{
    userId: string,
    jobId: string,
    projectId: string,
    status: string,
    comments?: string[],
    requirementsStatus?:  IRequirementStatus[]
}

const applicationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    status: { type: String, required: true },
    comments: [{type: String}],
    requirementsStatus: [
      {
        requirementId: {type: Schema.Types.ObjectId, required: true},
        completed: { type: Boolean, default: false },
        verified: { type: Boolean, default: false },
        comments: [{type: String}]
      }
    ]
  }).index({ userId: 1, jobId: 1 }, { unique: true });

  const Application = models.Application || model('Application', applicationSchema);

  export default Application