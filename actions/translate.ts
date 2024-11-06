"use server";

import { State } from "@/components/TranslationForm";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

const key = process.env.SECRET_API_KEY;

async function translate(previousState: State, formData: FormData) {
  auth().protect();
  const { userId } = auth();
  if (!userId) throw new Error("User not found");

  const rawFormData = {
    input: formData.get("input") as string,
    inputLanguage: formData.get("inputLanguage") as string,
    output: formData.get("output") as string,
    outputLanguage: formData.get("outputLanguage") as string,
  };

  const response = await axios({
    baseURL: "https://libretranslate.com",
    url: "/translate",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      q: rawFormData.input,
      source: rawFormData.inputLanguage,
      target: rawFormData.outputLanguage,
      format: "text",
      api_key: key,
    },
  });

  return response.data.translations[0]?.translatedText || "Translation error";
}

export default translate;
