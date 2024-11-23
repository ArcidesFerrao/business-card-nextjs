/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthOptions } from "next-auth";
// import Google from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db, { baseDb } from "@/db/db";
import Google from "next-auth/providers/google";

export const authOptions = {
    adapter: PrismaAdapter(baseDb),
    // adapter: PrismaAdapter(baseDb as unknown as PrismaClient),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!
        }) ,
    ],
    session: {
        strategy: "database",
        maxAge:  60 * 60 
    },
    pages: {
        signIn: "/api/auth/signin",
        error: "/api/auth/error",
    },
    callbacks: {
        async jwt({ token, user, account }) {
            console.log("Account token:", account?.access_token);
            if (account && user) {
                token.accessToken = (account.access_token as string | undefined) ?? null;
                token.email = user.email ?? null;
            }
            return token;
        },
        async signIn({ user, account, profile}) {
            if (account?.provider === 'github' || account?.provider === "google" ) {
                const existingAccount = await db.account.findUnique({
                    where: {
                        provider_providerAccountId: {
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                        }
                    },
                });
                if (!existingAccount) {
                    
                    const existingUser = await db.user.findUnique({
                        where: {
                            email: user.email || "",
                        }
                    })
    
                    if (existingUser) {
                        await db.account.create({
                            data: {
                                userId: existingUser.id,
                                provider: account.provider,
                                providerAccountId: account.providerAccountId,
                                accessToken: account.access_token,
                            },
                        });
                    } else {
                        const newUser = await db.user.create({
                            data: {
                                email: user.email!,
                                name: user.name,
                                image: user.image 
                            }
                        });
    
                        await db.account.create({
                            data: {
                                userId: newUser.id,
                                provider: account.provider,
                                providerAccountId: account.providerAccountId,
                                accessToken: account.access_token,
                            },
                        });
                    }
                }
            }
            return true;
        },
        async session({session, token}) {
            if (token) {
                session.user.email = token.email ?? null;
            session.user.accessToken = (token.accessToken as string | undefined) ?? null;
        }
            
            return session;
        },
        async redirect({ url, baseUrl}) {
            if (url === "/api/auth/callback/github") {
                    return baseUrl;
                }
            return url;
        }
    },
    events: {
        async signIn({ user }) {
            console.log({user}, "Signed In");
        }
    },
    debug: true,
    
} satisfies AuthOptions;