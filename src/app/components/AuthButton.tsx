"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
// import { authOptions } from "../api/auth/[...nextauth]";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";

  if (session) {
    console.log("logged in");
  }

  return (
    <div className={`auth-button ${loading ? "bg-gray-500" : ""}`}>
      {!session?.user ? (
        <a
          href={`/api/auth/signin`}
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          Sign In
        </a>
      ) : (
        <div className="signed">
          <p>
            Welcome, <a href="/user">{session.user.name}</a>
          </p>
          <div className="sign-pic">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={"avatar"}
                width={24}
                height={24}
                className="avatar"
              />
            )}
            <a
              className="signout"
              href={`/api/auth/signout`}
              onClick={(e) => {
                e.preventDefault();
                signOut();
                router.push("/");
              }}
            >
              Sign Out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
