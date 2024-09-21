'use server'
import { handleError } from "@/lib/utils";
import { connectToDatabase } from "..";
import Entity from "../models/entity.model";

export async function createEntity( name: string) {
    try {
        await connectToDatabase();
        const entity = await Entity.create({
            name: name
        })
        if (!entity) throw new Error ("Could not create entity");
        return JSON.parse(JSON.stringify(entity));
    } catch (error) {
        handleError(error)
    }
}

export async function getAllEntities() {
    try {
        await connectToDatabase();
        const entities = await Entity.find();
        if (!entities) throw new Error ("Could not find entities");
        return JSON.parse(JSON.stringify(entities));
    } catch (error) {
        handleError(error)
    }
}