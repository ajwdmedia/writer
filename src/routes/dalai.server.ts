import Dalai from "dalai";

export const dalai = new Dalai() as {
    install: (mode: string, ...modelType: string[]) => Promise<void>,
    installed: () => Promise<string[]>
};