import { Dayjs } from "dayjs";
import { HOURS } from "../../lib/const";
import { Event as EventType } from "../../lib/event";
import { Event } from "./event";
import { Slot } from "./slot";

type DayProps = {
  date: Dayjs;
  events: EventType[];
};

const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function Day({ date, events }: DayProps) {
  return (
    <div className="h-full">
      <div className="flex flex-col bg-gray-100 rounded-md h-full">
        <div className="p-4">
          <h2 className="text-2xl text-center">{Days[date.day()]}</h2>
        </div>

        <div className="grid h-full relative">
          {HOURS.map((hour) => (
            <Slot key={hour} hour={hour} date={date.toISOString()} />
          ))}

          {events.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
