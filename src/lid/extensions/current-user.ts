import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

export function currentUser() {
    return Prisma.defineExtension((client) => {
        return client.$extends({
            model: {
                user: {
                    async current() {
                        const {authOptions} = await import("../auth")
                        const session = await getServerSession(authOptions);
                        console.log("Session", session);

                        if (!session?.user?.email) {
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