import { stories } from "../../db.server";
import { json } from "@sveltejs/kit";
import { randomUUID } from "node:crypto";

import type { RequestHandler } from "./$types";
import type { Story } from "$lib/story-types";

export const GET = (async () => {
    
    const keys = await stories.all();

    return json(keys.map(it => { return { id: it.id, title: it.value.title } }));

}) satisfies RequestHandler

const createStory = (): Story => {
    return {
        id: randomUUID(),
        title: "Untitled Story",
        direction: "",
        memory: "",
        content: "",
        settings: {
            n_predict: 200,
            repeat_last_n: 64,
            repeat_penalty: 1.3,
            top_k: 40,
            top_p: 0.9,
            temp: 0.8,
            threads: 1,
        }
    }
}

export const PUT = (async () => {

    const story = createStory();
    await stories.set(story.id, story);

    return json(story);

});