<script>
	import { GaugeChart } from '@carbon/charts-svelte'
	import '@carbon/charts/styles.min.css'
	// import '@carbon/charts/styles-g100.css'

  export let value;

  let color = '#ddd';
  let options = {};

  $: {
    if (value > 60) {
      color = 'var(--traffic-light-green)';
    } else if (value > 40) {
      color = 'var(--traffic-light-yellow)';
    } else {
      color = 'var(--traffic-light-red)';
    }
  }
  $: data = [{ group: 'value', value }]
  $: options = {
    color: {
      scale: {
        value: color
      }
    },
    height: "200px",
    gauge: {
      arcWidth: 30,
      alignment: "center"
    }
  }
</script>

<GaugeChart {data} {options}></GaugeChart>
