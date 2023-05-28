import { request as dalaiRequest } from "../../dalai.server"
import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const GET = (async ({ request }) => {
    const body = await request.json();

    let prompt = `Remembering "${body.memory}", and abiding by the following direction: "${body.direction}", continue this story: "${body.prompt}"\n\n "`;

    let response1 = await dalaiRequest(prompt, body.options);
    let response2 = await dalaiRequest(prompt, body.options);
    let response3 = await dalaiRequest(prompt, body.options);

    return json({ answers: [ response1, response2, response3 ] });

}) satisfies RequestHandler 