<script lang="ts">
    import Chart from '$lib/components/chart/Chart.svelte';

    const charts = [
        {
            title: 'Erfolgsquote',
            dataUrl:
                'http://127.0.0.1:7019?query=PREFIX+studyPath%3A+%3Chttp%3A%2F%2Fcohort_data.nezis.de%2Fresource%2FstudyPath%2F%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX+metrico%3A+%3Chttp%3A%2F%2Fcohort_data.nezis.de%2Fontology%2FsemesterMetric%2F%3E%0APREFIX+unio%3A+%3Chttp%3A%2F%2Fcohort_data.nezis.de%2Fontology%2F%3E%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0ASELECT+%3Fstartdate+%3Fsuccess_rate_6++%3Fsuccess_rate_10+WHERE+%7B%0A++%3Fcohort+rdf%3Atype+unio%3ACohort+.%0A++%3Fcohort+unio%3AstartSemester+%3Fstartsemester+.%0A++%3Fstartsemester+unio%3AstartDate+%3Fstartdate+.%0A++%3Fcohort+unio%3Astudypath+studyPath%3Absc_Informatik+.%0A++%0A++%3Fcohort+rdfs%3Alabel+%3Fcohort_label+.%0A++%3Fcohort+metrico%3Alatest_size+%3Flatest_size+.%0A++%7B%0A++++%3Fcohort+metrico%3Ametric+%3Fmetric_6+.%0A++++%3Fmetric_6+metrico%3Asemester_num+%226%22%5E%5E%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23int%3E+.%0A++++%3Fmetric_6+metrico%3Agraduates_metric%2Fmetrico%3Agraduates_accumulated+%3Fgraduates_accumulated_6+.%0A++%7D%0A+++BIND+%28%28%3Fgraduates_accumulated_6%2F%3Flatest_size%2A100%29+as+%3Fsuccess_rate_6%29%0A++OPTIONAL+%7B+%3Fcohort+metrico%3Ametric+%3Fmetric_10+.%0A++++%3Fmetric_10+metrico%3Asemester_num+%2210%22%5E%5E%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23int%3E+.%0A%09%3Fmetric_10+metrico%3Agraduates_metric%2Fmetrico%3Agraduates_accumulated+%3Fgraduates_accumulated_10+.+++%0A+%7D%0A++BIND+%28%28%3Fgraduates_accumulated_10%2F%3Flatest_size+%2A+100%29+as+%3Fsuccess_rate_10%29%0A%0A++%0A%7D%0AORDER+BY+%3Fstartdate'
        }
        // {
        //     title: 'Astronauts ranked by days in space',
        //     dataUrl:
        //         'https://qlever.cs.uni-freiburg.de/api/wikidata?query=PREFIX+wd%3A+%3Chttp%3A%2F%2Fwww.wikidata.org%2Fentity%2F%3E%0APREFIX+wdt%3A+%3Chttp%3A%2F%2Fwww.wikidata.org%2Fprop%2Fdirect%2F%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0ASELECT+DISTINCT+%3Fastronaut+%3Fdays_in_space+WHERE+%7B%0A++%3F_astronaut+wdt%3AP106+wd%3AQ11631+.%0A++%3F_astronaut+wdt%3AP2873+%3Ftime_in_space+.%0A++%3F_astronaut+rdfs%3Alabel+%3Fastronaut+.%0A++FILTER+%28LANG%28%3Fastronaut%29+%3D+%22en%22%29+.%0A++BIND+%28%3Ftime_in_space+%2F%283600%2A24%29+as+%3Fdays_in_space%29%0A%7D%0AORDER+BY+DESC%28%3Ftime_in_space%29%0ALIMIT+10%0A'
        // }
    ];
</script>

<div class="grid grid-cols-1 gap-4 my-12">
    {#each charts as chart (chart.title)}
        <Chart {...chart} />
    {/each}
</div>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>
