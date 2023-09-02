"use server";

import { Input, object, parse, string } from "valibot";
import { TitleSchema } from "../lib/event";
import { currentUser } from "@clerk/nextjs";
import { db } from "../lib/db";
import dayjs from "dayjs";

const EventInputSchema = object({
  endDate: string("End Date is required"),
  startDate: string("Start Date is required"),
  title: TitleSchema,
});

export async function createEvent(input: Input<typeof EventInputSchema>) {
  const data = parse(EventInputSchema, input);

  const user = await currentUser();

  if (!user) {
    throw new Error("Not logged in");
  }

  const enddate = dayjs(data.endDate).toDate();
  const startdate = dayjs(data.startDate).toDate();

  const result = await db
    .insertInto("events")
    .values({ enddate, startdate, ownerid: user.id, title: data.title })
    .execute();

  return true;
}
