import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  reference?: React.Ref<HTMLInputElement>;
}

export function Input({ reference, className, ...props }: InputProps) {
  return (
    <input
      ref={reference}
      className={`px-4 py-2 border rounded m-1 ${className}`}
      {...props}   // ✅ supports required, type, autoComplete, placeholder, etc.
    />
  );
}
