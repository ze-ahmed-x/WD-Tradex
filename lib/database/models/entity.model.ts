import { Schema, model, models, Document } from "mongoose";

export interface IEntity extends Document {
    _id: string
    name: string;
  }

const entitySchema = new Schema({
    name: { type: String, required: true, trim: true, unique: true},
},
    {
        timestamps: true
    }
)

const Entity = models.Entity || model('Entity', entitySchema);

export default Entity;