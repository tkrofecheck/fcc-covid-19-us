import moment from 'moment';
import format from './format';

function usStats(data) {
    const [usStatRaw] = data;

    return parseStats(usStatRaw);
}

/* US Stats - Object Example
{
    "date": 20210307,
    "states": 56,
    "positive": 28756489,
    "negative": 74582825,
    "pending": 11808,
    "hospitalizedCurrently": 40199,
    "hospitalizedCumulative": 776361,
    "inIcuCurrently": 8134,
    "inIcuCumulative": 45475,
    "onVentilatorCurrently": 2802,
    "onVentilatorCumulative": 4281,
    "dateChecked": "2021-03-07T24:00:00Z",
    "death": 515151,
    "hospitalized": 776361,
    "totalTestResults": 363825123,
    "lastModified": "2021-03-07T24:00:00Z",
    "recovered": null,
    "total": 0,
    "posNeg": 0,
    "deathIncrease": 842,
    "hospitalizedIncrease": 726,
    "negativeIncrease": 131835,
    "positiveIncrease": 41835,
    "totalTestResultsIncrease": 1170059,
    "hash": "a80d0063822e251249fd9a44730c49cb23defd83"
  }
*/

function stateStats(state, data) {
    const stateRawData = data.find(d => d.state === state);

    return parseStats(stateRawData);
}

/* State Stats - Object Example
{
    "date": 20210307,
    "state": "AK",
    "positive": 56886,
    "probableCases": null,
    "negative": null,
    "pending": null,
    "totalTestResultsSource": "totalTestsViral",
    "totalTestResults": 1731628,
    "hospitalizedCurrently": 33,
    "hospitalizedCumulative": 1293,
    "inIcuCurrently": null,
    "inIcuCumulative": null,
    "onVentilatorCurrently": 2,
    "onVentilatorCumulative": null,
    "recovered": null,
    "lastUpdateEt": "3/5/2021 03:59",
    "dateModified": "2021-03-05T03:59:00Z",
    "checkTimeEt": "03/04 22:59",
    "death": 305,
    "hospitalized": 1293,
    "hospitalizedDischarged": null,
    "dateChecked": "2021-03-05T03:59:00Z",
    "totalTestsViral": 1731628,
    "positiveTestsViral": 68693,
    "negativeTestsViral": 1660758,
    "positiveCasesViral": null,
    "deathConfirmed": null,
    "deathProbable": null,
    "totalTestEncountersViral": null,
    "totalTestsPeopleViral": null,
    "totalTestsAntibody": null,
    "positiveTestsAntibody": null,
    "negativeTestsAntibody": null,
    "totalTestsPeopleAntibody": null,
    "positiveTestsPeopleAntibody": null,
    "negativeTestsPeopleAntibody": null,
    "totalTestsPeopleAntigen": null,
    "positiveTestsPeopleAntigen": null,
    "totalTestsAntigen": null,
    "positiveTestsAntigen": null,
    "fips": "02",
    "positiveIncrease": 0,
    "negativeIncrease": 0,
    "total": 56886,
    "totalTestResultsIncrease": 0,
    "posNeg": 56886,
    "dataQualityGrade": null,
    "deathIncrease": 0,
    "hospitalizedIncrease": 0,
    "hash": "dc4bccd4bb885349d7e94d6fed058e285d4be164",
    "commercialScore": 0,
    "negativeRegularScore": 0,
    "negativeScore": 0,
    "positiveScore": 0,
    "score": 0,
    "grade": ""
  }
*/

function historicUS(historicData) {
    return parseHistoric(historicData);
}

function parseHistoric(historicData) {
    return [
        {
            label: 'Cases',
            key: 'positive',
            color: 'rgb(100, 0, 200)',
        },
        {
            label: 'Recovered',
            key: 'recovered',
            color: 'rgb(100, 100, 200)',
        },
        {
            label: 'Total Tested',
            key: 'totalTestResults',
            color: 'rgb(10, 30, 100)',
        },
        {
            label: 'Hospitalized',
            key: 'hospitalizedCurrently',
            color: 'rgb(20, 100, 230)',
        },
        {
            label: 'Deaths',
            key: 'death',
            color: 'rgb(255, 99, 132)',
        }
    ].reduce((prev, next) => {
        if (historicData.filter(d => d[next.key] !== null).length > 4) {
            prev.push(parseChart(historicData, next.key, next.label, next.color));
        }

        return prev;
    }, []);
}

function parseChart(historicData, key, label, color) {
    const chartData = historicData.map(data => {
        return {
            x: moment(data.date, 'YYYYMMDD'),
            y: data[key] || 0,
        }
    });

    return {
        label,
        data: chartData,
        fill: false,
        borderColor: color
    }
}

/* Historic US Stats - Object Example (for Chart)
{
    "date": 20210307,
    "states": 56,
    "positive": 28756489,
    "negative": 74582825,
    "pending": 11808,
    "hospitalizedCurrently": 40199,
    "hospitalizedCumulative": 776361,
    "inIcuCurrently": 8134,
    "inIcuCumulative": 45475,
    "onVentilatorCurrently": 2802,
    "onVentilatorCumulative": 4281,
    "dateChecked": "2021-03-07T24:00:00Z",
    "death": 515151,
    "hospitalized": 776361,
    "totalTestResults": 363825123,
    "lastModified": "2021-03-07T24:00:00Z",
    "recovered": null,
    "total": 0,
    "posNeg": 0,
    "deathIncrease": 842,
    "hospitalizedIncrease": 726,
    "negativeIncrease": 131835,
    "positiveIncrease": 41835,
    "totalTestResultsIncrease": 1170059,
    "hash": "a80d0063822e251249fd9a44730c49cb23defd83"
  }
*/

function parseStats(rawStats) {
    return {
        cases: format.number(rawStats.positive),
        deaths: format.number(rawStats.death),
        recovered: format.number(rawStats.recovered),
        ventilator: format.number(rawStats.onVentilatorCurrently),
        hospitalized: format.number(rawStats.hospitalized),
        icu: format.number(rawStats.inIcuCurrently),
        tested: format.number(rawStats.totalTestResults),
        updated: moment(rawStats.lastModified, 'LLLL'),
    }
}

export default {
    usStats,
    stateStats,
    historicUS,
};