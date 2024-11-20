import AccessDenied from "@/lid/accessdenied";
import { authOptions } from "@/lid/auth";
import { getServerSession } from "next-auth";

const Saved = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <AccessDenied />;
  }

  return (
    <>
      <h1>Saved by </h1>
    </>
  );
};

export default Saved;
