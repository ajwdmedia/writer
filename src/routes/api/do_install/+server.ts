import { dalai } from "../../dalai.server";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST = (async () => {
    await dalai.install("llama", "7B");
    return json({ installed: true });
}) satisfies RequestHandler
