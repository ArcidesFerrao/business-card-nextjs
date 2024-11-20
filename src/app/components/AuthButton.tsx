"use client";

import { signIn, signOut, useSession } from "next-auth/react";
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
    <div className={loading ? "bg-gray-500" : ""}>
      {/* {!session?.user ? ( */}
      <>
        <button
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          Sign In
        </button>
      </>
      {/* ) : ( */}
      {/* <p>Welcome, {session.user?.name}</p> */}
      <a
        href={`/api/auth/signout`}
        onClick={(e) => {
          e.preventDefault();
          signOut();
          router.push("/");
        }}
      >
        Sign Out
      </a>
      {/* )} */}
    </div>
  );
}
