import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";


export function currentUser() {
    return Prisma.defineExtension((client) => {
        return client.$extends({
            model: {
                user: {
                    async current() {
                        const session = await getServerSession(authOptions);
                        console.log("Session", session);

                        if (!session?.user?.email) {
                            console.log("no session")
                            return null;

                        }
                        const userExist = await client.user.findUnique({
                            where: {email: session.user.email },
                        });

                        return userExist || null ;
                    }
                }
            }
        })
    })
}