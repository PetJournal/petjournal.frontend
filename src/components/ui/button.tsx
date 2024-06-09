import { Ref, forwardRef } from 'react';
import { twMerge } from "tailwind-merge";

import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  bgColor?: string;
  textColor?: string;
}

export const Button = forwardRef(function Button(
  {
    isLoading = false,
    bgColor = 'custom-purple',
    textColor = 'white',
    className,
    ...props
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
    {...props}
    ref={ref}
    className={twMerge(`bg-${bgColor} text-${textColor} ${
          isLoading && 'bg-transparent border-2 border-[#B2B2B2] text-[#B2B2B2]'
        }`, className)}
>
</button >
  );
});

Button.displayName = 'Button';
