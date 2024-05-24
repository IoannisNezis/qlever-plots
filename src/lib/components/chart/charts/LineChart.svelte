<script lang="ts">
    import type { LineChartConfig, QleverData, StructureAnalysis } from '$lib/types';
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    export let data: QleverData;
    export let structure: StructureAnalysis;
    export let config: LineChartConfig;

    type LineData = {
        [key: string]: number | Date | string;
    }[];
    let lineData: LineData = [];
    for (let index = 0; index < structure.rowCount; index++) {
        lineData.push(
            Object.fromEntries(structure.columns.map((col) => [col.name, data[col.name][index]]))
        );
    }

    onMount(() => {
        width = node.clientWidth;
    });

    let node: HTMLElement;

    let height = 600;
    let width = 1700;
    let marginBottom = 30;
    let marginTop = 40;
    let marginLeft = 40;
    let marginRight = 40;

    const color = d3.scaleOrdinal(d3.schemeSet1);
    let visible = config.yAxisColumns.map(() => true);

    let gx: SVGGElement;
    let gy: SVGGElement;

    // NOTE: yValues can only be number[], i just dont know how to convince ts jet
    $: yValues = config.yAxisColumns
        .filter((_col, i) => visible[i])
        .map((col) => data[col])
        .flat();
    $: [minValue, maxValue] = d3.extent(yValues);

    // NOTE: xValues is a bit more tricky. But its the same issue as with yValues.
    const xValues: Date = data[config.xAxisColumn];
    $: x = d3.scaleTime(d3.extent(xValues), [marginLeft, width - marginRight]);
    $: d3.select(gx).call(d3.axisBottom(x));
    $: y = d3.scaleLinear([minValue ?? 0, maxValue ?? 1], [height - marginBottom, marginTop]);
    $: d3.select(gy).transition().call(d3.axisLeft(y));

    let circle: string | null = d3.symbol(d3.symbolCircle, config.nodeRadius)();

    let lines: [string, [number, number][]][] = [];

    function generateLine(column: string): string {
        return d3
            .line(
                (d) => x(d[config.xAxisColumn]),
                (d) => y(d[column])
            )
            .curve(d3.curveCatmullRom.alpha(config.tention))(lineData);
    }

    function generateNodes(column: string): [number, number][] {
        return lineData
            .filter((datum) => datum[column] != undefined)
            .map((datum) => {
                return [x(datum[config.xAxisColumn]), y(datum[column])];
            });
    }

    $: if (x != undefined) {
        lines = config.yAxisColumns.map((col: string) => {
            return [generateLine(col), generateNodes(col)];
        });
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
        {#each lines as [line, nodes], index}
            {#if visible[index]}
                <path
                    fill="none"
                    stroke={color(config.yAxisColumns[index])}
                    stroke-width={config.strokeWeight}
                    d={line}
                ></path>
                {#each nodes as [xPos, yPos]}
                    <path
                        class="text-black dark:text-white"
                        stroke="currentcolor"
                        fill="currentcolor"
                        stroke-width={config.strokeWeight}
                        transform="translate({xPos}, {yPos})"
                        d={circle}
                    ></path>
                {/each}
            {/if}
        {/each}
    </svg>
</div>
<div class="flex justify-center dark:text-white">
    {#each config.yAxisColumns as col, index}
        <button
            class="border-4 rounded-lg px-2 mx-2"
            style="border-color: {color(col)};"
            on:click={() => (visible[index] = !visible[index])}
        >
            {col}
        </button>
    {/each}
</div>
