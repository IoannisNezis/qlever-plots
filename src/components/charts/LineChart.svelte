<script lang="ts">
    import type { LineChartConfig, QleverData, StructureAnalysis } from '$lib/types';
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    export let data: QleverData;
    export let structure: StructureAnalysis;
    export let config: LineChartConfig;

    let node: HTMLElement;

    onMount(() => {
        width = node.clientWidth;
    });

    let height = 600;
    let width = 1000;
    let marginBottom = 30;
    let marginTop = 40;
    let marginLeft = 40;
    let marginRight = 40;

    let gx: SVGGElement;
    let gy: SVGGElement;

    let [minValue, maxValue]: [number, number] = d3.extent(data[config.yAxisColumns[0]]);

    $: x = d3.scaleTime(d3.extent(data[config.xAxisColumn]), [marginLeft, width - marginRight]);
    $: d3.select(gx).call(d3.axisBottom(x));
    $: y = d3.scaleLinear(
        [Math.floor(minValue), Math.ceil(maxValue)],
        [height - marginBottom, marginTop]
    );
    $: d3.select(gy).call(d3.axisLeft(y));

    // Line generator
    const line = d3
        .line(
            (d) => x(d[config.xAxisColumn]),
            (d) => y(d[config.yAxisColumns[0]])
        )
        .curve(d3.curveCardinal.tension(config.tention));

    let path = '';
    $: if (x == undefined) {
        path = '';
    } else {
        let lineData = [];
        for (let index = 0; index < structure.rowCount; index++) {
            lineData.push(
                Object.fromEntries(
                    structure.columns.map((col) => [col.name, data[col.name][index]])
                )
            );
        }
        path = line(lineData);
    }
</script>

<div bind:this={node} class="flex w-full">
    <svg {width} {height}>
        <g
            bind:this={gx}
            stroke-width="1"
            class="text-black dark:text-white"
            transform="translate(0,{height - marginBottom})"
        />
        <g
            bind:this={gy}
            class="text-black dark:text-white"
            stroke-width="1"
            transform="translate({marginLeft},0)"
        />
        <path
            fill="none"
            class="text-red-600 dark:text-red-800"
            stroke="currentcolor"
            stroke-width={config.strokeWeight}
            d={path}
        ></path>
    </svg>
</div>
