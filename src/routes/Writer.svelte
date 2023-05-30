<script lang="ts">

    import { activeStory, predicting } from "$lib/stores";
    import { optimisticallySaveActiveStory, predict } from "$lib/story";

    const keydown = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === "s" && e.ctrlKey) {
            e.preventDefault();
            optimisticallySaveActiveStory()
        } else if (e.key.toLowerCase() === "tab" && (e.target as HTMLElement).classList.contains("allows-predict")) {
            e.preventDefault();
            if ($predicting) return;
            optimisticallySaveActiveStory();
            predict();
        }
    }

    let textelement: HTMLTextAreaElement;

    export const focus = () => {
        textelement.focus();
    }

</script>

{#if $activeStory === null}
    <div class="no-story">No Story Selected.</div>
{:else}
    <div class="main">
        <input class="title-input" type="text" bind:value={$activeStory["title"]} on:keydown={keydown} placeholder="Title" />
        <textarea class="textarea allows-predict" bind:this={textelement} bind:value={$activeStory["content"]} on:keydown={keydown} placeholder="Start writing your story here!" />
    </div>
{/if}

<style lang="scss">

    .main {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: max-content 1fr;
    }

    .textarea, .title-input {
        width: 100%;
        height: 100%;
        background: transparent;
        color: white;
        border: none;
        resize: none;
        padding: 0.5rem;

        &:focus {
            outline: none;
        }
    }

    .title-input {
        font-size: 1.75rem;
    }

    .no-story {
        width: 100%;
        height: 100%;
        display: grid;
        align-items: center;
        text-align: center;
        opacity: 0.5;
    }

</style>