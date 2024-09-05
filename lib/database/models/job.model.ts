import { Schema, model, models, Document } from "mongoose";

export interface IRequirement {
    _id: string;
    description: string;
    optionalFlag: boolean;
  }

  export interface IJob extends Document {
    _id: string;
    projectId: string;
    title: string;
    description: string;
    state?: string;
    city?: string;
    vacancies: number;
    professionCat: string;
    professionSubCat: string;
    requirements?: IRequirement[];
  }

const requirementSchema = new Schema({
    description: { type: String, required: true, trim: true },
    optionalFlag: { type: Boolean, default: false, required: true }
})

const jobSchema = new Schema(
    {
        projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        state: { type: String, trim: true},
        city:  { type: String, trim: true},
        professionCat: { type: Schema.Types.ObjectId, ref: "Category", required: true },
        professionSubCat: { type: Schema.Types.ObjectId, required: true },
        vacancies: { type: Number, required: true },
        requirements: [{ type: requirementSchema }]
    },
    {
        timestamps: true
    }
)

const Job = models.Job || model('Job', jobSchema);

export default Job;