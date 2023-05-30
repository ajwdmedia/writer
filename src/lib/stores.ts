import { stores } from "@ajwdmedia/useful";
import type { Story } from "$lib/story-types";

export const stories = stores.valueWritable<{ id: string, title: string }[]>([]);

export const activeStory = stores.valueWritable<Story | null>(null);