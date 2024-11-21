import { baseDb } from "@/db/db";
import { authOptions } from "@/lid/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
// import { z } from "zod";

// const phoneRegex = /^\d{3} \d{2} \d{2} \d{2} \d{3}$/;

// const phoneSchema = z.string().regex(phoneRegex, { message: "Invalid phone number"}) 

// const addSchema = z.object({
//     company: z.string().min(3, "Username must be at least 3 characters"),
//     email: z.string().email({ message: "Invalid email"}),
//     phone: phoneSchema ,
// })

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" })
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session?.user.email) {
        return res.status(401).json({ error: "unauthorized" });
    }

    const { company, email, phone  } = req.body;

    if (!company) {
        return res.status(400).json({ error: "Company not found" })
    }

    try {
        // const validateData = addSchema.parse(req.body);

        const user = await baseDb.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(404).json({ error: "user not found"})
        }

        const newCard = await baseDb.card.create({
            data: {
                company,
                email,
                phone,
                authorId: user.id,
            }
        })

        res.status(200).json({ message: "Added card: ", data: newCard})
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Invalid data"
        res.status(500).json({ message: errorMessage })
    }
}