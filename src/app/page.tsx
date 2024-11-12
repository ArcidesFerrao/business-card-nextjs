// import CardDisplay from "./components/cardDisplay";
import CardForm from "./components/cardForm";

// interface CardProps {
//   name: string;
//   email: string;
//   number: number;
// }

export default function Home() {
  return (
    <main
      className="main"
      // className="flex flex-col gap-8 row-start-2 items-center sm:items-start"
    >
      <h1 className="title">Business Card</h1>

      <div className="container">
        <CardForm />
      </div>
    </main>
  );
}
