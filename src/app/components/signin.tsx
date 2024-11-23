"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignIn() {
  // const [email, setEmail] = useState("");
  // const [loading, setLoading] = useState(false);

  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  console.log(session?.user.accessToken);

  useEffect(() => {
    if (status === "loading") {
      setLoading(!loading);
    }
    if (status === "authenticated") {
      router.push("/user");
    }
  }, [status, router]);

  const handleSignIn = async (provider: string) => {
    try {
      signIn(provider);
    } catch (error) {
      console.error("Sign In Failed: ", error);
    }
  };

  return (
    <main>
      <div>
        <h1>Sign In</h1>
      </div>
      <div className="providers">
        <button onClick={() => handleSignIn("github")} disabled={loading}>
          Sign in with Github
        </button>
        <button onClick={() => handleSignIn("google")} disabled={loading}>
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
