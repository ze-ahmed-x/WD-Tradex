'use server'

import { CreateUserParams } from "@/types";
import { connectToDatabase } from "..";
import User from "../models/user.model";

export async function createUser(user: CreateUserParams) {
    await connectToDatabase();
    const newUser = await User.create({ ...user });
    if (!newUser) throw new Error("Failed to create user.");
    console.log(newUser)
    return JSON.parse(JSON.stringify(newUser));
}