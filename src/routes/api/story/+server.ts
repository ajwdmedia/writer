import { stories } from "../../db.server";
import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const GET = (async () => {
    
    let keys = await stories.all();

    return json(keys.map(it => it.id));

}) satisfies RequestHandler

