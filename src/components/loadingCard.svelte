<script lang="ts">
    import type { LoadingState } from '$lib/types';
    export let loadingState: LoadingState;
</script>

{#if loadingState === 'loading'}
    <div class="h-[400px] grid">
        <div class="place-self-center flex">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="animate-spin h-7 w-7 mr-3"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
            </svg>

            <span>Loading data...</span>
        </div>
    </div>
{:else if loadingState === 'failed'}
    <div class="h-[400px] grid">
        <div class="place-self-center flex items-center border border-red-500 p-2 rounded-lg">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-7 h-7 text-red-500"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
            </svg>
            <span class="ml-3 text-black dark:text-white">
                Retrieving data has failed! Check the query.
            </span>
        </div>
    </div>
{/if}
