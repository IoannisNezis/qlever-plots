<script lang="ts">
    import Icon from '$lib/svg/wrench-screwdriver.svelte';
    let showModal: boolean;
    let dialog: HTMLDialogElement;
    $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}
    class="border bg-slate-400 w-3/4 rounded p-2"
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <div>
            <h2 class="">Chart Settings</h2>
        </div>
        <hr />
        <div class="h-40"></div>
        <hr />
        <!-- svelte-ignore a11y-autofocus -->
        <button autofocus on:click={() => dialog.close()}>close modal</button>
    </div>
</dialog>

<button
    class="border border-black rounded-md p-1 bg-slate-300 hover:bg-slate-500 hover:cursor-pointer"
    on:click={() => (showModal = true)}
>
    <Icon></Icon>
</button>
