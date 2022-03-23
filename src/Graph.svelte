<script>
	import { LineChart } from '@carbon/charts-svelte'
	import '@carbon/charts/styles.min.css'
	import chance from './chance';

  export let p, topics, collaborators;

  let xAxis = [...Array(11).keys()];
  let data = xAxis.map(t => 0);
  let chanceOfAcceptance = 0;

  $: {
    data = xAxis.map(t => {
      return {
        t: t,
        value: chance(p, t, collaborators),
        group: 'Chance of acceptance'
      }
    });
    data.push({
      t: topics,
      value: chance(p, topics, collaborators),
      group: 'Your PR'
    });
  }


  let options = {
    axes: {
      bottom: {
        title: "Number of topics",
        mapsTo: "t",
        scaleType: "labels"
      },
      left: {
        title: "Chance of acceptance",
        mapsTo: "value",
        scaleType: "linear"
      }
    },
    // color: {
    //   scale: {
    //     'Chance of acceptance': '#ddd'
    //   }
    // },
    height: "400px"
  }
</script>

<LineChart {data} {options}></LineChart>
