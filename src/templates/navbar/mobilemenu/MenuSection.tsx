import { DropdownMenus } from "../../../types/MenuTypes";

interface MenuSectionProps {
    title: string;
    menu: DropdownMenus;
    toggleDropdown: (menu: DropdownMenus) => void;
    dropdownOpen: boolean;
    children: React.ReactNode;
  }
  
  export const MenuSection = ({ title, menu, toggleDropdown, dropdownOpen, children }: MenuSectionProps) => (
    <div>
      <button className="w-full text-left py-2 hover:bg-indigo-400 px-2 rounded" onClick={() => toggleDropdown(menu)}>{title}</button>
      {dropdownOpen && <div className="pl-4 space-y-2 mt-1">{children}</div>}
    </div>
  );