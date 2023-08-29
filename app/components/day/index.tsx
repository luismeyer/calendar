import dayjs from "dayjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { StyledCardWrapper } from "./styled";

type DayProps = {
  index: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

type Event = {
  id: number;
  title: string;
  description?: string;
  start: Date;
  end: Date;
};

const Events: Event[] = [
  {
    id: 1,
    title: "Team Daily",
    start: dayjs().set("hour", 12).toDate(),
    end: dayjs().set("hour", 13).minute(40).toDate(),
  },
];

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const MINUTES = HOURS.length * 60;
const PERCENT = 100 / MINUTES;

export function Day({ index }: DayProps) {
  return (
    <div className="h-full">
      <div className="flex flex-col bg-gray-100 rounded-md h-full">
        <div className="p-4">
          <h2 className="text-2xl text-center">{Days[index]}</h2>
        </div>

        <div className="grid h-full relative">
          {HOURS.map((hour) => (
            <div key={hour}>
              <Separator />

              <div className="h-full cursor-pointer hover:bg-gray-200 transition-all p-2">
                <span>{hour}:00</span>
              </div>
            </div>
          ))}

          {Events.map((event) => {
            const startDate = dayjs(event.start);
            const endDate = dayjs(event.end);

            const hour = startDate.hour();
            const minutes = endDate.minute();

            const top = HOURS.indexOf(hour) * 60 + minutes;

            const start = startDate.format("HH:mm");
            const end = endDate.format("HH:mm");

            const duration = endDate.diff(startDate, "minutes");
            const relativeHeight = Math.floor(PERCENT * duration);

            const isExtended = relativeHeight > 6;

            return (
              <StyledCardWrapper
                key={event.id}
                className="hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                relativeTop={Math.floor(PERCENT * top)}
                relativeHeight={relativeHeight}
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
              </StyledCardWrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}
