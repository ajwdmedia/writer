import { QuickDB } from "quick.db"

export const db = new QuickDB();

export const stories = db.table("story");