'use server'

import { handleError } from "@/lib/utils"
import { connectToDatabase } from ".."
import ProfCategory from "../models/category.model"

export async function getAllProfCats() {
    try {
        await connectToDatabase();
        const profCats = await ProfCategory.find();
        if (!profCats) throw new Error("No Categories found");
        return JSON.parse(JSON.stringify(profCats));
    } catch (error) {
        handleError(error)
    }
}

// export async function createProfCategrory() {
    // await connectToDatabase();
    // await ProfCategory.create({
    //     cat: "test",
    //     subCats: [
    //         {
    //             subCat: 'Brick Laying'
    //         },
    //         {
    //             subCat: 'Mason Work'
    //         }
    //     ]
    // })
    // await ProfCategory.insertMany(
    //     [
    //         {
    //           "cat": "IT",
    //           "subCats": [
    //             { "subCat": "Software Developer" },
    //             { "subCat": "System Administrator" },
    //             { "subCat": "Network Engineer" },
    //             { "subCat": "Database Administrator" },
    //             { "subCat": "Cybersecurity Specialist" },
    //             { "subCat": "IT Support" },
    //             { "subCat": "DevOps Engineer" },
    //             { "subCat": "Data Scientist" }
    //           ]
    //         },
    //         {
    //           "cat": "Construction",
    //           "subCats": [
    //             { "subCat": "Bricklayer" },
    //             { "subCat": "Carpenter" },
    //             { "subCat": "Electrician" },
    //             { "subCat": "Plumber" },
    //             { "subCat": "Roofer" },
    //             { "subCat": "Welder" },
    //             { "subCat": "Mason" },
    //             { "subCat": "Painter" }
    //           ]
    //         },
    //         {
    //           "cat": "Healthcare",
    //           "subCats": [
    //             { "subCat": "Doctor" },
    //             { "subCat": "Nurse" },
    //             { "subCat": "Pharmacist" },
    //             { "subCat": "Dentist" },
    //             { "subCat": "Physical Therapist" },
    //             { "subCat": "Radiologist" },
    //             { "subCat": "Surgeon" },
    //             { "subCat": "Psychologist" }
    //           ]
    //         },
    //         {
    //           "cat": "Education",
    //           "subCats": [
    //             { "subCat": "Teacher" },
    //             { "subCat": "Professor" },
    //             { "subCat": "Tutor" },
    //             { "subCat": "Librarian" },
    //             { "subCat": "Education Administrator" },
    //             { "subCat": "School Counselor" },
    //             { "subCat": "Special Education Teacher" },
    //             { "subCat": "Teaching Assistant" }
    //           ]
    //         },
    //         {
    //           "cat": "Finance",
    //           "subCats": [
    //             { "subCat": "Accountant" },
    //             { "subCat": "Financial Analyst" },
    //             { "subCat": "Banker" },
    //             { "subCat": "Auditor" },
    //             { "subCat": "Insurance Agent" },
    //             { "subCat": "Investment Advisor" },
    //             { "subCat": "Tax Advisor" },
    //             { "subCat": "Loan Officer" }
    //           ]
    //         },
    //         {
    //           "cat": "Arts & Media",
    //           "subCats": [
    //             { "subCat": "Graphic Designer" },
    //             { "subCat": "Photographer" },
    //             { "subCat": "Journalist" },
    //             { "subCat": "Musician" },
    //             { "subCat": "Actor" },
    //             { "subCat": "Film Director" },
    //             { "subCat": "Writer" },
    //             { "subCat": "Editor" }
    //           ]
    //         },
    //         {
    //           "cat": "Transportation",
    //           "subCats": [
    //             { "subCat": "Truck Driver" },
    //             { "subCat": "Pilot" },
    //             { "subCat": "Bus Driver" },
    //             { "subCat": "Train Conductor" },
    //             { "subCat": "Ship Captain" },
    //             { "subCat": "Taxi Driver" },
    //             { "subCat": "Logistics Manager" },
    //             { "subCat": "Delivery Driver" }
    //           ]
    //         },
    //         {
    //           "cat": "Hospitality",
    //           "subCats": [
    //             { "subCat": "Hotel Manager" },
    //             { "subCat": "Chef" },
    //             { "subCat": "Waiter/Waitress" },
    //             { "subCat": "Bartender" },
    //             { "subCat": "Housekeeper" },
    //             { "subCat": "Concierge" },
    //             { "subCat": "Event Planner" },
    //             { "subCat": "Tour Guide" }
    //           ]
    //         },
    //         {
    //             "cat": "Retail",
    //             "subCats": [
    //               { "subCat": "Cashier" },
    //               { "subCat": "Sales Associate" },
    //               { "subCat": "Store Manager" },
    //               { "subCat": "Stock Clerk" },
    //               { "subCat": "Merchandiser" },
    //               { "subCat": "Customer Service Representative" },
    //               { "subCat": "Visual Merchandiser" },
    //               { "subCat": "Buyer" }
    //             ]
    //           },
    //           {
    //             "cat": "Legal",
    //             "subCats": [
    //               { "subCat": "Lawyer" },
    //               { "subCat": "Paralegal" },
    //               { "subCat": "Legal Secretary" },
    //               { "subCat": "Judge" },
    //               { "subCat": "Court Reporter" },
    //               { "subCat": "Mediator" },
    //               { "subCat": "Legal Assistant" },
    //               { "subCat": "Compliance Officer" }
    //             ]
    //           }]
    // )
// }
