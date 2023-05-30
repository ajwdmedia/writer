import type { Story } from "./story-types";
import { activeStory, predicting, predictions, stories } from "./stores";
import toast from "svelte-french-toast";

export const createStory = async () => {

    const story = await (await fetch("/api/story", { "method": "PUT" })).json() as Story;

    return story;

};

export const listStories = async () => {

    const result = await (await fetch("/api/story", { "method": "GET" })).json() as {id: string, title: string}[];

    return result;

};

export const getStory = async (id: string) => {
    const story = await (await fetch("/api/story/" + id, { "method": "GET" })).json() as Story;

    return story;
}

export const loadStory = async (id: string) => {
    const story = await getStory(id);
    activeStory.set(story);
    return story;
};

export const saveStory = async (story: Story) => {
    const result = await (await fetch("/api/story/" + story.id, { "method": "POST", body: JSON.stringify(story) })).json() as Story;
    return result;
};

export const optimisticallySaveActiveStory = async () => {
    const story = activeStory.value();
    if (story === null) throw new Error("There is no active Story");
    stories.update((out) => { 
        for (let i = 0; i < out.length; i++) {
            if (out[i].id === story.id) {
                out[i].title = story.title;
            }
        } 
        return out;
    });
    await toast.promise(
        saveStory(story),
        {
            loading: "Saving...",
            success: "Story Saved!",
            error: "Failed to Save"
        },
        {
            style: "background: hsl(233, 40%, 15%); color: #fff; border: 1px solid hsl(233, 40%, 40%);border-radius: 10px",
            iconTheme: {
                primary: 'hsl(233, 30%, 60%)',
                secondary: '#ffffff'
            },
            position: "bottom-center",
            duration: 3500
        }
    )
}

export const predict = async (): Promise<[ string, string, string ] | []> => {
    predicting.set(true);
    const story = activeStory.value();
    if (story === null) throw new Error("Story Not Selected");

    const prompt = story.content.split(".").slice(0, 5).join(".");
    const { direction, memory, settings: options } = story;
    try {
        let result = (await (await fetch("/api/request", { method: "POST", body: JSON.stringify({ prompt, direction, memory, options }) })).json()).answers as [string, string, string];
        predicting.set(false);
        predictions.set(result);
        return result;
    } catch (_err) {
        console.log(_err);
    }

    predicting.set(false);
    predictions.set([]);
    return [];
}
