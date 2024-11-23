import db from "@/db/db";
import AuthButton from "../components/AuthButton";
// import UserList from "../components/UserList";
import CardList from "../components/CardList";
import Link from "next/link";

const UserPage = async () => {
  const user = await db.user.current();
  //   console.log({ user });
  if (!user) {
    return (
      <main>
        <p>Sign in first</p>
        <AuthButton />
      </main>
    );
  }

  return (
    <main>
      <Link href="/" className="home-button">
        Home
      </Link>
      User: {user.name}
      {/* <UserList /> */}
      <CardList />
    </main>
  );
};

export default UserPage;
