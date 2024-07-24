import { cn } from '@/utils/twmerge';
import React from 'react';

interface ICheckBox {
  remember: boolean;
  setRemember: React.Dispatch<React.SetStateAction<boolean>>;
  className: string;
}

export function CheckBox({ remember, setRemember, className }: ICheckBox) {
  return (
    <label className={cn(`flex items-center justify-center ${className}`)}>
      <input
        type="checkbox"
        checked={remember}
        onChange={(event) => setRemember(event.target.checked)}
        className="appearance-none"
      />
      <span
        className='flex items-center justify-center w-4 h-4 mr-2 rounded-full border-2 border-studio-600'
      >
        <span
          className={`absolute w-[6px] h-[6px] rounded-full ${
            remember ? 'bg-studio-600' : ''
          }`}
        />
      </span>
      <span className="text-xs font-medium">Eu concordo com a política de privacidade</span>
    </label>
  );
};
