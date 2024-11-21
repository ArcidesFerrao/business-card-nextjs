import db from "@/db/db"

export default async function idCard() {

    const user = await db.user.current();


  return user?.id
}
