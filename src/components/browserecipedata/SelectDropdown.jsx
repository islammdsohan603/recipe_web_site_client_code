'use client';

import { Label, ListBox, Select } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
  'all',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Seafood',
  'Snack',
  'Vegetarian',
  'Main Course',
];

const SelectDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';

  const handleChange = value => {
    if (!value) return;
    router.push(`/browse?category=${value}`);
  };

  return (
    <Select
      value={currentCategory}
      onChange={handleChange}
      placeholder="Choose category"
      className="w-72 flex flex-col"
    >
      <Label className="mb-2 block text-[10px] text-2xl font-bold uppercase tracking-widest text-orange-500/80 font-sans">
        Filter Recipes
      </Label>

      <Select.Trigger className="h-12 rounded-xl border border-orange-950/40 bg-[#140e0c] px-4 text-neutral-200 transition-all duration-300 hover:border-orange-500/40 hover:bg-[#1a120f] focus:border-[#e05320] focus:ring-2 focus:ring-[#e05320]/20 outline-none cursor-pointer flex items-center justify-between group">
        <Select.Value className="text-sm font-medium text-neutral-200 tracking-wide flex items-center leading-none" />
        <Select.Indicator className="text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300 flex items-center justify-center" />
      </Select.Trigger>

      <Select.Popover
        placement="bottom start"
        offset={6}
        className="w-72 rounded-xl border border-orange-950/50 bg-[#1a110e]/95 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200"
      >
        <ListBox className="p-1.5 space-y-0.5">
          {categories.map(category => (
            <ListBox.Item
              key={category}
              id={category}
              textValue={category}
              className="rounded-lg px-3 py-2.5 text-sm text-neutral-400 transition-all duration-200 cursor-pointer outline-none hover:bg-orange-500/10 hover:text-[#e6bfa3] data-[focus=true]:bg-orange-500/10 data-[focus=true]:text-[#e6bfa3] flex items-center justify-between"
            >
              <span className="font-medium tracking-wide">
                {category === 'all' ? 'All Categories' : category}
              </span>
              <ListBox.ItemIndicator className="text-[#e05320] flex items-center justify-center" />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default SelectDropdown;
