"use client";

import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: ReactNode;
  title: string;
  bgColor: string;
  textColor: string;
}

export default function Button({
  children,
  loading,
  title,
  icon,
  className,
  bgColor,
  textColor,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={clsx(
        `${bgColor} ${textColor} inline-flex items-center justify-center gap-2 rounded-lg font-medium py-2.5 shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed`,
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
        </>
      ) : (
        <>
          {icon}
          {children}
          {title}
        </>
      )}
    </button>
  );
}
