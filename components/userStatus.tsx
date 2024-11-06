"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
// import { auth } from "@clerk/nextjs/server";

export default function UserStatus({ userId }: { userId: String | null }) {
  // const { userId } = auth();

  return userId ? (
    <UserButton />
  ) : (
    <SignInButton fallbackRedirectUrl="/translate" mode="modal" />
  );
}
