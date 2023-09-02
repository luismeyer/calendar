"use server";

import { currentUser } from "@clerk/nextjs";
import { db } from "../lib/db";

export async function listEvents() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Not logged in");
  }

  const result = await db
    .selectFrom("events")
    .where("ownerid", "=", user.id)
    .selectAll()
    .execute();

  return result;
}
