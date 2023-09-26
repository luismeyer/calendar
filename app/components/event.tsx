"use client";

import dayjs from "dayjs";

import { StyledEvent } from "../../components/styled/event";
import { Card, CardDescription, CardTitle } from "../../components/ui/card";
import { HOURS, PERCENT } from "../../lib/const";
import { Event } from "../../lib/event";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "../../components/ui/dialog";

type EventProps = {
  event: Event;
};

export function Event({ event }: EventProps) {
  const startDate = dayjs(event.startdate);
  const endDate = dayjs(event.enddate);

  const hour = startDate.hour();
  const minutes = endDate.minute();

  const top = HOURS.indexOf(hour) * 60 + minutes;

  const start = startDate.format("HH:mm");
  const end = endDate.format("HH:mm");

  const duration = endDate.diff(startDate, "minutes");
  const relativeHeight = PERCENT * duration;

  const isExtended = relativeHeight > 6;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <StyledEvent
          className="hover:shadow-xl transition-all cursor-pointer overflow-hidden"
          $relativeTop={PERCENT * top}
          $relativeHeight={relativeHeight}
        >
          <Card className="h-full w-full flex items-center">
            <div className="px-4">
              <CardTitle className="text-lg">{event.title}</CardTitle>

              {isExtended && (
                <CardDescription className="text-sm">
                  {start}-{end}
                </CardDescription>
              )}
            </div>
          </Card>
        </StyledEvent>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>

          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
