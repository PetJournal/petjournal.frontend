import { ButtonProps } from './ButtonProps';

export function Button({
  children,
  type,
  className,
  disabled,
  onClick,
  loading,
  ...rest
}: ButtonProps) {
  const isButtonDisabled = !!loading;

  return (
    <button
      className={
        type === 'submit'
          ? `flex self-center font-medium items-center justify-center  rounded-[45px] px-11 py-3 mt-16 ${
              isButtonDisabled
                ? 'bg-transparent border-2 border-[#B2B2B2] text-[#B2B2B2]'
                : 'bg-custom-purple text-white'
            }`
          : className
      }
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
