import { Generated } from "kysely";

import { createKysely } from "@vercel/postgres-kysely";

interface EventTable {
  id: Generated<number>;
  title: string;
  ownerid: string;
  startdate: Date;
  enddate: Date;
}

interface Database {
  events: EventTable;
}

export const db = createKysely<Database>();
