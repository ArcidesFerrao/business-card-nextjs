import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIEND_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    // callbacks: {
    //     async session({ session, token }) {
    //         return session;
    //     },
    //     async jwt({ token, user }) {
    //         return token;
    //     }
    // }
})

export default NextAuth(handler)

