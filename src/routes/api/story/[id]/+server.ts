import { stories } from "../../../db.server";
import { json, text } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const GET = (async ({ params }) => {
    
    const story = await stories.get(params.id);

    return json(story);

}) satisfies RequestHandler

export const POST = (async ({ params, request }) => {

    const body = await request.json();
    body.id = params.id;
    const story = await stories.set(params.id, body);

    return json(story);

}) satisfies RequestHandler

export const DELETE = (async ({ params }) => {

    await stories.delete(params.id);
    return text("", { status: 204 });

}) satisfies RequestHandler