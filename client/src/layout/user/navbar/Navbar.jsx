import { IconBell, IconShoppingCart, IconUser } from "@tabler/icons-react";
import SearchBar from "./SearchBar";
import LanguageDropdown from "./LanguageDropdown";

export default function Navbar() {
  return (
    <div className="min-w-screen shadow-md sticky p-4 flex justify-between">
      <div className="font-semibold text-2xl text-black">YourMart</div>
      <div className="min-w-[500px]">
        <SearchBar onSearch={(searchTerm) => console.log(searchTerm)} />
      </div>
      <div className="flex items-center gap-6">
        <LanguageDropdown />
        <span className="rounded-[50%] border border-zinc-600 bg-gray-200 text-black flex justify-center items-center p-1 cursor-pointer hover:!bg-gray-300 transition-all duration-200">
          <IconBell size={20} />
        </span>
        <div className="flex gap-1 justify-between cursor-pointer text-black items-center">
          <IconUser size={20} />
          <span className="text-lg font-medium">Account</span>
        </div>
        <div className="flex gap-1 justify-between cursor-pointer text-black items-center">
          <IconShoppingCart size={20} />
          <span className="text-lg font-medium">Cart</span>
        </div>
      </div>
    </div>
  );
}
