<script lang="ts">
    import Chart from '../components/Chart.svelte';

    let dataUrl1 =
        'https://qlever.cs.uni-freiburg.de/api/wikidata?query=PREFIX+wd%3A+%3Chttp%3A%2F%2Fwww.wikidata.org%2Fentity%2F%3E%0APREFIX+wdt%3A+%3Chttp%3A%2F%2Fwww.wikidata.org%2Fprop%2Fdirect%2F%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX+schema%3A+%3Chttp%3A%2F%2Fschema.org%2F%3E%0ASELECT+%3Funiversity_name%0A+++++++%28MAX%28%3Fstudents_count_%29+AS+%3Fstudents_count%29WHERE+%7B%0A++%3Funiversity+wdt%3AP31%2Fwdt%3AP279%2A+wd%3AQ3918+.%0A++%3Funiversity+wdt%3AP17+wd%3AQ183+.%0A++%3Funiversity+wdt%3AP2196+%3Fstudents_count_+.%0A++%3Funiversity+%40de%40rdfs%3Alabel+%3Funiversity_name+.%0A++%3Funiversity+%40de%40schema%3Adescription+%3Fdescription+.%0A++FILTER+%28REGEX%28%3Funiversity_name%2C+%22universit%C3%A4t%22%2C+%22i%22%29+%7C%7C+REGEX%28%3Fdescription%2C+%22universit%C3%A4t%22%2C+%22i%22%29%29%0A++FILTER+%28%21%28REGEX%28%3Funiversity_name%2C+%22musik%22%2C+%22i%22%29%29+%26%26+%21%28REGEX%28%3Fdescription%2C+%22musik%22%2C+%22i%22%29%29%29%0A%7D%0AGROUP+BY+%3Funiversity+%3Funiversity_name+%3Fdescription%0AORDER+BY+DESC%28%3Fstudents_count%29';

    let dataUrl2 ="https://qlever.cs.uni-freiburg.de/api/wikidata?query=PREFIX+wd%3A+%3Chttp%3A%2F%2Fwww.wikidata.org%2Fentity%2F%3E%0APREFIX+wdt%3A+%3Chttp%3A%2F%2Fwww.wikidata.org%2Fprop%2Fdirect%2F%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+DISTINCT+%3FastronautLabel+%3Ftime_in_space+WHERE+%7B%0A++%3Fastronaut+wdt%3AP106+wd%3AQ11631+.%0A++%3Fastronaut+wdt%3AP2873+%3Ftime_in_space+.%0A++%3Fastronaut+rdfs%3Alabel+%3FastronautLabel+.%0A++FILTER+%28LANG%28%3FastronautLabel%29+%3D+%22en%22%29+.%0A%7D%0AORDER+BY+DESC%28%3Ftime_in_space%29%0Alimit+20"
</script>

<div class="grid grid-cols-2 gap-4 my-20">
    <Chart title="Universitys in Germany" dataUrl={dataUrl1} />
    <Chart title="Space Time" dataUrl={dataUrl2} />
</div>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>
