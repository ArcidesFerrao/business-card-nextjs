"use client";
import { useActionState, useState } from "react";
import { addCard } from "../_actions/cards";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

export default function CardForm() {
  const [state, action, pending] = useActionState(addCard, null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const {
    data: session,
    status,
  }: {
    data: Session | null;
    status: "loading" | "authenticated" | "unauthenticated";
  } = useSession();

  const formatPhoneNumber = (input: string) => {
    const digits = input.replace(/\D/g, "");

    const formatted = digits.replace(
      /^(\d{3})(\d{2})(\d{2})(\d{2})(\d{3})$/,
      "$1 $2 $3 $4 $5"
    );

    return formatted;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const formattedNumber = formatPhoneNumber(input);
    setPhoneNumber(formattedNumber);
    console.log(formattedNumber);
  };

  return (
    <>
      <form id="cardForm" className="form" action={action}>
        <div className="name">
          <label htmlFor="company">Name:</label>
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="email">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="number">
          <label htmlFor="number">Phone Number:</label>
          <input
            type="tel"
            name="phone"
            maxLength={16}
            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{3}"
            placeholder="258 80 12 34 567"
            onChange={handleChange}
            // value={phoneNumber}
          />
        </div>
      </form>
      <div className="display-error">
        {state?.errors.email && <p className="alert">{state?.errors.email}</p>}
        {state?.errors.company && (
          <p className="alert">{state?.errors.company}</p>
        )}

        {state?.errors.phone && <p className="alert">{state?.errors.phone}</p>}
      </div>

      <div className="data display">
        <div className="title-display">
          <span className="companyIcon"></span>
          <div className="subtitle">
            {/* <h1></h1> */}
            <h2>{company}</h2>
          </div>
        </div>

        <div className="contact">
          <span className="solar--phone-broken"></span>
          <h3>{phoneNumber}</h3>
        </div>

        <div className="emailTo">
          <span className="gridicons--mail"></span>
          <h3>
            <a href={`mailto:${email}`}>{email}</a>
          </h3>
        </div>
      </div>

      {session && status === "authenticated" ? (
        <input
          form="cardForm"
          type="submit"
          value="Save"
          className="saveB"
          disabled={pending}
        />
      ) : null}
    </>
  );

  revalidatePath("/");
}
