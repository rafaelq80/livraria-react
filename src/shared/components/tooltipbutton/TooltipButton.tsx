import { ButtonHTMLAttributes, ReactNode } from "react";
import * as Tooltip from '@radix-ui/react-tooltip';

interface TooltipButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}

interface TooltipWrapperProps {
  label: string;
  children: ReactNode;
}

export function TooltipButton({ label, children, ...props }: Readonly<TooltipButtonProps>) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button {...props}>{children}</button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          align="center"
          className="px-2 py-1 rounded bg-indigo-800 text-white text-xs shadow-lg animate-fade-in"
          sideOffset={6}
        >
          {label}
          <Tooltip.Arrow className="fill-indigo-800" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export function TooltipWrapper({ label, children }: Readonly<TooltipWrapperProps>) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          align="center"
          className="px-2 py-1 rounded bg-indigo-800 text-white text-xs shadow-lg animate-fade-in"
          sideOffset={6}
        >
          {label}
          <Tooltip.Arrow className="fill-indigo-800" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}