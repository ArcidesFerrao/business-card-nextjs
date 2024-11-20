/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthOptions } from "next-auth";
// import Google from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db, { baseDb } from "@/db/db";
import { PrismaClient } from "@prisma/client";


export const authOptions = {
    adapter: PrismaAdapter(baseDb as unknown as PrismaClient),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "database",
        maxAge: 5 * 24 * 60 * 60 
    },
    pages: {
        signIn: "/api/auth/signin",
        error: "/api/auth/error",
    },
    callbacks: {
        async signIn({ user, account, profile}) {
            if (user.email) {
                const existUser = await db.user.findUnique({
                    where: { email: user.email },
                });

                if (!existUser) {
                    await db.user.create({
                        data: {
                            email: user.email,
                            name: user.name || user.email.split('@')[0],
                            image: user.image || "",
                        }
                    })
                }
            }
            return true
        },
        async session({session, user}) {
            session.user = user;
            return session
        }
    },
    events: {
        async signIn({ user }) {
            console.log({user}, "Signed In");
        }
    },
    debug: true,
    
} satisfies AuthOptions;