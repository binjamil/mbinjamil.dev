import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-400/25 dark:border-t pt-4 m-4">
      <div className="flex flex-row justify-between text-sm sm:text-base">
        <p className="text-slate-500 dark:text-slate-400">&copy; 2022 mbinjamil.dev</p>
        <p className="text-slate-500 dark:text-slate-400">All rights reserved</p>
      </div>
    </footer>
  );
}
