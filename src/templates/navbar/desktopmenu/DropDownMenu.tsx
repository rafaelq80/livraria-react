import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DropDownMenuItemProps } from './DropDownMenuItem';

interface DropdownMenuProps {
  title?: string;
  icon?: React.ReactNode;
  to?: string; 
  children?: React.ReactNode;
}

export const DropdownMenu = ({ title, icon, to, children }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<React.PropsWithChildren<DropDownMenuItemProps>>(child)) {
      const originalOnClick = child.props.onClick;

      const combinedOnClick = originalOnClick
        ? () => {
            closeMenu();
            originalOnClick();
          }
        : closeMenu;

      return React.cloneElement(child, {
        ...child.props,
        closeMenu,
        onClick: combinedOnClick,
      });
    }
    return child;
  });

  return (
    <div className="relative" ref={menuRef}>
      {to ? (
        <Link
          to={to}
          className="hover:bg-indigo-500 cursor-pointer flex items-center gap-2 p-2 rounded-md transition-colors"
        >
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {title && (
            <span className="whitespace-nowrap text-sm lg:text-base hover:underline">
              {title}
            </span>
          )}
        </Link>
      ) : (
        <button
          className="hover:bg-indigo-500 cursor-pointer flex items-center gap-2 p-2 rounded-md transition-colors"
          onClick={toggleMenu}
        >
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {title && (
            <span className="whitespace-nowrap text-sm lg:text-base hover:underline">
              {title}
            </span>
          )}
        </button>
      )}

      {isOpen && !to && (
        <div className="absolute right-0 mt-1 space-y-1 bg-white text-black rounded-lg shadow-lg w-44 z-40">
          {childrenWithProps}
        </div>
      )}
    </div>
  );
};
