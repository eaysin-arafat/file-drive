'use client';

import { Button } from '@/components/ui/button';
import { SignedOut, SignInButton } from '@clerk/clerk-react';
import { FileCode, Github } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex gap-1 text-xl font-bold text-foreground"
          >
            <FileCode size={27} /> FileDrive
          </Link>

          <div className="flex items-center space-x-2">
            <SignedOut>
              <SignInButton>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 text-center sm:py-48 lg:py-56">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              The easiest way to upload and share files with your company.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Make an account and start managing your files in less than a
              minute.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard/files"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed GitHub Link */}
      <div className="fixed bottom-6 right-6">
        <a
          href="https://github.com/eaysin-arafat/file-drive.gits"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-foreground p-3 text-background shadow-lg hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
        >
          <Github className="h-6 w-6" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
