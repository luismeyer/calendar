"use client";

import dayjs from "dayjs";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from "../../components/ui/separator";
import { EventInput } from "./event-input";

type SlotProps = {
  hour: number;
  // here is the client server border
  date: string;
};

export function Slot({ hour, date }: SlotProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="text-left">
          <Separator />

          <div className="h-full cursor-pointer hover:bg-gray-200 transition-all p-2">
            <span>{hour}:00</span>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <EventInput
          date={dayjs(date)}
          hour={hour}
          close={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
