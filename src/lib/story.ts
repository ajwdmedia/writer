import type { Story } from "./story-types";
import { stories } from "./stores";

export const createStory = async () => {

    const story = await (await fetch("/api/story", { "method": "PUT" })).json() as Story;

    return story;

};

export const listStories = async () => {

    const result = await (await fetch("/api/story", { "method": "GET" })).json() as {id: string, title: string}[];

    return result;

};
