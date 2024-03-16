<script>
    import '../app.css';
</script>

<div class="flex justify-between w-full bg-zinc-800 px-10 h-[50px]">
    <div class="flex items-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#1AED52"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            class="w-6 h-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
            />
        </svg>
        <div class="text-white text-2xl">QLever Plots</div>
    </div>
    <div class="border bg-cyan-950 rounded-lg">darkMode</div>
</div>
<div class="container mx-auto">
    <slot />
</div>
