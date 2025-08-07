import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Calendar } from "./calendar";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type DatePickerFieldProps<T extends FieldValues> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<T, any>;
  label: string;
  description?: string;
  disabledDate?: (date: Date) => boolean;
};

const DatePickerField = <T extends FieldValues>({
  description,
  disabledDate,
  field,
  label,
}: DatePickerFieldProps<T>) => {
  return (
    <FormItem className="flex flex-col text-gray-200">
      <FormLabel className="text-gray-200/80">{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] bg-slate-700 pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto size-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto bg-gray-300 p-0"
          align="end"
          sideOffset={8}
          side="right"
        >
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={disabledDate}
            captionLayout="dropdown"
            classNames={{
              month: "text-gray-900",
            }}
          />
        </PopoverContent>
      </Popover>
      {description ? (
        <FormDescription className="mt-2 text-gray-200">
          {description}
        </FormDescription>
      ) : null}
      <FormMessage />
    </FormItem>
  );
};

export default DatePickerField;
