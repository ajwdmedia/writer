<script lang="ts">

    import Dialog from "./Dialog.svelte";

    import Stories from "./Stories.svelte";
    import Writer from "./Writer.svelte";
    import Builder from "./Builder.svelte";

    import { fade } from "svelte/transition"
    import { stories } from "$lib/stores";
    import { listStories } from "$lib/story";
    import { onMount } from "svelte";
    import { Toaster } from "svelte-french-toast";


    let loading = false;

    const ready = async () => {
        $stories = await listStories();
        loading = false;
    }

    let focus: () => any;

    // FOR DEBUG ONLY

    onMount(ready);

</script>

<div class="stories">
    <Stories />
</div>

<div class="writer">
    <Writer bind:focus={focus} />
</div>

<div class="builder">
    <Builder on:focus-writer={focus()} />
</div>

{#if loading}
<div class="dialog" out:fade={{ duration: 300 }}>

    <Dialog on:ok={ready} />

</div>
{/if}

<Toaster />

<style lang="scss">

    :global(*) {
        box-sizing: border-box;
        font: inherit;
        font-family: 'Roboto';
        color: white;
    }

    :global(html, body) {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        background-color: #070a1f;

    }

    :global(body) {
        display: grid;
        padding: 1rem;
        gap: 1rem;
        grid-template-columns: 1fr 2fr 1fr;
    }

    .stories, .writer, .builder {
        background-color: hsl(233, 60%, 12%);
        padding: 1rem;
        border: 1px solid hsl(233, 45%, 25%);
        border-radius: 1rem;
        position: relative;
    }

    .dialog {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(5px);

        display: grid;
        align-items: center;
        justify-content: center;
    }

</style>