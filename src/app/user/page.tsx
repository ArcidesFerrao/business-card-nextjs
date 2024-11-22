import db from "@/db/db";
import AuthButton from "../components/AuthButton";
import UserList from "../components/UserList";
import CardList from "../components/CardList";

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
      <a href="/" className="home-button">
        Home
      </a>
      User: {user.name}
      <UserList />
      <CardList />
    </main>
  );
};

export default UserPage;
