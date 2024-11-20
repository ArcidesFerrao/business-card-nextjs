import db from "@/db/db";
import { redirect } from "next/navigation";

const UserPage = async () => {
  const user = await db.user.current();
  console.log({ user });
  if (!user) redirect("/");

  return <div>User: {user.name}</div>;
};

export default UserPage;
