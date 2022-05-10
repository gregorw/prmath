{#each strategies as s}
  <p class='formula' class:show={s == strategy}>{formula(s)}</p>
{/each}

<script lang="ts">
	import { onMount } from 'svelte';
	import { strategies, formula } from './chance';
  export let strategy

	onMount(() => MathJax.typeset());
</script>

<style>
	.formula { display: none; }
	.formula.show { display: block; }
</style>
