import ThemeToggler from "./ThemeToggler";

export default function Header() {
  return (
    <header className="m-4 sm:m-8">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl sm:text-3xl font-medium">Muhammad Bin Jamil</h1>
        <ThemeToggler />
      </div>
      {/* <nav className="flex flex-row justify-between">
        <ul className="flex gap-4">
          <li>Blog</li>
          <li>About</li>
        </ul>
        <ul className="flex gap-4">
          <li>GitHub</li>
          <li>Twitter</li>
        </ul>
      </nav> */}
    </header>
  );
}
