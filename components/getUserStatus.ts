import { auth } from "@clerk/nextjs/server";

export async function getUserStatus() {
  const { userId } = auth();
  return userId;
}
