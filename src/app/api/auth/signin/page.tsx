"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  // const [email, setEmail] = useState("");
  // const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    signIn("github", { redirect: false, callbackUrl: "/" });
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
