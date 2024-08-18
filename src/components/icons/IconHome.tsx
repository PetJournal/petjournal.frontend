import { cn } from '@/utils/twmerge';
import { IconProps } from './IconProps';
import Image from 'next/image';
import iconHome from '@/assets/svg/home.svg';
import iconHomeActive from '@/assets/svg/home-active.svg';

export function IconHome({ size = 16, active = false, className }: IconProps) {
  return (
    <Image
      className={cn(className)}
      src={active ? iconHomeActive : iconHome}
      width={size}
      height={size}
      alt=""
    />
  );
}
