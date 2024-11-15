import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}
    </div>
  );
}
