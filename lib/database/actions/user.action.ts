'use server'

import { CreateUserParams, GetAllUserParams } from "@/types";
import { connectToDatabase } from "..";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt"
import { compileActivationTemplate, compileResetPassTemplate, sendMail } from "@/lib/mail";
import { signJWT, verifyJWT } from "@/lib/jwt";
import { UTApi } from 'uploadthing/server';
import ProfCategory, { IprofSubCat } from "../models/category.model";
import { ObjectId } from 'mongoose';
import mongoose from "mongoose";
import { handleError } from "@/lib/utils";

export async function loginUser(credentials: { username: string, password: string }) {
    if (!credentials.username || !credentials.password) {
        throw new Error("Missing credentials")
    }
    await connectToDatabase()
    const user = await findUser({ username: credentials.username })
    if (!user) {
        throw new Error("User not found")
    }
    const isCorrectPassword = await bcrypt.compare(credentials.password, user.password)
    if (!isCorrectPassword) {
        throw new Error("Invalid credentials")
    }
    if (!user.emailVarified) {
        // console.log("email is not varified")
        throw new Error("Please verify your email first");
    }
    user.password = "" // dont want to return the password
    return user;
}

export async function updateUser(userId: string, data: Omit<CreateUserParams, "password" | "cnic" | "email" | "termsAccepted">) {
    const user = await findUserByIdInternal(userId)
    if (!user) throw new Error("User not found")
    const updatedUser = await User.updateOne({ _id: user._id }, { $set: { ...data } })
    if (!updateUser) throw new Error("Sorry, data couldn't be updated, try again later sometime.")
    return true;
}
export async function createUser(user: CreateUserParams) {
    // await connectToDatabase();
    const existingUser = await findUser({ email: user.email, cnic: user.cnic, mobile: user.mobile });
    if (existingUser) throw new Error("User already exists")
    const newUser: IUser = await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });
    if (!newUser) throw new Error("Failed to create user.");
    // console.log(newUser)
    // send email for varification
    const jwtId = signJWT({ id: newUser._id }, process.env.JWT_USER_ID_SECRET!);
    const url = `${process.env.NEXTAUTH_URL}/signup/activation/${jwtId}`;
    const emailBody = await compileActivationTemplate(newUser.firstName, url);
    const mail = sendMail({
        to: newUser.email,
        subject: "Please verify your email",
        body: emailBody
    })
    return JSON.parse(JSON.stringify(newUser));
}

// respose is not parsed in json because we are going to use this function internally
async function findUser({ username, cnic, email, mobile }: { username?: string, cnic?: string, email?: string, mobile?: string }): Promise<IUser | null> {
    // console.log("user: " + username + " cnic: " + cnic + " email:" + email)
    if (!username && !cnic && !email && !mobile) throw new Error("Please provide at least usernam, email, CNIC or mobile");
    await connectToDatabase();
    let query = {}
    if (username) {
        query = { $or: [{ email: username }, { cnic: username }] }

    }
    else {
        const extQuery: { $or?: any[] } = {}
        query = { $or: [] };
        if (cnic) {
            extQuery.$or = extQuery.$or || [];
            extQuery.$or.push({ cnic: cnic })
        }
        if (email) {
            extQuery.$or = extQuery.$or || [];
            extQuery.$or.push({ email: email })
        }
        if (mobile) {
            extQuery.$or = extQuery.$or || [];
            extQuery.$or.push({ mobile: mobile })
        }
        query = extQuery;
    }
    // else if (cnic && email) {
    //     query =  {$or: [{email: email}, {cnic: cnic}]}
    // }
    // else if (cnic) {
    //     query = {cnic: cnic}
    // }
    // else if (email) {
    //     query = {email: email}
    // }
    // console.log(query);
    const user = await User.findOne(query)
    if (!user) return null
    return user;
}

export const findUserByIdExternal = async (id: string) => {
    try {
        const user = await findUserByIdInternal(id);
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        handleError(error)
    }
}

const findUserByIdInternal = async (id: string) => {
    await connectToDatabase();
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("User not found");
        return user as IUser;
    } catch (error) {
        return null;
    }
}

export const getAllUser = async ({page, limit, username, userId, category, subCategory, status}:GetAllUserParams) => {
    try {
        // resolve conditions
        const conditions = {
            $and: [
                // match fist name and last name
                username ? // user name
                    {
                        $or: [{ firstName: { $regex: username, $options: 'i' } },
                        { lastName: { $regex: username, $options: 'i' } }]
                    }
                    : {},
                // search with category id
                userId ? { customUserId: Number(userId) } : {},
                // search with category
                category ? { professionCat: category } : {},
                // search with sub category
                subCategory ? { professionSubCat: subCategory } : {},
                status ? {status: status} : {}
            ]
        }
        await connectToDatabase();
        const userCount = await User.countDocuments(conditions)
        if (userCount> 0) {
            const skipAmount = (page - 1) * limit
            const users = await User.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit)
            if (!users) throw new Error("Users not found");
            return {
                data: JSON.parse(JSON.stringify(users)),
                userCount: userCount
            }
        }
        else {
            return {
                data: [],
                userCount: userCount
            }
        }
    } catch (error) {
        handleError(error)
    }
}

const papulateUser = (query: any) => {
    return query
        .populate({ path: 'professionCat', model: ProfCategory, select: '_id cat subCats' })
}

export const findDetailedUserById = async (id: string) => {
    await connectToDatabase();
    const user = await papulateUser(User.findById(id));
    if (!user) throw new Error("User not found");
    const data = JSON.parse(JSON.stringify(user));
    const subCategoryData = JSON.parse(JSON.stringify(data.professionCat.subCats));
    const userWithCat = {
        ...data,
        professionCat: user.professionCat.cat,
        professionSubCat: subCategoryData.find((scat: any) => scat._id === data.professionSubCat).subCat,
        dob: new Date(user.dob)
    }
    return JSON.parse(JSON.stringify(userWithCat));
}

type activateUserFunc = (jwt: string) => Promise<"userNotExist" | "success" | "alreadyActivate" | "invalidUrl" | "unexpectedError">

export const activateUser: activateUserFunc = async (jwt) => {
    const payload = verifyJWT(jwt, process.env.JWT_USER_ID_SECRET!);
    if (!payload) {
        return "invalidUrl"
    }
    const userId = payload?.id
    const user = await findUserByIdInternal(userId);
    if (!user) {
        return "userNotExist"
    }
    else if (user?.emailVarified) {
        return "alreadyActivate"
    }
    else {
        await connectToDatabase()
        const user = await User.updateOne({ _id: userId }, { $set: { emailVarified: Date.now() } })
        if (!user) {
            return "unexpectedError"
        }
        else {
            return "success"
        }
    }
}

export const restUserPassword = async (username: string) => {
    const user = await findUser({ username })
    if (!user) throw new Error("User not found")
    const token = signJWT({ id: user._id }, process.env.JWT_USER_RESET_SECRET!);
    const url = `${process.env.NEXTAUTH_URL}/resetPassword/${token}`;
    const emailBody = await compileResetPassTemplate(user.firstName, url);
    const mail = await sendMail({
        to: user.email,
        subject: "Reset Password",
        body: emailBody
    });
}

type setNewPassword = (userId: string, password: string) => Promise<'userNotFound' | 'success' | 'uknownError'>

export const setUserPassword: setNewPassword = async (userId: string, password: string) => {
    const user = await findUserByIdInternal(userId); // this will automatically create db connection
    if (!user) return 'userNotFound'
    const hashPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.updateOne({ _id: user._id }, { password: hashPassword })
    if (updatedUser) return 'success'
    return 'uknownError'
}

type saveProfilePic = (userId: string, pictureUrl: string) => Promise<'userNotFound' | 'success' | 'uknownError'>

export const saveProfilePictureUrl: saveProfilePic = async (userId: string, pictureUrl: string) => {
    const user = await findUserByIdInternal(userId); // this will automatically create db connection
    if (!user) return 'userNotFound'
    const updatedUser = await User.updateOne({ _id: userId }, { photoUrl: pictureUrl })
    // delete old profile picture from upload thing
    const currentImageKey = user.photoUrl?.substring(user.photoUrl?.lastIndexOf('/') + 1)
    if (currentImageKey) {
        try {
            const utapi = new UTApi();
            await utapi.deleteFiles(currentImageKey)
        } catch (error) {
            console.log(error)
        }
    }

    if (updatedUser) return "success"
    return "uknownError"
}