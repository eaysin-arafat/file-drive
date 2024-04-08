import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="border-b py-4 bg-gray-50">
      <div className="flex items-center container mx-auto justify-between">
        <Link href="/">
          <h1 className="text-2xl font-semibold">FileDrive</h1>
        </Link>

        <Button variant={"ghost"}>
          <Link href={"/dashboard/files"}>Your Files</Link>
        </Button>

        <div className="flex gap-3">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Header;
