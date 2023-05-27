import { dalai } from "../../dalai.server";
import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";

export const GET = (async () => {
    return json({ has_alpaca: (await dalai.installed()).length > 0 })
}) satisfies RequestHandler