# Business Card Application

A full-stack web application for managing and sharing business card information. Built with Next.js, NextAuth.js, Prisma, and Vercel, this project integrates Google and GitHub OAuth for seamless authentication and leverages a PostgreSQL database for secure and efficient data management.

## Features

- User Authentication: Secure login via Google and GitHub using NextAuth.js.
- Business Card Management: Add, edit, and delete business card information.
- Responsive Design: Optimized for desktop and mobile devices.
- Database Integration: Powered by Prisma ORM and Neon for database management.

## Tech Stack

- **Frontend**: Next.js (React 18+)
- **Backend**: Next.js API routes
- **Authentication**: NextAuth.js with Google and GitHub providers
- **Database**: PostgreSQL hosted on Neon Console
- **Hosting**: Vercel
- **Styling**: Tailwind CSS (or specify the library you used)
- **Other Tools**: ESLint, Prettier

## Setup and Installation

### 1. Prerequisites

- Node.js (v16+)
- PostgreSQL database hosted on Neon Console

### 2. Clone the Repository

```bash
git clone https://github.com/ArcidesFerrao/business-card-nextjs.git
cd business-card-nextjs
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Enviroment Variables

Create a `.env.local` file in the root of your project and add the following:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret

# Google OAuth
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Database (Neon Console Connection String)
DATABASE_URL=your-neon-database-connection-string
```

#### Get Your Neon Connection String

1. Log in to Neon Console.
2. Select your project.
3. Navigate to Settings > Connection Details.
4. Copy the connection string, which will look something like this:

```bash
postgresql://username:password@host/dbname
```

### 5. Set Up the Database

Run Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev --name init
```

### 6. Run the Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

## Deployment

### 1. Hosting on Vercel

- Deploy the project on Vercel.
- Add the environment variables (`NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `DATABASE_URL`) in the Vercel dashboard under Settings > Environment Variables.

### 2. Prisma Client on Vercel

Ensure prisma generate is included in your build process:

```json
"scripts": {
  "build": "prisma generate && next build"
}
```

## Folder Structure

```graphql
.
├── prisma/                 # Prisma schema and migrations
│   ├── schema.prisma
├── src/
│   ├── app/
│   │   ├── api/            # Next.js API routes
│   │   ├── components/     # UI components
│   │   ├── pages/          # Next.js pages
│   ├── styles/             # Global styles
├── public/                 # Static assets
├── .env.local              # Environment variables
├── package.json            # Project metadata and scripts
```

## Key Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Lint the codebase using ESLint.
- `npx prisma studio`: Open Prisma Studio to explore your database.

## Neon Console Database Notes

- Database URL: Ensure your `DATABASE_URL` in `.env.local` matches the Neon-provided connection string.
- Connection Security: Neon databases are secured with SSL by default, which Prisma supports automatically.
- Access Control: If you encounter issues, make sure your IP address is added to the allowed IP list in the Neon Console under Settings > Connection Security.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## Contact

If you have any questions, feel free to reach out at [cidesferrao@gmail.com].
