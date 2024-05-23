<script lang="ts">
    import * as d3 from 'd3';
    import { analyseStructure, transformData, predictConfig } from '$lib/utils';
    import { onMount } from 'svelte';
    import ChartSettings from './ChartSettings.svelte';
    import type {
        ChartConfig,
        ChartType,
        LoadingState,
        QleverData,
        QleverResponse,
        StructureAnalysis
    } from '$lib/types';
    import LineChart from './charts/LineChart.svelte';
    import LoadingCard from './loadingCard.svelte';

    export let title: string;
    export let dataUrl: string;

    let loadingState: LoadingState = 'loading';

    let data: QleverData;
    let structure: StructureAnalysis;
    let chartType: ChartType;
    let chartConfig: ChartConfig;

    async function fetchJson(url: string): Promise<QleverResponse> {
        let response = (await d3.json(url)) as QleverResponse;
        return response;
    }

    onMount(() => {
        fetchJson(dataUrl)
            .then((response) => {
                structure = analyseStructure(response);
                data = transformData(response, structure);
                [chartType, chartConfig] = predictConfig(structure, data);
                loadingState = 'done';
            })
            .catch((error) => {
                console.error(error);
                loadingState = 'failed';
            });
    });
</script>

<div
    class="static bg-zinc-300 dark:bg-zinc-700 rounded-lg shadow-lg hover:shadow-xl p-3 flex flex-col w-full"
>
    <div class="flex justify-between items-center">
        <div></div>
        <h1 class="underline text-black dark:text-white">{title}</h1>
        <div>
            <ChartSettings />
        </div>
    </div>
    <LoadingCard {loadingState}></LoadingCard>
    {#if loadingState === 'done' && chartType === 'line'}
        <LineChart {data} {structure} config={chartConfig}></LineChart>
    {/if}
</div>
