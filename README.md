# My Auth App

A Next.js authentication application featuring Google and Facebook OAuth login with a protected calculator feature.

## Features

- OAuth authentication with Google and Facebook
- Protected routes with session management
- Simple calculator accessible only to authenticated users
- User profile display with avatar
- Responsive design with Tailwind CSS
- TypeScript for type safety

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Authentication:** NextAuth.js v4
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 20.x or higher
- npm or yarn package manager
- A Google Cloud Platform account (for Google OAuth)
- A Facebook Developer account (for Facebook OAuth)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-auth-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
```

## Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
my-auth-app/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts        # NextAuth configuration
│   ├── calculator/
│   │   └── page.tsx                # Protected calculator page
│   ├── login/
│   │   └── page.tsx                # Login page
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page (redirects)
│   └── providers.tsx               # SessionProvider wrapper
├── public/                         # Static assets
├── .env.local                      # Environment variables (not in repo)
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies
├── tailwind.config.ts              # Tailwind configuration
└── tsconfig.json                   # TypeScript configuration
```

## Usage

1. Navigate to the application in your browser
2. You will be redirected to the login page
3. Choose to sign in with either Google or Facebook
4. After successful authentication, you'll be redirected to the calculator
5. Use the calculator to perform basic arithmetic operations
6. Sign out using the button in the header

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_URL` | The URL of your application | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth session encryption | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `FACEBOOK_CLIENT_ID` | Facebook app ID | Yes |
| `FACEBOOK_CLIENT_SECRET` | Facebook app secret | Yes |

## Troubleshooting

### OAuth Redirect URI Mismatch
Make sure the redirect URIs in your OAuth provider settings exactly match your application URLs.

### Session Issues
If you experience session problems, try:
1. Clearing your browser cookies
2. Regenerating your `NEXTAUTH_SECRET`
3. Restarting the development server

### Authentication Not Working
Verify that:
1. All environment variables are correctly set in `.env.local`
2. Your OAuth apps are properly configured
3. The redirect URIs match exactly (including http/https)

## License

This project is private and for demonstration purposes.

## Contributing

This is a private project. Please contact the repository owner for contribution guidelines.
