"use client";
import React, { useState } from "react";

export default function CardForm() {
  const [company, setCompany] = useState("Company Name...");
  const [email, setEmail] = useState("@email.com");
  const [number, setNumber] = useState("+258...");

  return (
    <form>
      <div className="name">
        <label htmlFor="company">Name:</label>
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div className="email">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="number">
        <label htmlFor="number">Phone Number:</label>
        <input
          type="text"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  return <button>Submit</button>;
}
