export type Story = {
    id: string,
    content: string,
    title: string,
    settings: {
        threads: number,
        n_predict: number,
        top_k: number,
        top_p: number,
        repeat_last_n: number,
        repeat_penalty: number,
        temp: number,
    },
    memory: string,
    direction: string,
}