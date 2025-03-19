import { Navbar } from "@blog/components/navbar";
import Link from "next/link";

export default function IndexPage() {
  return (
    <div>
      Navigations between <Link href="/docs">Docs</Link> and{" "}
      <Link href="/docs/about">About Docs</Link> are client-side transitions
      because they&apos;re part of the same Next.js app. Navigating to{" "}
      <a className="text-link hover:text-link-light transition-colors" href="/">
        Home (Multi-Zones)
      </a>{" "}
    </div>
  );
}
