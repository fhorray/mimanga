import type { SelectUser } from "@/db/schemas";
import type {
  Column,
  ColumnBaseConfig,
  ColumnDataType,
  ColumnsSelection,
  Table,
} from "drizzle-orm";

import type { PgTable } from "drizzle-orm/pg-core";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

export interface TableWithId extends PgTable {
  id: Column<ColumnBaseConfig<ColumnDataType, string>>;
  $inferSelect: { [x: string]: unknown };
  $inferInsert: { [x: string]: unknown };
}
