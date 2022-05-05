<script>
	import { GaugeChart } from '@carbon/charts-svelte'
	import '@carbon/charts/styles.min.css'
	// import '@carbon/charts/styles-g100.css'

  export let value, topics;

  let color = 'var(--cds-ui-04)';
  let options = {};
  let defaultOptions = {
    height: "200px",
    gauge: {
      arcWidth: 30,
      alignment: "center"
    },
    color: {
      scale: {
        value: color
      }
    }
  };

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
    ...defaultOptions,
    color: {
      scale: {
        value: color
      }
    }
  }

</script>

<figure {...$$restProps}>
  {#if topics > 0}
    <GaugeChart {data} {options}></GaugeChart>
  {:else}
    <GaugeChart {data} options={defaultOptions}></GaugeChart>
  {/if}
</figure>
