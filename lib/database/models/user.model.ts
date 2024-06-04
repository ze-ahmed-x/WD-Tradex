'use server'
import { Schema, model, models } from "mongoose";

interface User {
    photoUrl?: string;
    firstName: string;
    lastName: string;
    cnic: string;
    mobile: string;
    email: string;
    gender: string;
    dob: Date;
    maritalStatus: string;
    religion: string;
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
    appliedJobs?: string[]; // Array of ObjectId references as strings
}

const UserSchema = new Schema({
    photoUrl: { type: String },
    firstName: { type: String, required: true, lowercase: true, trim: true },
    lastName: { type: String, required: true, lowercase: true, trim: true },
    cnic: { type: String, required: true, unique: true, minlength: 13, maxlength: 13 },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    gender: { type: String, required: true},
    dob: { type: Date, required: true },
    maritalStatus: { type: String, required: true },
    religion: { type: String, required: true },
    domicileCity: { type: String, required: true },
    cAddress: { type: String, required: true },
    cProvince: { type: String, required: true },
    cCity: { type: String, required: true },
    pAddress: { type: String, required: true },
    pProvince: { type: String, required: true },
    pCity: { type: String, required: true },
    profession: { type: String, required: true },
    yearsOfExperience: { type: Number },
    professionCat: { type: String, required: true },
    professionSubCat: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "male"},
    appliedJobs: [{ type: Schema.Types.ObjectId, ref: "Jobs" }]
},
    {
        timestamps: true
    }
)

const User = models.User || model('User', UserSchema);

export default User;