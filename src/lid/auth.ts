/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthOptions } from "next-auth";
// import Google from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db, { baseDb } from "@/db/db";

export const authOptions = {
    adapter: PrismaAdapter(baseDb),
    // adapter: PrismaAdapter(baseDb as unknown as PrismaClient),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
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
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.email = account.access_token;
            }
            return token;
        },
        async signIn({ user, account, profile}) {
            if (account?.provider === 'github') {
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
                                name: user.name 
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
                session.user.email = token.email || null;
            session.user.accessToken = token.accessToken || null;
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