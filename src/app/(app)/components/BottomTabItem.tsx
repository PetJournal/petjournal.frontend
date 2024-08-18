'use client';
import { IconHome } from '@/components/icons/IconHome';
import { IconPets } from '@/components/icons/IconPets';
import { IconTutor } from '@/components/icons/IconTutor';

import { cn } from '@/utils/twmerge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type BottomTabItemProps = {
  to: '/' | '/pets' | '/tutor';
  label: string;
};

export function BottomTabItem({ to, label }: BottomTabItemProps) {
  const pathname = usePathname();
  const buttonStyle = 'flex flex-col justify-center items-center';

  const active = pathname === to;

  const icons = {
    '/': IconHome,
    '/pets': IconPets,
    '/tutor': IconTutor,
  };

  const Icon = icons[to];

  return (
    <Link
      href={to}
      className={cn(
        buttonStyle,
        `${active ? 'text-custom-cyan' : 'text-white'}`,
      )}
    >
      <Icon size={24} active={active} />
      {label}
    </Link>
  );
}
