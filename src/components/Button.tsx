import { cn } from '@/utils/twmerge';
import { ButtonHTMLAttributes, Ref, forwardRef } from 'react';

const buttonStyleBase =
  'flex self-center font-medium items-center justify-center px-11 py-3 rounded-2xl';

const buttonVariants = {
  variant: {
    default: `${buttonStyleBase} text-white bg-studio-600 disabled:bg-transparent disabled:border-2 disabled:border-[#B2B2B2] disabled:text-[#B2B2B2]`,
    outline: `${buttonStyleBase} bg-transparent border-2 border-studio-600 text-studio-600 disabled:opacity-45`,
    ghost: `bg-transparent disabled:opacity-45`,
  },
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant;
}

export const Button = forwardRef(function Button(
  { variant = 'default', className, children, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      ref={ref}
      className={cn(buttonVariants.variant[variant], className)}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
