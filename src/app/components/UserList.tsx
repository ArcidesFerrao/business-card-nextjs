import React from "react";
import db from "@/db/db";

export default async function UserList() {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  if (!users) return <div>no users found</div>;

  return (
    <div className="user-list">
      <h1>UserList</h1>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
