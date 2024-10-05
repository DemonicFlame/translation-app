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

function TranslationForm({ languages }: { languages: TranslationLanguages }) {
  const [defaultLanguage, setDefaultLanguage] = useState("en");

  useEffect(() => {
    const browserLang = navigator.language || "en";
    const langCode = browserLang.split("-")[0];
    if (languages.translation[langCode]) {
      setDefaultLanguage(langCode);
    }
  }, [languages]);

  return (
    <div>
      <form>
        <div>
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
          />
        </div>
        <div>
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
          />
        </div>
      </form>
    </div>
  );
}

export default TranslationForm;
