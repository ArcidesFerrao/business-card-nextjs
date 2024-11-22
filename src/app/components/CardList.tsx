import db from "@/db/db";
import idCard from "../_actions/idCard";

export default async function CardList() {
  const author = await idCard();
  const cards = await db.card.findMany({
    where: {
      authorId: author,
    },
  });

  if (cards.length === 0) return <p>no cards found...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>
            Company ({cards.length} {cards.length === 1 ? "card" : "cards"})
          </th>
          <th>Email</th>
          <th>Phone</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {cards.map((card) => (
          <tr key={card.id}>
            <td>{card.company}</td>
            <td>{card.email}</td>
            <td>{card.phone}</td>
            <td>{card.createdAt.toDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
