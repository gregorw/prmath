<script lang="ts">
  import { Row, Column, InlineNotification } from 'carbon-components-svelte'
	import Graph from './Graph.svelte';
	import Input from './Input.svelte';
	import Formulas from './Formulas.svelte';
	import Percentage from './Percentage.svelte';
	import chanceOfAcceptance from './chance';

	let topics
	let collaborators = 3
	let strategy
	let chance
	let displayChance
	let p

	$: chance = chanceOfAcceptance(p, topics, collaborators, strategy);
	$: displayChance = Math.round(chance * 100);
</script>

<Row class="mb-08">
	<Column lg={8}>
		<Input bind:strategy bind:topics bind:collaborators bind:p />
	</Column>
	<Column lg={8}>
		<h2 class="mb-06">Result</h2>
		{#if topics <= 0}
			<InlineNotification hideCloseButton kind="info" title="Oh…" subtitle="There is not much to review in this PR. Maybe add some topics on the left?" />
		{/if}
		<p>The probability of acceptance is:</p>
		<Formulas {strategy} />
		<Percentage value={displayChance} {topics} class="mb-10"/>
		<Graph {p} {topics} {collaborators} {strategy} />
	</Column>
</Row>
<Row>
	<Column>
		<p class="disclaimer"><em>Disclaimer: This is a theory. As every theory—it is limited. A theory only models reality to some degree.</em></p>
	</Column>
</Row>

<style>
	.disclaimer {
		color: var(--cds-text-03);
		font-size: var(--cds-label-01-font-size);
	}
</style>
