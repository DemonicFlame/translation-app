import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import DarkModeButton from "./DarkModeButton";
// import UserStatus from "./userStatus";
// import { getUserStatus } from "./getUserStatus";

function Header() {
  const { userId } = auth();
  // const userId = await getUserStatus();

  // const [isDarkMode, setIsDarkMode] = useState(false);

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme");
  //   if (savedTheme === "dark") {
  //     document.documentElement.classList.add("dark");
  //     setIsDarkMode(true);
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     setIsDarkMode(false);
  //   }
  // }, []);

  // const toggleDarkMode = () => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   } else {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   }
  //   setIsDarkMode(!isDarkMode);
  // };

  return (
    <header className="flex items-center justify-between px-8 border-b mb-5">
      <div className="flex items-center justify-center h-20 overflow-hidden">
        <Link href="/">
          <Image
            src="https://cdn.discordapp.com/attachments/1268226179396145214/1291431991232692274/image.png?ex=67001344&is=66fec1c4&hm=3f5d565a8f18017cc7d2b373bb3c833a6e487932b4cb2aa77e40f5dfecb9a522&"
            alt="logo"
            width={200}
            height={100}
            className="object-contain h-10 cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {/* <button
          onClick={toggleDarkMode}
          className="bg-secondary text-white p-2 rounded-md"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button> */}
        {/* <DarkModeButton /> */}
        {userId ? (
          <UserButton />
        ) : (
          <SignInButton fallbackRedirectUrl="/translate" mode="modal" />
        )}
        {/* <UserStatus userId={userId} /> */}
      </div>
    </header>
  );
}

export default Header;
