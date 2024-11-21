"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {
  // const [email, setEmail] = useState("");
  // const [loading, setLoading] = useState(false);

  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/user");
    }
  }, [status, router]);

  const handleSignIn = async () => {
    try {
      signIn("github");
    } catch (error) {
      console.error("Sign In Failed: ", error);
    }
  };

  return (
    <div>
      <div>
        <h1>Sign In</h1>
      </div>
      <div>
        <button onClick={handleSignIn}>Sign in with Github</button>
      </div>
    </div>
  );
}
