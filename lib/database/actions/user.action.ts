'use server'

import { CreateUserParams } from "@/types";
import { connectToDatabase } from "..";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt"
import { compileActivationTemplate, compileResetPassTemplate, sendMail } from "@/lib/mail";
import { signJWT, verifyJWT } from "@/lib/jwt";

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
        console.log("email is not varified")
        throw new Error("Please verify your email first");
    }
    user.password = "" // dont want to return the password
    return user;
}

export async function createUser(user: CreateUserParams) {
    // await connectToDatabase();
    const existingUser = await findUser({ email: user.email, cnic: user.cnic, mobile: user.mobile });
    if (existingUser) throw new Error("User already exists")
    const newUser: IUser = await User.create({ ...user, password: await bcrypt.hash(user.password, 10) });
    if (!newUser) throw new Error("Failed to create user.");
    console.log(newUser)
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
    console.log("user: " + username + " cnic: " + cnic + " email:" + email)
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
    console.log(query);
    const user = await User.findOne(query)
    if (!user) return null
    return user;
}

const findUserById = async (id: string) => {
    await connectToDatabase();
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("User not found");
        return user as IUser;
    } catch (error) {
        return null;
    }
}

type activateUserFunc = (jwt: string) => Promise<"userNotExist" | "success" | "alreadyActivate" | "invalidUrl" | "unexpectedError">

export const activateUser: activateUserFunc = async (jwt) => {
    const payload = verifyJWT(jwt, process.env.JWT_USER_ID_SECRET!);
    if (!payload) {
        return "invalidUrl"
    }
    const userId = payload?.id
    const user = await findUserById(userId);
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

export const setUserPassword: setNewPassword = async (userId: string,  password: string) => {
    const user = await findUserById(userId); // this will automatically create db connection
    if (!user) return 'userNotFound'
const hashPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.updateOne ({_id:user._id}, {password: hashPassword})
    if (updatedUser) return 'success'
    return 'uknownError'
}