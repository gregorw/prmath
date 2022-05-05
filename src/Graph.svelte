<script>
	import { ComboChart } from '@carbon/charts-svelte'
	import chance, { strategies } from './chance';

  export let p, topics, collaborators, strategy;

  let xAxis = [...Array(11).keys()];
  let data = xAxis.map(() => 0);

  $: {
    data = xAxis.flatMap(t => {
      return strategies.map(s => {
        return {
          t: t,
          value: chance(p, t, collaborators, s),
          group: s
        }
      });
    });

    data.push({
      t: topics,
      value: chance(p, topics, collaborators, strategy),
      group: 'Your PR'
    });
  }

  let options = {
    axes: {
      bottom: {
        title: "Topics",
        mapsTo: "t",
        scaleType: "linear"
      },
      left: {
        title: "Chance",
        mapsTo: "value",
        scaleType: "linear",
        domain: [0, 1],
        thresholds: [{
					"value": 0.5,
          "label": "Threshold",
				}]
      }
    },
    comboChartTypes: [{
			type: "line",
			correspondingDatasets: strategies
		}, {
			type: "scatter",
			options: {
				points: {
					radius: 7
				}
			},
			correspondingDatasets: [
				"Your PR"
			]
		}],
    tooltip: {
      showTotal: false
    },
    height: "400px",
    animations: false
  }
</script>

<p>
  Note that the more topics you include in your pull request and the more
  collaborators you have the more rapidly the chance that your PR gets accepted declines.
</p>
<ComboChart {data} {options} />
