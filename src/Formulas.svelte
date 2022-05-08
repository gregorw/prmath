{#each strategies as s}
  <p class='formula' class:show={s == strategy}>{formula(s)}</p>
{/each}

<script lang="ts">
	import { strategies, formula } from './chance';
  export let strategy
</script>

<style>
	.formula { display: none; }
	.formula.show { display: block; }
</style>
