import {User as AdapterUser} from "next-auth/adapters"

declare module "next-auth" {
    interface Session {
        user: {
            name: string | null;
            email?: string | null;
            image: string | null;
            accessToken?: string | null;
        };
    }

    interface JWT {
        email?: string |  null;
        accessToken?: string | null;
    }

    interface User extends AdapterUser {
        accessToken: string;
    }
}