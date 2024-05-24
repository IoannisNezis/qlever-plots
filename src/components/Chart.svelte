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
    import Maximize from '$lib/svg/maximize.svelte';
    import Reload from '$lib/svg/reload.svelte';
    import WrenchScrewdriver from '$lib/svg/wrench-screwdriver.svelte';
    import CodeBracket from '$lib/svg/code-bracket.svelte';

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
        <h1 class="underline text-black dark:text-white ms-5">{title}</h1>
        <div class="flex flex-row space-x-1">
            <button
                class="rounded-md p-1 bg-blue-300 hover:bg-blue-500 dark:bg-purple-950 dark:hover:bg-purple-800 text-black dark:text-white hover:cursor-pointer"
            >
                <WrenchScrewdriver></WrenchScrewdriver>
            </button>
            <button
                class="rounded-md p-1 bg-blue-300 hover:bg-blue-500 dark:bg-purple-950 dark:hover:bg-purple-800 text-black dark:text-white hover:cursor-pointer"
            >
                <CodeBracket></CodeBracket>
            </button>
            <button
                class="rounded-md p-1 bg-blue-300 hover:bg-blue-500 dark:bg-purple-950 dark:hover:bg-purple-800 text-black dark:text-white hover:cursor-pointer"
            >
                <Reload></Reload>
            </button>
            <button
                class="rounded-md p-1 bg-blue-300 hover:bg-blue-500 dark:bg-purple-950 dark:hover:bg-purple-800 text-black dark:text-white hover:cursor-pointer"
            >
                <Maximize></Maximize>
            </button>
        </div>
    </div>
    <LoadingCard {loadingState}></LoadingCard>
    {#if loadingState === 'done' && chartType === 'line'}
        <LineChart {data} {structure} config={chartConfig}></LineChart>
    {/if}
</div>
