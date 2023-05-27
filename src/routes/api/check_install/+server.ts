import { dalai } from "../../dalai.server";
import type { RequestHandler } from "./$types";

export const GET = (async (req, res) => {
    res.json({ has_alpaca: (await dalai.installed()).length > 0 })
}) satisfies RequestHandler