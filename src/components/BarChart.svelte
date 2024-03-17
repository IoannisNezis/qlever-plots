<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    export let data: number[];
    export let dataLabels: string[];
    export let xAxisLabel: string;
    export let yAxisLabel: string;

    let node: HTMLElement;
    let width = 1000;

    $: height = width / 2;

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
    /** @param {MouseEvent} event */
    function handleEnterBar(event: MouseEvent, barIndex: number) {
        displayTooltip = true;
        focusedBar = barIndex;
    } /** @param {MouseEvent} event */
    function handleMoveBar(event: MouseEvent) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    } /** @param {MouseEvent} event */
    function handleLeaveBar(event: MouseEvent) {
        displayTooltip = false;
    }
</script>

<div bind:this={node} class="relative flex">
    <div class="w-5 flex flex-col justify-center">
        <div class="-rotate-90 translate-y-10">
            <span>{ yAxisLabel }</span>
        </div>
    </div>
    <svg {width} {height}>
        <g bind:this={gx} stroke-width="2" transform="translate(0,{height - marginBottom})" />
        <g bind:this={gy} stroke-width="2" transform="translate({marginLeft},0)" />
        <g fill="white" stroke="currentColor" stroke-width=".5">
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
                    fill="#69b3a2"
                />
            {/each}
        </g>
    </svg>
</div>
{#if displayTooltip}
    <div
        style="top: {mouseY - 50}px; left:{mouseX + 20}px;"
        class="fixed border border-black rounded p-2 bg-slate-500 opacity-75"
    >
        <span class="font-bold">{dataLabels[focusedBar]}</span>:
        <span class="italic">{data[focusedBar]}</span>
    </div>
{/if}
