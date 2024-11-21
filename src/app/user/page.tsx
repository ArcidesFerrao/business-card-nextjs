import db from "@/db/db";
import AuthButton from "../components/AuthButton";
import UserList from "../components/UserList";

const UserPage = async () => {
  const user = await db.user.current();
  //   console.log({ user });
  if (!user) {
    return (
      <div>
        <p>Sign in first</p>
        <AuthButton />
      </div>
    );
  }

  return (
    <main>
      <a href="/" className="home-button">
        Home
      </a>
      User: {user.name}
      <UserList />
    </main>
  );
};

export default UserPage;
