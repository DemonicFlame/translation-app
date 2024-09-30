import { auth } from "@clerk/nextjs/server";
import React from "react";

function TranslatePage() {
  auth().protect();
  const { userId } = auth();
  return <div>TranslatePage</div>;
}

export default TranslatePage;
