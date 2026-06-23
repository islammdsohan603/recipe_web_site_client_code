'use client';

import { Label, ListBox, Select } from '@heroui/react';

const SelectDropdown = () => {
  return (
    <Select className="w-64" placeholder="Select category">
      <Label className="mb-2 block text-[11px] font-bold tracking-wider uppercase text-neutral-400 font-sans">
        Filter By Category
      </Label>

      <Select.Trigger className="h-11 rounded-xl border border-orange-950/30 bg-[#16100e] px-4 text-neutral-200 transition-all duration-300 hover:border-orange-900/50 focus:border-[#e05320] outline-hidden cursor-pointer flex items-center justify-between group">
        <Select.Value className="text-sm text-neutral-200 font-medium" />
        <Select.Indicator className="text-neutral-500 group-hover:text-neutral-300 transition-colors" />
      </Select.Trigger>

      <Select.Popover className="rounded-xl border border-orange-950/40 bg-[#1c1311] shadow-2xl overflow-hidden backdrop-blur-md">
        <ListBox className="p-1.5 space-y-0.5">
          <ListBox.Item
            id="all"
            textValue="All Categories"
            className="rounded-lg text-sm text-neutral-300 px-3 py-2 cursor-pointer transition-colors outline-hidden hover:bg-orange-950/40 hover:text-[#e6bfa3] data-[focus=true]:bg-orange-950/40 data-[focus=true]:text-[#e6bfa3]"
          >
            All Categories
          </ListBox.Item>

          <ListBox.Item
            id="Breakfast"
            textValue="Breakfast"
            className="rounded-lg text-sm text-neutral-300 px-3 py-2 cursor-pointer transition-colors outline-hidden hover:bg-orange-950/40 hover:text-[#e6bfa3] data-[focus=true]:bg-orange-950/40 data-[focus=true]:text-[#e6bfa3]"
          >
            Breakfast
          </ListBox.Item>

          <ListBox.Item
            id="Lunch"
            textValue="Lunch"
            className="rounded-lg text-sm text-neutral-300 px-3 py-2 cursor-pointer transition-colors outline-hidden hover:bg-orange-950/40 hover:text-[#e6bfa3] data-[focus=true]:bg-orange-950/40 data-[focus=true]:text-[#e6bfa3]"
          >
            Lunch
          </ListBox.Item>

          <ListBox.Item
            id="Dinner"
            textValue="Dinner"
            className="rounded-lg text-sm text-neutral-300 px-3 py-2 cursor-pointer transition-colors outline-hidden hover:bg-orange-950/40 hover:text-[#e6bfa3] data-[focus=true]:bg-orange-950/40 data-[focus=true]:text-[#e6bfa3]"
          >
            Dinner
          </ListBox.Item>

          <ListBox.Item
            id="Dessert"
            textValue="Dessert"
            className="rounded-lg text-sm text-neutral-300 px-3 py-2 cursor-pointer transition-colors outline-hidden hover:bg-orange-950/40 hover:text-[#e6bfa3] data-[focus=true]:bg-orange-950/40 data-[focus=true]:text-[#e6bfa3]"
          >
            Dessert
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default SelectDropdown;
