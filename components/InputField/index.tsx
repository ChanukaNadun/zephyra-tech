import React, { useState } from "react";

type RevealIcons = { show: React.ReactNode; hide: React.ReactNode };

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  error?: string | null;
  leftIcon?: React.ReactNode;

  /** Password-like behavior (mask + toggle). */
  isSecret?: boolean;
  /** Custom icons for reveal/hide when isSecret is true. */
  revealIcons?: RevealIcons;

  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  autoFocus = false,
  required = false,
  error,
  leftIcon,
  isSecret = false,
  revealIcons,
  onBlur,
  className = "",
}) => {
  const [hidden, setHidden] = useState<boolean>(isSecret);

  const effectiveType = isSecret ? (hidden ? "password" : type) : type;

  const base =
    "block w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2";
  const ok = "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500";
  const bad =
    "border-rose-400 focus:border-rose-500 focus:ring-rose-500 bg-rose-50/40";

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 mb-1"
      >
        {label}
      </label>

      <div className="relative">
        {/* Feild icon */}
        {leftIcon ? (
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            {leftIcon}
          </div>
        ) : null}

        <input
          type={effectiveType}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={[
            base,
            error ? bad : ok,
            leftIcon ? "pl-9" : "",
            isSecret ? "pr-20" : "",
          ].join(" ")}
        />
        
        {isSecret ? (
          <button
            type="button"
            onClick={() => setHidden((s) => !s)}
            className="absolute inset-y-0 right-2 inline-flex items-center gap-1 rounded-md px-2 text-xs font-medium text-indigo-600 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label={hidden ? "Show value" : "Hide value"}
          >
            {hidden ? revealIcons?.show ?? "Show" : revealIcons?.hide ?? "Hide"}
          </button>
        ) : null}
      </div>

      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default InputField;
