"use client";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { object, regex, string, Input as ValiInput } from "valibot";

import { valibotResolver } from "@hookform/resolvers/valibot";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { TitleSchema } from "../../lib/event";
import dayjs from "dayjs";
import { createEvent } from "../../api/create-event";

const TimeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

const FormSchema = object({
  title: TitleSchema,
  start: string("Start time is required", [
    regex(TimeRegex, "Invalid time format"),
  ]),
  end: string("End time is required", [
    regex(TimeRegex, "Invalid time format"),
  ]),
});

export type FormData = ValiInput<typeof FormSchema>;

type EventInputProps = {
  hour: number;
  handleSubmit: () => void;
  date: dayjs.Dayjs;
};

export function EventInput({ hour, handleSubmit, date }: EventInputProps) {
  const form = useForm<FormData>({
    resolver: valibotResolver(FormSchema),
    defaultValues: {
      title: "",
      start: `${hour}:00`,
      end: `${hour + 1}:00`,
    },
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      const [startHour, startMinute] = data.start.split(":");
      const [endHour, endMinute] = data.end.split(":");

      const startDate = date
        .set("hour", Number(startHour))
        .set("minute", Number(startMinute))
        .toISOString();

      const endDate = date
        .set("hour", Number(endHour))
        .set("minute", Number(endMinute))
        .toISOString();

      console.log({ endDate, startDate, title: data.title });

      await createEvent({ endDate, startDate, title: data.title });

      handleSubmit();
    },
    [date, handleSubmit]
  );

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Create Event</h4>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>

                <FormControl>
                  <Input placeholder="Daily" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
