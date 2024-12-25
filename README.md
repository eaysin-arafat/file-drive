# FileDrive

**FileDrive** is a cloud-based file management system that allows users to upload, organize, share, and manage files with their team members. The system also features role-based access control (RBAC) to manage permissions within organizations, ensuring secure file sharing.

## Features

- **File Management**: Upload and manage your files.
- **Favorites**: Mark files as favorites for quick access.
- **Trash**: Recover deleted files from the trash.
- **Organizations**: Create and manage organizations to share files with team members.
- **Role-based Access Control (RBAC)**: Manage file and organization access based on user roles.
- **Authentication**: Secure sign-in using Clerk.
- **Real-time Updates**: Collaborate on files in real-time with automatic updates.

## Tech Stack

This project is built using the following technologies:

- **Framework**: [Next.js 14](https://nextjs.org/ 'Next.js 14')
- **Language**: [TypeScript](https://www.typescriptlang.org/ 'TypeScript')
- **Styling** : [Tailwind CSS](https://tailwindcss.com/ 'Tailwind CSS')
- **UI Components**: [Shadcn-ui](https://ui.shadcn.com/ 'Shadcn-ui')
- **Authentication**: [Clerk](https://clerk.dev/ 'Clerk')
- **Database**: [Convex](https://convex.dev/ 'Convex')
- **Forms**: [React Hook Form](https://react-hook-form.com/ 'React Hook Form')
- **Pre-commit Hooks**: [Husky](https://typicode.github.io/husky/ 'Husky')
- **Linting**: [ESLint](https://eslint.org/ 'ESLint')
- **GitHub Integration**: Provides easy access to GitHub for file management and version control.

## Pages

**1. Home Page**
Landing page that includes the sign-in option using Clerk for authentication.
**2. Dashboard**
The dashboard is the main hub where you can manage files, including all files, favorites, and trash.
**3. File Management**
Manage files by uploading, categorizing, and sharing them with other users in your organization.
**4. Organizations**
Create organizations and assign roles to members.
Control file access by setting permissions based on roles.
**5. Favorites & Trash**
Easily mark files as favorites for quick access.
Files moved to the trash can be recovered.
**6. GitHub Integration**
Link GitHub repositories to share relevant project files.
Easily manage and access your code repository from within FileDrive.

## Installation

To get started with FileDrive locally, follow these steps:

#### 1. Clone the Repository

```
git clone https://github.com/eaysin-arafat/file-drive.git
cd file-drive
```

#### 2. Install Dependencies

Use `npm` or `yarn` to install dependencies. You can run one of the following commands:

```
npm install
# or
yarn install
```

#### 3. Configure Environment Variables

Create a .`env.local ` file by copying the provided example:

```
cp env.example.txt .env.local
```

Then, add your environment variables to the `.env.local` file:

```
NEXT_PUBLIC_CONVEX_URL=https://gian-wfhdale-786.convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_tesdsDt_bS10YdyLTg5dLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_Ld91eydsfasJaid6asdfasdfYKThV9ffGN6iBC8JKLABfLHyZ0
```

#### 4. Run Development Server

Start the development server:

```
npm run dev
# or
yarn dev
```

You can now access the application at http://localhost:3000.

#### Directory Structure

```
+-- .github
|   +-- FUNDING.yml
+-- .husky
+-- app
|   +-- dashboard
|   |   +-- favorite
|   |   |   +-- page.tsx
|   |   +-- files
|   |   |   +-- page.tsx
|   |   +-- trash
|   |   |   +-- page.tsx
|   |   +-- layout.tsx
|   +-- ConvexClientProvider.tsx
|   +-- favicon.ico
|   +-- globals.css
|   +-- layout.tsx
|   +-- not-found.tsx
|   +-- page.tsx
|   +-- lib
+-- components
|   |   +-- file-browser
|   |   +-- kbar
|   |   +-- layout
|   |   +-- modal
|   |   +-- providers
|   |   +-- ui
|   |   |   +-- table.tsx
+-- constants
+-- convex
+-- middleware
+-- hooks
+-- lib
+-- public
+-- types
+-- utils
+-- .eslintrc.json
+-- .prettierrc
+-- components.json
+-- env.example.txt
+-- middleware.ts
+-- next.config.js
+-- package.json
+-- README.md
+-- tailwind.config.js
+-- tsconfig.json
+-- yarn.lock
```

#### Contributing

If you’d like to contribute to **FileDrive**, feel free to fork the repository and submit pull requests. Here are some areas you could help with:

- **Bug fixes**: If you find any bugs, open an issue and submit a fix.
- **Features**: Propose new features to enhance functionality.
- **Documentation**: Improve documentation or add examples.

Before submitting a pull request, make sure your code passes linting and formatting:

```
npm run lint
npm run format
```

#### License

This project is licensed under the MIT License. See the LICENSE file for more information.

#### Links

[GitHub Repository](https://github.com/eaysin-arafat/file-drive 'GitHub Repository')
[FileDrive Live Link](https://file-drive-pearl-gamma.vercel.app/ 'FileDrive Live Link')
