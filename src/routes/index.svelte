<script context="module">
    import requests from '../data/requests.js';
    
    export async function preload(){
        try {
            // throw new Error(); // uncomment this line to test 500 error message
            const usStats = await requests.usStats();
            const historic = await requests.historicUS();

            return { usStats, historic };
        } catch(err) {
            console.log('error', err);
            this.error(500, "There was an error with the api, please try again in 5 minutes.");
            return;
        }
    }
</script>
<script>
    import CovidStat from "../components/CovidStat.svelte";
    import CovidChart from "../components/CovidChart.svelte";
    import TableContainer from "../components/TableContainer.svelte";
  import Error from './_error.svelte';

    export let usStats;
    export let historic;

    console.log("usStats", usStats);
    console.log("historic", historic);
</script>

<svelte:head>
    <title>Covid-19 US Tracker</title>
</svelte:head>

<div class="section header">
    <div class="container">
        <h1>Covid-19 &mdash; US</h1>
    </div>
</div>

<CovidStat {...usStats}} />

<CovidChart historicData={historic} title="US Covid-19" />

<TableContainer />
