"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export function DateFilterDialog() {
  const [date, setDate] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const handleDateSelect = (range: DateRange | undefined) => {
    if (!range) {
      setDate({ from: undefined, to: undefined });
      return;
    }
    setDate(range);
  };

  const handleClear = () => {
    setDate({ from: undefined, to: undefined });
  };

  const handleApply = () => {
    // Here you would typically filter your entries based on the date range
    console.log("Applying date range:", date);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border-blue-200/50"
        >
          <CalendarIcon className="w-4 h-4 text-blue-500" />
          {date.from ? (
            date.to ? (
              <>
                {format(date.from, "MMM d")} - {format(date.to, "MMM d, yyyy")}
              </>
            ) : (
              format(date.from, "MMM d, yyyy")
            )
          ) : (
            "Filter by Date"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
            Filter Entries by Date
          </DialogTitle>
        </DialogHeader>
        <Separator className="my-4" />
        <div className="flex justify-center px-2 pb-4">
          <Calendar
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={1}
            className={cn(
              "rounded-md border-none mx-auto",
              "dark:bg-transparent",
              "[&_.rdp-day]:h-9 [&_.rdp-day]:w-9",
              "[&_.rdp-day_span]:rounded-md",
              "[&_.rdp-button]:w-10 [&_.rdp-button]:h-10",
              "[&_.rdp-day.rdp-day_selected]:bg-blue-600",
              "[&_.rdp-day.rdp-day_selected]:hover:bg-blue-700",
              "[&_.rdp-day.rdp-day_selected]:focus:bg-blue-700",
              "[&_.rdp-day:hover]:bg-blue-50 dark:[&_.rdp-day:hover]:bg-blue-950",
              "[&_.rdp-day.rdp-day_selected:not(rdp-day_start):not(rdp-day_end)]:bg-blue-100",
              "dark:[&_.rdp-day.rdp-day_selected:not(rdp-day_start):not(rdp-day_end)]:bg-blue-900/50"
            )}
          />
        </div>
        <DialogFooter className="flex justify-between p-6 pt-0">
          <Button
            variant="ghost"
            onClick={handleClear}
            className="hover:bg-blue-50 dark:hover:bg-blue-950"
          >
            Clear
          </Button>
          <Button
            onClick={handleApply}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            Apply Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
