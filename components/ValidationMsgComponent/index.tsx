"use client";

import React from "react";

interface ValidationMsgComponentProps {
  inputName: string;
  errors?: { [key: string]: { message?: string } };
}

const ValidationMsgComponent: React.FC<ValidationMsgComponentProps> = ({
  inputName,
  errors,
}) => {
  if (!errors?.[inputName]) return null;

  return (
    <p className="mt-1 text-xs text-red-600">
      {errors[inputName].message || "Invalid input"}
    </p>
  );
};

export default ValidationMsgComponent;
