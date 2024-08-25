'use client';

import React, { useEffect, useState } from 'react';
import * as Ariakit from '@ariakit/react';
import { ScrollArea } from '../ScrollArea';
import { CheckIcon, ChevronDown } from 'lucide-react';
import { IconErrorCircle } from '../icons/IconErrorCircle';
import { cn } from '@/utils/twmerge';

interface SearchInputProps {
  items: SearchInputItems[];
  placeholder?: string;
  className?: string;
  error?: boolean;
  onChange?: (value: string) => void;
  value?: string;
}

interface SearchInputItems {
  label: string;
  value: string;
}

const searchVariants = {
  normal: `w-full h-10 p-2 text-sm border border-[#B2B2B2] border-dashed outline-none rounded-2xl bg-white focus:outline-none focus:border-solid focus:border-[#B78AF7] focus:shadow-custom-select transition-all`,
  error: `border-[#FF917A] border-solid`,
};

function SearchInput({
  placeholder,
  items,
  className,
  onChange,
  value,
  error = false,
}: SearchInputProps) {
  const [itemSelected, setItemSelected] = useState<SearchInputItems>({
    label: '',
    value: '',
  });

  const foundItem = items.find(
    (item) => item.label.toLowerCase() === itemSelected.label.toLowerCase(),
  );

  const filteredItems = foundItem
    ? items
    : items.filter((item) =>
        item.label.toLowerCase().includes(itemSelected.label.toLowerCase()),
      );

  const handleSelect = (item: SearchInputItems) => {
    setItemSelected(item);
    if (onChange) {
      onChange(item.value);
    }
  };

  useEffect(() => {
    const outValue = items.find((item) => item.value === value);
    setItemSelected(
      outValue || {
        label: '',
        value: '',
      },
    );
  }, [value, items]);

  return (
    <Ariakit.ComboboxProvider>
      <div className={cn('w-full flex justify-center items-center', className)}>
        <div className="w-full flex relative justify-center items-center">
          <Ariakit.Combobox
            value={itemSelected.label}
            onChange={(e) =>
              setItemSelected({ ...itemSelected, label: e.target.value })
            }
            placeholder={placeholder}
            className={cn(searchVariants.normal, error && searchVariants.error)}
          />
          {error ? (
            <IconErrorCircle
              className="absolute right-2 pointer-events-none"
              size={20}
            />
          ) : (
            <ChevronDown
              className="absolute right-2 pointer-events-none"
              size={18}
              color="#2E2E2E"
            />
          )}
        </div>
        <Ariakit.ComboboxPopover
          gutter={8}
          sameWidth
          className="border border-[#B78AF7] shadow-custom-select rounded-2xl p-2 bg-white"
        >
          <ScrollArea
            className={`${filteredItems.length > 4 ? 'h-[150px]' : 'h-fit'}`}
          >
            {filteredItems.length ? (
              filteredItems.map((item) => (
                <Ariakit.ComboboxItem
                  key={item.value}
                  value={item.value}
                  className="p-2 font-normal text-sm flex justify-between data-[focus-visible]:bg-studio-400 rounded-lg w-[97%]"
                  onClick={() => handleSelect(item)}
                >
                  {item.label}
                  {itemSelected.value === item.value && (
                    <CheckIcon className="h-4 w-4 stroke-[#B78AF7]" />
                  )}
                </Ariakit.ComboboxItem>
              ))
            ) : (
              <div>Nenhum resultado...</div>
            )}
          </ScrollArea>
        </Ariakit.ComboboxPopover>
      </div>
    </Ariakit.ComboboxProvider>
  );
}

export { SearchInput };
