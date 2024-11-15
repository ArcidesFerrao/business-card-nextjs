"use server"
import { z } from "zod";
import prisma from "@/db/db";
import { NextApiRequest, NextApiResponse } from "next";

// import { zodResolver } from '@hookform/resolvers/zod'

const phoneRegex = /^\d{3} \d{2} \d{2} \d{2} \d{3}$/;

const phoneSchema = z.string().regex(phoneRegex, { message: "Invalid phone number"}) 

const addSchema = z.object({
    company: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email({ message: "Invalid email"}),
    phone: phoneSchema ,
})

export async function addCard(prevState: unknown, formData: FormData) {
    console.log(formData)
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    
    if(result.success === false) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;
    console.log(data.company)

    await prisma.card.create({
        data: {
            company: data.company,
            email: data.email,
            phone: data.phone,
        }
    })
}


export async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" })
    }

    try {
        const validateData = addSchema.parse(req.body);

        res.status(200).json({ message: "Phone number is valid", data: validateData})
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Invalid data"
        res.status(400).json({ message: errorMessage })
    }
}