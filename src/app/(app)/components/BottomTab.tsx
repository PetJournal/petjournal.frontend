'use client';
import { usePathname } from 'next/navigation';
import { BottomTabItem } from './BottomTabItem';

const pathsNotShow = ['/pet-register'];

export function BottomTab() {
  const pathname = usePathname();
  const isShow = !pathsNotShow.includes(pathname);

  if (!isShow) {
    return <></>;
  }

  return (
    <div className="fixed z-10 bottom-0 left-0 bg-studio-600 w-full p-4">
      <ul className="flex w-full justify-around">
        <li>
          <BottomTabItem label="Home" to="/" />
        </li>
        <li>
          <BottomTabItem label="Pets" to="/pets" />
        </li>
        <li>
          <BottomTabItem label="Tutor" to="/tutor" />
        </li>
      </ul>
    </div>
  );
}
