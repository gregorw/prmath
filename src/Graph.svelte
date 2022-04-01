<script>
	import { ComboChart } from '@carbon/charts-svelte'
	import '@carbon/charts/styles.min.css'
	// import '@carbon/charts/styles-g100.css'
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
        scaleType: "linear"
      },
      left: {
        title: "Chance",
        mapsTo: "value",
        scaleType: "linear",
        thresholds: [{
					"value": 0.5,
          "label": "Threshold",
				}]
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
					radius: 7
				}
			},
			correspondingDatasets: [
				"Your PR"
			]
		}],
    color: {
      scale: {
        'Chance': 'var(--cds-ui-03, #ddd)'
      }
    },
    height: "400px",
    animations: false
  }
</script>

<p>
  Note that the more topics you include in your pull request and the more collaborators you have the more rapidly the chance that your PR gets accepted declines.
</p>
<ComboChart {data} {options}></ComboChart>
