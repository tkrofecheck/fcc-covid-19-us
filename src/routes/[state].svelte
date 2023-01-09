<script context="module">
    import stateNames from '../data/stateNames.js';
    
    export async function preload(page) {
        const state = page.params['state'];

        if (stateNames.find(s=> s.abbreviation === state) === undefined) {
            console.log("should get error");
            this.error(404, "State Not Found"); // special function that can be used in the preload
        }

        try {
            // throw new Error(); // uncomment this line to test 500 error message
            return { state: page.params['state'] };
        } catch (err) {
            this.error(500, "There was an error with the api, please try again in 5 minutes.");
            return;
        }
    }
</script>

<script>
    import CovidStat from "../components/CovidStat.svelte";
    import CovidChart from "../components/CovidChart.svelte";
    import TableContainer from "../components/TableContainer.svelte";

    export let state;
</script>

<svelte:head>
    <title>Covid-19 US Tracker</title>
</svelte:head>

<div class="section header">
    <div class="container">
        <h1>Covid-19 &mdash; {state}</h1>
    </div>
</div>

<CovidStat />

<CovidChart />