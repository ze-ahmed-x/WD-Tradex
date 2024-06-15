'use server'

import { connectToDatabase } from ".."
import ProfCategory from "../models/category.model"

export async function getAllProfCats() {
    await connectToDatabase()
    console.log("connected to Database")
    const profCats = await ProfCategory.find();
    if (!profCats) throw new Error("No Categories found");
    return JSON.parse(JSON.stringify(profCats));
}

// export async function createProfCategrory() {
//     await connectToDatabase();
//     await ProfCategory.create({
//         cat: "Masonary",
//         subCats: [
//             {
//                 subCat: 'Brick Laying'
//             },
//             {
//                 subCat: 'Mason Work'
//             }
//         ]
//     })
// }
