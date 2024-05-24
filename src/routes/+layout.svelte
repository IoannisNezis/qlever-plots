<script>
    import Header from '$lib/components/header/Header.svelte';
    import '../app.css';
    import Footer from './footer.svelte';
</script>

<div class="flex flex-col h-screen">
    <Header></Header>
    <div
        class="flex-grow bg-gradient-to-r from-slate-200 to-sky-100 dark:from-black dark:to-indigo-950 pb-5"
    >
        <div class="container mx-auto w-full flex flex-col">
            <div class="container mx-auto">
                <slot />
            </div>
        </div>
    </div>
    <Footer></Footer>
</div>
