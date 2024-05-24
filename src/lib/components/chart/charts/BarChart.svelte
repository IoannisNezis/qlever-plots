<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    export let data: number[];
    export let dataLabels: string[];
    export let xAxisLabel: string;
    export let yAxisLabel: string;

    let node: HTMLElement;
    let width = 600;

    $: height = width / 2.5;

    onMount(() => {
        width = node.clientWidth;
    });

    let spacing = 3;
    let marginTop = 20;
    let marginRight = 20;
    let marginBottom = 30;
    let marginLeft = 40;

    let gx: SVGGElement;
    let gy: SVGGElement;

    $: x = d3.scaleLinear(
        [0, data.length - 1],
        [marginLeft + barWidth / 2 + 2.5, width - marginRight]
    );
    $: y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
    $: d3.select(gy).call(d3.axisLeft(y));
    $: d3.select(gx).call(d3.axisBottom(x));
    $: barWidth = (width - marginLeft - marginRight) / data.length - spacing;

    let mouseX = 0;
    let mouseY = 0;
    let displayTooltip = false;
    let focusedBar: number = 0;
    function handleEnterBar(_event: MouseEvent, barIndex: number) {
        displayTooltip = true;
        focusedBar = barIndex;
    }
    function handleMoveBar(event: MouseEvent) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }
    function handleLeaveBar(_event: MouseEvent) {
        displayTooltip = false;
    }
</script>

<div class="flex">
    <div class="w-5 flex flex-col justify-center">
        <div class="-rotate-90 translate-y-10">
            <span>{yAxisLabel}</span>
        </div>
    </div>
    <div bind:this={node} class="flex w-full">
        <svg {width} {height}>
            <g bind:this={gx} transform="translate(0,{height - marginBottom})" />
            <g bind:this={gy} stroke-width="2" transform="translate({marginLeft},0)" />
            <g class="fill-current text-cyan-800 dark:text-[#806f5b]" stroke="currentColor" stroke-width=".5">
                {#each data as d, i}
                    <rect
                        on:mouseenter={(event) => handleEnterBar(event, i)}
                        on:mousemove={handleMoveBar}
                        on:mouseleave={handleLeaveBar}
                        role="region"
                        x={x(i) - barWidth / 2}
                        y={y(d)}
                        width={barWidth}
                        height={height - y(d) - marginBottom}
                    />
                {/each}
            </g>
        </svg>
    </div>
</div>
{#if displayTooltip}
    <div
        style="top: {mouseY - 50}px; left:{mouseX + 20}px;"
        class="fixed border border-black rounded p-2 bg-slate-400 opacity-75"
    >
        <span class="font-bold">{dataLabels[focusedBar]}</span>:
        <span class="italic">{data[focusedBar]}</span>
    </div>
{/if}
