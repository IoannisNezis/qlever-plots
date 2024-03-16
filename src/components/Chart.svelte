<script>
    import * as d3 from 'd3';
    import { afterUpdate, beforeUpdate, onMount } from 'svelte';

    export let title;
    export let dataUrl;
    let node;

    let width = 1000;
    $: height = width/2;
    let spacing = 3;
    let marginTop = 20;
    let marginRight = 20;
    let marginBottom = 30;
    let marginLeft = 40;
    let data = [];
    onMount(() => {
        d3.json(dataUrl)
            .then((result) => {
                const data_row_name =result.head.vars[1];
                data = result.results.bindings.map((x) => {
                    return parseFloat(x[data_row_name].value);
                });

                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });

        width = node.clientWidth;
    });

    afterUpdate(() => {
        width = node.clientWidth;
        console.log(width);
    });

    beforeUpdate(() => {
        console.log('the component is about to update');
    });
    /**
     * @type {SVGGElement}
     */
    let gx;
    /**
     * @type {SVGGElement}
     */
    let gy;

    $: x = d3.scaleLinear(
        [0, data.length - 1],
        [marginLeft + barWidth / 2 + 2.5, width - marginRight]
    );
    $: y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
    $: d3.select(gy).call(d3.axisLeft(y));
    $: d3.select(gx).call(d3.axisBottom(x));
    $: barWidth = (width - marginLeft - marginRight) / data.length - spacing;
</script>

<div bind:this={node} class="bg-slate-200 rounded-lg drop-shadow-lg p-3 flex flex-col w-full">
    <div class="flex justify-between items-center">
        <div></div>
        <h1 class="underline">{ title }</h1>
        <div>
            <div class="border border-black rounded-md p-1 bg-slate-300 hover:bg-slate-500 hover:cursor-pointer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                    />
                </svg>
            </div>
        </div>
    </div>
    <svg {width} {height}>
        <g bind:this={gx} stroke-width="2" transform="translate(0,{height - marginBottom})" />
        <g bind:this={gy} stroke-width="2" transform="translate({marginLeft},0)" />
        <g fill="white" stroke="currentColor" stroke-width=".5">
            {#each data as d, i}
                <rect
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
