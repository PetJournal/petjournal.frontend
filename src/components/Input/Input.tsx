import { InputProps } from './InputProps';

export function Input({
  children,
  type,
  className,
  placeholder,
  name,
  checked,
  disabled,
  onChange,
  ...rest
}: InputProps) {
  return (
    <input
      className={
        type === 'email' || type === 'password' || type === 'text'
          ? 'w-full outline-0 text-[#292929] font-medium placeholder:text-[#BFBFBF]'
          : className
      }
      type={type}
      placeholder={placeholder}
      name={name}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      {...rest}
    >
      {children}
    </input>
  );
}
