<script lang="ts">
  import { Row, Column, Form, FormGroup, Slider } from 'carbon-components-svelte'
  import { onMount } from 'svelte';
	import Graph from './Graph.svelte';
	import Percentage from './Percentage.svelte';
	import chanceOfAcceptance, { formula } from './chance';

	const url = new URL(window.location);
	let params = url.searchParams

	const parse = (param, init = 0, cast = parseInt) => cast(params.get(param) || init)

	let features = parse('f', 1)
	let refactorings = parse('r')
	let designDecisions = parse('d')
	let surprises = parse('s')
	let collaborators = parse('c', 2)
	let p = parse('p', 0.8, parseFloat)

	let topics
	let chance
	let displayChance

	$: topics = features + refactorings + designDecisions + surprises;
	$: chance = chanceOfAcceptance(p, collaborators, topics);
	$: displayChance = Math.round(chance * 100);

	onMount(() => {
		MathJax.typeset();
	})
</script>

<Row class="mb-08">
	<Column lg={8}>
		<h4 class="mb-06">Your pull request</h4>
		<Form>
			<FormGroup legendText="Pull request topics \(t\)">
				<p class="mb-06">How many topics does the pull request involve?</p>
				<Slider class="mb-05" labelText="Features" max={5} bind:value={features} />
				<Slider class="mb-05" labelText="Refactorings" max={5} bind:value={refactorings} />
				<Slider class="mb-05" labelText="Design Decisions" max={5} bind:value={designDecisions} />
				<Slider labelText="Surprises" max={5} bind:value={surprises} />
			</FormGroup>
			<FormGroup legendText="Number of collaborators \(c\)">
				<p>How many collaborators do you have (excluding yourself)?</p>
				<Slider max={5} bind:value={collaborators} />
			</FormGroup>
			<FormGroup legendText="Probability of acceptance \(p\)">
				<p>What is the likelihood that your collaborators accept any topic?</p>
				<Slider max={1} step={0.1} bind:value={p} />
			</FormGroup>
		</Form>
	</Column>
	<Column lg={8}>
		<h4 class="mb-06">Result</h4>
		<p>The probability of acceptance {formula} is:</p>
		<Percentage value={displayChance} class="mb-10"/>
		<Graph {p} {topics} {collaborators} />
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
