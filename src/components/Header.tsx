import { HeaderLogo } from "./HeaderLogo";

export function Header() {
  return (
    <header className="w-full py-5 flex items-center xl:justify-center justify-start p-6 bg-gray-700 border-b border-gray-600">
      <HeaderLogo />
    </header>
  )
}