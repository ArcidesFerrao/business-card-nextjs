"use server"
import { z } from "zod";
import db from "@/db/db";
import idCard from "./idCard";


const phoneRegex = /^\d{3} \d{2} \d{2} \d{2} \d{3}$/;

const phoneSchema = z.string().regex(phoneRegex, { message: "Invalid phone number"}) 

const addSchema = z.object({
    company: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email({ message: "Invalid email"}),
    phone: phoneSchema ,
})

export async function addCard(prev, formData: FormData){

    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    
    if(!result.success) {

        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    const data = result.data;
    console.log(data.company)

    const authorId = await idCard();
    
    await db.card.create({
        data: {
            company: data.company,
            email: data.email,
            phone: data.phone,
            authorId: authorId,
        }
    })
}

