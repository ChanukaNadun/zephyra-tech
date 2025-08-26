"use client";

import React from "react";
import { Control, Controller } from "react-hook-form";

interface FormTextFieldProps {
  label: string;
  inputName: string;
  inputType: string;
  placeholder?: string;
  control: Control;
  rules?: object;
  errors?: { [key: string]: { message?: string } };
  isRequired?: boolean;
  sideLabel?: string;
  isDisabled?: boolean;
  defaultValue?: string;
  className?: string;
}

type MyInputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "datetime-local"
  | "time"
  | "week"
  | "month"
  | "color";

const FormTextField: React.FC<FormTextFieldProps> = ({
  label,
  inputName,
  inputType,
  placeholder,
  control,
  rules,
  errors,
  isRequired,
  sideLabel,
  isDisabled,
  defaultValue,
  className,
}) => {
  const errorMsg = errors?.[inputName]?.message;

  return (
    <div className="my-2 w-full">
      {label && (
        <label
          htmlFor={inputName}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {isRequired ? `${label} *` : label}
        </label>
      )}

      <div className="flex items-center gap-2">
        <Controller
          name={inputName}
          control={control}
          rules={rules}
          render={({ field }) => (
            <input
              {...field}
              id={inputName}
              type={inputType as MyInputType}
              placeholder={placeholder}
              disabled={isDisabled}
              defaultValue={defaultValue}
              className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none
              ${
                errorMsg
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }
              ${className ?? ""}`}
            />
          )}
        />
        {sideLabel && (
          <span className="text-sm text-gray-600 whitespace-nowrap">
            {sideLabel}
          </span>
        )}
      </div>

      {errorMsg && <p className="mt-1 text-xs text-red-600">{errorMsg}</p>}
    </div>
  );
};

export default FormTextField;
