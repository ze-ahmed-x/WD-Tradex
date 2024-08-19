import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
    _id: string;
    customUserId: string;
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
    role?: string;
    termsAccepted: boolean;
    emailVarified?: Date;
    password: string;
    appliedJobs?: string[]; // Array of ObjectId references as strings
}

const UserSchema = new Schema({
    customUserId: {type: Number},
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
    domicileProvince: { type: String, required: true },
    domicileCity: { type: String, required: true },
    cAddress: { type: String, required: true },
    cProvince: { type: String, required: true },
    cCity: { type: String, required: true },
    pAddress: { type: String, required: true },
    pProvince: { type: String, required: true },
    pCity: { type: String, required: true },
    profession: { type: String, required: true },
    yearsOfExperience: { type: Number },
    professionCat: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    professionSubCat: { type: Schema.Types.ObjectId, required: true },
    role: { type: String, required: true, default: "seeker"},
    termsAccepted: { type: Boolean, required: true},
    emailVarified: { type: Date},
    password: { type: String, required: true },
    appliedJobs: [{ type: Schema.Types.ObjectId, ref: "Jobs" }]
},
    {
        timestamps: true
    }
)

UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isNew) {
        return next();
    }

    // Find the highest customUserId in the database
    const lastUser = await models.User.findOne().sort({ customUserId: -1 });
    const lastUserId = lastUser ? lastUser.customUserId : 1000;

    // Set the new customUserId to lastUserId + 1
    user.customUserId = lastUserId + 1;

    next();
});

const User = models.User || model('User', UserSchema);

export default User;