'use server'

import { CreateUserParams } from "@/types";
import { connectToDatabase } from "..";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt"

export async function loginUser(credentials: {username: string, password: string}) {
    if (!credentials.username || !credentials.password) {
        throw new Error ("Missing credentials")
    } 
    const user = await findUser({ username: credentials.username})
    if (!user) {
        throw new Error("User not found")
    }
    const isCorrectPassword = await bcrypt.compare(credentials.password, user.password)
    if (!isCorrectPassword) {
        throw new Error("Invalid credentials")
    }
    user.password = "" // dont want to return the password
    return user;
}

export async function createUser(user: CreateUserParams) {
    // await connectToDatabase();
    const existingUser = await findUser({ email: user.email, cnic: user.cnic, mobile: user.mobile });
    if (existingUser) throw new Error("User already exists")
    const newUser = await User.create({ ...user, password : await bcrypt.hash(user.password, 10) });
    if (!newUser) throw new Error("Failed to create user.");
    console.log(newUser)
    return JSON.parse(JSON.stringify(newUser));
}

// respose is not parsed in json because we are going to use this function internally
async function findUser( {username, cnic, email, mobile}: {username?: string, cnic?: string, email?: string, mobile?: string}) : Promise<IUser | null>{
    console.log("user: " + username + " cnic: " + cnic + " email:" + email)
    if (!username && !cnic && !email && !mobile) throw new Error("Please provide at least usernam, email, CNIC or mobile");
    await connectToDatabase();
    let query = {}
    if (username) {
        query = {$or: [{email: username}, {cnic: username}]}
        
    }
    else {
        const extQuery: { $or?: any[] } = {} 
        query = {$or: []};
        if (cnic){
            extQuery.$or = extQuery.$or || [];
            extQuery.$or.push({ cnic: cnic })
        }
        if (email){
            extQuery.$or = extQuery.$or || [];
            extQuery.$or.push({ email: email })
        }
        if (mobile){
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