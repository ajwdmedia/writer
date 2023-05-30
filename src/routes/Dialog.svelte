<script lang="ts">

    import { Jellyfish, Firework } from "svelte-loading-spinners";
    import CloudDownload from "@ajwdmedia/svelterial-icons/Outlined/CloudDownload.svelte";

    import { createEventDispatcher, onMount } from "svelte";
    import { checkInstall, doInstall } from "$lib/dalai/api";
    const dispatch = createEventDispatcher();

    let status = "Checking Installation";

    let installRecommended = false;
    let installing = false;

    onMount(async () => {
        let result = await checkInstall();
        if (result) {
            dispatch("ok");
            return;
        }

        installRecommended = true;
        status = "LLaMa Not Installed"
    });

    const installLlama = async () => {
        status = "Installing";
        installing = true;

        let result = await doInstall();

        if (result) {
            dispatch("ok");
            return;
        }

        status = "Failed";
        installing = false;
        installRecommended = false;
    }

</script>

<div class="insert">

    <div class="spinner">
        {#if !installRecommended}
            <Firework color="white" size={70}  />
        {:else if installing}
            <Jellyfish color="white" size={100} />
        {:else}
            <CloudDownload size={70} fill="white" />
        {/if}
    </div>

    <div class="status">
        {status}
    </div>
    <div class="action">
        {#if installRecommended && installing}
            Do not close this tab.
        {:else if installRecommended}
            <button class="button" on:click={installLlama}>Click to install.</button>
        {/if}
    </div>

</div>

<style lang="scss">

    .insert {
        width: 90vw;
        max-width: 800px;
        background-color: #111742;
        padding: 1rem;
        border-radius: 1rem;


        grid-template-columns: 100px 1fr;
        grid-template-rows: max-content 1fr;
        grid-template-areas: 'spin status' 'spin action';

        display: grid;
        row-gap: 1rem;
        column-gap: 2rem;
    }

    .spinner {
        grid-area: spin;
        display: grid;
        justify-content: center;
        align-items: center;
        height: 100px;
    }

    .status {
        grid-area: "status";
        color: white;
        font-size: 2rem;
    }

    .button {
        background-color: hsl(233, 54%, 26%);
        filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));
        padding: 0.5rem;
        border: 1px solid hsl(233, 45%, 40%);
        border-radius: 5px;

        transition-duration: 0.3s;
        transition-property: background-color;

        &:hover {
            background-color: hsl(233, 54%, 34%);
        }
    }

</style>