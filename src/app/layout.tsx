import { getServerSession } from "next-auth";
import Provider from "./components/provider";
import "./globals.css";
import { authOptions } from "@/lid/auth";
// import Footer from "./components/footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <Provider session={session}>{children}</Provider>
      </body>
      {/* <Footer /> */}
    </html>
  );
}
