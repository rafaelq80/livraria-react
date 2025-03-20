interface DropdownMenuProps {
  title: string;
  children: React.ReactNode;
}

export const DropdownMenu = ({ title, children }: DropdownMenuProps) => (
  <div className="relative group">
    <button className="hover:underline cursor-pointer">{title}</button>
    <div className="absolute left-0 hidden mt-2 space-y-2 bg-white text-black rounded-lg shadow-lg group-hover:block w-36 z-40">
      {children}
    </div>
  </div>
);