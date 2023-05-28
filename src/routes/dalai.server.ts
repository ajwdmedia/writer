import Dalai from "dalai";

type DalaiRequest = {
    prompt: string,
    model: string,
    url?: string,
    threads: number,
    n_predict: number,
    top_k: number,
    top_p: number,
    repeat_last_n: number,
    repeat_penalty: number,
    temp: number,
    batch_size: number,
    skip_end: boolean,

}

export const dalai = new Dalai() as {
    install: (mode: string, ...modelType: string[]) => Promise<void>,
    installed: () => Promise<string[]>,
    request: (request: DalaiRequest, callback: (token: string ) => void ) => void
};

export const request = (prompt: string, params: Omit<DalaiRequest, "prompt" | "model" | "url" | "skip_end">) => {
    return new Promise<string>(( resolve, reject ) => {
        let output = "";

        dalai.request({
            prompt: prompt,
            model: "alpaca.7B",
            skip_end: false,
            ...params
        }, (token) => {
            if (token === "\n\n<end>") {
                return resolve(output);
            }
            output += token;
        })
    })
}