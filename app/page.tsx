import { listEvents } from "../api/list-events";
import { Day } from "./components/day";
import dayjs from "dayjs";

const createDays = () => {
  const days = [];

  for (let i = 0; i < 7; i++) {
    days.push(dayjs().set("day", i));
  }

  return days;
};

const DAYS = createDays();

export default async function Home() {
  const events = await listEvents();

  return (
    <main className="grid grid-flow-col auto-cols-fr gap-4 w-screen h-screen p-4">
      {DAYS.map((day) => (
        <Day
          key={day.toISOString()}
          date={day}
          events={events.filter(({ startdate }) =>
            day.isSame(startdate, "day")
          )}
        />
      ))}
    </main>
  );
}
