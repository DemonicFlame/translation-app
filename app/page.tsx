import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <Link href="/translate" className="button">
        Translate Now
      </Link>
    </main>
  );
}
