<script>
	import { LineChart } from '@carbon/charts-svelte'
	import '@carbon/charts/styles.min.css'
	import chance from './chance';

  export let p, topics, collaborators;

  let xAxis = [...Array(11).keys()];
  let data = xAxis.map(t => 0);

  $: {
    data = xAxis.map(t => {
      return {
        t: t,
        value: chance(p, t, collaborators),
        group: 'Chance'
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
        title: "Topics",
        mapsTo: "t",
        scaleType: "labels"
      },
      left: {
        title: "Chance",
        mapsTo: "value",
        scaleType: "linear"
      }
    },
    comboChartTypes: [{
			type: "line",
			correspondingDatasets: [
				"Chance"
			]
		}, {
			type: "scatter",
			options: {
				points: {
					radius: 10
				}
			},
			correspondingDatasets: [
				"Your PR"
			]
		}],
    color: {
      scale: {
        'Chance': '#ddd'
      }
    },
    height: "400px"
  }
</script>

<LineChart {data} {options}></LineChart>
