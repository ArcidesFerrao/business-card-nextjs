import {User as AdapterUser} from "next-auth/adapters"

declare module "next-auth" {
    interface Session {
        user: {
            email: string;
            accessToken: string | null;
        };
    }

    interface User extends AdapterUser {
        accessToken: string;
    }
}