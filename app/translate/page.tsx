import TranslationForm from "@/components/TranslationForm";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export type TranslationLanguages = {
  translation: {
    [key: string]: {
      name: string;
      nativeName: string;
      dir: "ltr" | "rtl";
    };
  };
};

async function TranslatePage() {
  auth().protect();
  const { userId } = auth();
  if (!userId) throw new Error("User not logged in!");

  const languagesEndpoint =
    "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0";
  const response = await fetch(languagesEndpoint, {
    next: {
      revalidate: 60 * 60 * 24, //Refresh the results once every 24 hours
    },
  });
  const languages = (await response.json()) as TranslationLanguages;
  return (
    <div>
      <TranslationForm languages={languages} />
    </div>
  );
}

export default TranslatePage;
