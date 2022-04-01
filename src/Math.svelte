<script>
  import { Row, Column, Form, FormGroup, Slider } from 'carbon-components-svelte'
  import { onMount } from 'svelte';
	import Graph from './Graph.svelte';
	import Percentage from './Percentage.svelte';
	import chanceOfAcceptance, { formula } from './chance';

	let features = 1
	let refactorings = 0
	let designDecisions = 0
	let surprises = 0
	let topics = 0
	let collaborators = 2
	let p = 0.8
	let chance
	let displayChance
	let query = window.location.search
	let params = new URLSearchParams(query)

	$: topics = features + refactorings + designDecisions + surprises;
	$: chance = chanceOfAcceptance(p, collaborators, topics);
	$: displayChance = Math.round(chance * 100);

	$: features = parseInt(params.get('f') || features)
	$: refactorings = parseInt(params.get('r') || refactorings)
	$: designDecisions = parseInt(params.get('d') || designDecisions)
	$: surprises = parseInt(params.get('s') || surprises)
	$: collaborators = parseInt(params.get('c') || collaborators)
	$: p = parseFloat(params.get('p') || p)

	onMount(() => {
		MathJax.typeset();
	})
</script>

<Row class="mb-4">
	<Column lg={8}>
		<p class="mb-1">What is the chance that your pull request gets accepted?</p>
		<p>As effective software engineers we want our pull requests to get accepted quickly such that we can ship incremental changes to production and increase the value of our software to our users.</p>
	</Column>
</Row>
<Row class="mb-6">
	<Column lg={8}>
		<h4 class="mb-2">Your pull request</h4>
		<Form>
			<FormGroup legendText="Pull request topics \(t\)">
				<p class="mb-2">How many topics does the pull request involve?</p>
				<Slider class="mb-1" labelText="Features" max={5} bind:value={features} />
				<Slider class="mb-1" labelText="Refactorings" max={5} bind:value={refactorings} />
				<Slider class="mb-1" labelText="Design Decisions" max={5} bind:value={designDecisions} />
				<Slider class="mb-1" labelText="Surprises" max={5} bind:value={surprises} />
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
		<h4 class="mb-2">Result</h4>
		<p>The probability of acceptance {formula} is:</p>
		<Percentage value={displayChance} class="mb-4"/>
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
