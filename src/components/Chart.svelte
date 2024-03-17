<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import SettingsButton from './SettingsButton.svelte';
    import BarChart from './BarChart.svelte';

    export let title: string;
    export let dataUrl: string;
    let loading: boolean = true;

    interface ChartOptions{
        data: number[],
        dataLabels: string[],
        yAxisLabel: string
    }
    const options:ChartOptions = {
        data: [],
        dataLabels: [],
        yAxisLabel: ''
    };

    interface QleverResultBinding {
        [key: string]: {
            value: string;
            type: string;
        };
    }
    interface QleverQueryResult {
        head: {
            vars: string[];
        };
        results: {
            bindings: QleverResultBinding[];
        };
    }

    async function fetchJson(url: string) {
        let response = (await d3.json(url)) as QleverQueryResult;
        return response;
    }

    onMount(() => {
        fetchJson(dataUrl)
            .then((result) => {
                const dataLabelName = result.head.vars[0];
                const dataValueName = result.head.vars[1];
                options.yAxisLabel = result.head.vars[1];
                options.data = result.results.bindings.map((x) => {
                    return parseFloat(x[dataValueName].value);
                });
                options.dataLabels = result.results.bindings.map((x) => {
                    return x[dataLabelName].value;
                });
                loading = false;
            })
            .catch((error) => {
                console.log(error);
            });
    });
</script>

<div class="static bg-slate-200 rounded-lg shadow-lg hover:shadow-xl p-3 flex flex-col w-full">
    <div class="flex justify-between items-center">
        <div></div>
        <h1 class="underline">{title}</h1>
        <div>
            <SettingsButton />
        </div>
    </div>
    {#if loading}
        <div class="h-[400px] border grid">
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
    {:else}
        <BarChart {...options} />
    {/if}
</div>
