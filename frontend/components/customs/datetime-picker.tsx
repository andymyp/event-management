"use client";

import { format, setHours, setMinutes } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChangeEventHandler, useState } from "react";
import { Input } from "../ui/input";

interface Props {
  id?: string;
  label?: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DatetimePicker({ id, label, date, setDate }: Props) {
  const [timeValue, setTimeValue] = useState<string>("00:00");

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;

    if (!date) {
      setTimeValue(time);
      return;
    }

    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(date, minutes), hours);

    setDate(newSelectedDate);
    setTimeValue(time);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setDate(date);
      return;
    }

    const [hours, minutes] = timeValue
      .split(":")
      .map((str) => parseInt(str, 10));

    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );

    setDate(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal bg-transparent",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? (
            format(date, "dd/MM/yyyy, HH:mm aa")
          ) : (
            <span>{label ? label : "Pick date time"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDaySelect}
          required={true}
          initialFocus
          footer={
            <Input
              type="time"
              value={timeValue}
              onChange={handleTimeChange}
              className="flex w-full justify-center items-center mt-3"
            />
          }
        />
      </PopoverContent>
    </Popover>
  );
}
