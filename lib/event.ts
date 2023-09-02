import { Input, maxLength, minLength, object, regex, string } from "valibot";

export type Event = {
  id: number;
  title: string;
  description?: string;
  startdate: Date;
  enddate: Date;
};

export const TitleSchema = string("Title is required", [
  minLength(4, "Needs to be at least 4 characters"),
  maxLength(50, "Needs to be at most 50 characters"),
]);
