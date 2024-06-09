import React, { forwardRef, Ref, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(function Input(
  { ...props }: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  return <input {...props} ref={ref} />;
});

Input.displayName = 'Input';
