<script lang="ts">

    import { activeStory, predicting, predictions } from "$lib/stores";
    import { fade } from "svelte/transition"; 
    import { Circle } from "svelte-loading-spinners";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

</script>

{#if $activeStory === null}
    <div class="no-story">No Story Selected.</div>
{:else}
    <div class="main" class:predicting={$predicting || $predictions.length > 0}>
        <label class="card two">
            <div class="input-name">Predict Length</div>
            <input type="number" bind:value={$activeStory["settings"]["n_predict"]} />
        </label>
        <label class="card two">
            <div class="input-name">Repeat Last N</div>
            <input type="number" bind:value={$activeStory["settings"]["repeat_last_n"]} />
        </label>
        <label class="card two">
            <div class="input-name">Repeat Penalty</div>
            <input type="number" bind:value={$activeStory["settings"]["repeat_penalty"]} />
        </label>
        <label class="card two">
            <div class="input-name">Top K</div>
            <input type="number" bind:value={$activeStory["settings"]["top_k"]} />
        </label>
        <label class="card two">
            <div class="input-name">Top P</div>
            <input type="number" bind:value={$activeStory["settings"]["top_p"]} />
        </label><label class="card two">
            <div class="input-name">Temperature</div>
            <input type="number" bind:value={$activeStory["settings"]["temp"]} />
        </label>
        <label class="card two">
            <div class="input-name">Threads</div>
            <input type="number" bind:value={$activeStory["settings"]["threads"]} />
        </label>
        <label class="card stack">
            <span>Memory</span>
            <textarea class="textarea" bind:value={$activeStory["memory"]} placeholder="The AI Remembers things better in here" />
        </label>
        <label class="card stack">
            <span>Direction</span>
            <textarea class="textarea" bind:value={$activeStory["direction"]} placeholder="Direct the next part of the story here" />
        </label>
    </div>
{/if}

{#if $predicting || $predictions.length > 0}

    <div class="predictions" transition:fade={{duration: 300}}>
        {#if $predicting}
            <div class="central">
                <Circle color="white" size={40} />
            </div>
        {:else if $activeStory !== null}
            <div class="prediction-items">
                {#each $predictions as pred}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="card" on:click={() => { $activeStory["content"] += pred; $predicting = false; $predictions = []; dispatch("focus-writer") }}>
                        {pred}
                    </div>
                {/each}
            </div>
        {/if}
    </div>

{/if}

<style lang="scss">

    input {
        background: transparent;
        text-align: right;
        border: none;
        border-radius: 5px;

        &:focus {
            outline: none;
            border-bottom: 1px solid white;
        }
    }

    .main {
        width: 100%;
        max-height: 100%;
        height: max-content;
        display: grid;
        gap: 1rem;

        transition-duration: 300ms;
        transition-property: transform, opacity, filter;

        transform: scale(1);
        opacity: 1;
        filter: none;

        &.predicting {
            transform: scale(0.7);
            opacity: 0.5;
            filter: blur(8px);
        }
    }

    .card {
        background-color: transparent;
        padding: 1rem;
        border: 1px solid hsl(233, 40%, 40%);
        border-radius: 0.5rem;
        text-align: center;
        cursor: pointer;

        transition-duration: 300ms;
        transition-property: background-color, color;

        &.two {
            display: grid;
            grid-template-columns: max-content 1fr;
            gap: 1rem;
            width: 100%;
        }

        &.stack {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: max-content 5rem;
            text-align: left;
            gap: 1rem;

        }
    }

    .textarea, .title-input {
        width: 100%;
        height: 100%;
        background: transparent;
        color: white;
        border: none;
        resize: none;

        &:focus {
            outline: none;
        }
    }

    .no-story {
        width: 100%;
        height: 100%;
        display: grid;
        align-items: center;
        text-align: center;
        opacity: 0.5;
    }

    .predictions {
        position: absolute;
        inset: 0;
        display: grid;
    }

    .prediction-items {
        padding: 1rem;
        max-height: 100%;
        height: max-content;
        display: grid;
        gap: 1rem;
        
        .card {
            background: hsla(233, 60%, 12%, 0.7);
            text-align: left;

            &:hover {
                background-color: hsla(233, 60%, 17%, 0.7);
            }
        }

    }

    .central {
        display: grid;
        justify-content: center;
        align-items: center;
    }

</style>