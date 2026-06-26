import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const reelsTable = sqliteTable("reels_table", {
  id: int().primaryKey({ autoIncrement: true }),
  description: text().notNull(),
  reelId: text().notNull(),

  creationDate: int({ mode: "number" }).notNull()
});
