<script lang="ts">

    import { stories } from "$lib/stores";
    import { createStory, loadStory } from "$lib/story";

    const create = async () => {
        const story = await createStory();
        stories.update((out) => { out.unshift({ id: story.id, title: story.title }); return out; });
    }

</script>

<div class="container">

    <div class="card new" on:click={create} on:keypress={create}>
        + Create New Story
    </div>

    {#each $stories as story}

    <div class="card" on:click={() => loadStory(story.id)} on:keypress={() => loadStory(story.id)}>
        {story.title}
    </div>

    {/each}

</div>

<style lang="scss">

    .container {
        width: 100%;
        max-height: 100%;
        height: max-content;
        display: grid;
        gap: 1rem;
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

        &:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }

        &.new {
            border: 1px dashed hsl(233, 40%, 40%);
            color: hsl(233, 20%, 80%);
            &:hover {
                color: white;
            }
        }
    }

</style>