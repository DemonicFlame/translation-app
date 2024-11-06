"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TranslationLanguages } from "@/app/translate/page";
import React, { useEffect, useState } from "react";
//import { useFormState } from "react-dom";
import translate from "@/actions/translate";

const initialState = {
  inputLanguage: "auto",
  input: "",
  outputLanguage: "en",
  output: "",
};

export type State = typeof initialState;

function TranslationForm({ languages }: { languages: TranslationLanguages }) {
  const [defaultLanguage, setDefaultLanguage] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [hidden, setHidden] = useState(false);
  //const [state, formAction] = useFormState(translate, initialState);

  useEffect(() => {
    const browserLang = navigator.language || "en";
    const langCode = browserLang.split("-")[0];
    if (languages.translation[langCode]) {
      setDefaultLanguage(langCode);
    }
  }, [languages]);

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    setHidden(true);
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const translatedText = await translate(initialState, formData);
      setOutput(translatedText);
    } catch (error) {
      console.error("Translation error: ", error);
      setOutput("Error translating text");
    } finally {
      setHidden(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleTranslate} className="space-y-6">
        <div className="space-y-2">
          <Select name="inputLanguage" defaultValue="auto">
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem key="auto" value="auto">
                  Auto-detection
                </SelectItem>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {Object.entries(languages.translation).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Type here"
            className="min-h-32 text-xl"
            name="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Select name="outputLanguage" defaultValue={defaultLanguage}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem key="auto" value="auto">
                  Auto-detection
                </SelectItem>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {Object.entries(languages.translation).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Type here"
            className="min-h-32 text-xl"
            name="output"
            value={output}
            //onChange={(e) => setOutput(e.target.value)}
            readOnly
          />
        </div>
        <div>
          <button type="submit" disabled={hidden} className="button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default TranslationForm;
