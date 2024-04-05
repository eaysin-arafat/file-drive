"use client";

import { Button } from "@/components/ui/button";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  const createFile = useMutation(api.files.createFile);

  return (
    <main className="">
      <h1>FILE DRIVE!</h1>

      <div>{files?.map((item) => <p key={item._id}>{item?.name}</p>)}</div>
      <Button
        onClick={() => {
          if (!orgId) return;

          createFile({
            name: "hello world",
            orgId,
          });
        }}
      >
        Click me
      </Button>
    </main>
  );
}
