<script>
  import { Row, Column, Form, FormGroup, Slider } from 'carbon-components-svelte'
  import { onMount } from 'svelte';
	import Graph from './Graph.svelte';
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

	$: topics = features + refactorings + designDecisions + surprises;
	$: chance = chanceOfAcceptance(p, collaborators, topics);
	$: displayChance = Math.round(chance * 100);

	onMount(() => {
		MathJax.typeset();
	})
</script>

<Row style="margin-bottom: 2rem;">
	<Column lg={8}>
		<p>What is a good PR?</p>
		<p>As effective software engineers we want our pull (or merge) requests to get accepted quickly such that we can ship incremental changes to production and increase the value of our software for our users.</p>
	</Column>
</Row>
<Row>
	<Column lg={8}>
		<h4>Input</h4>
		<Form>
			<FormGroup legendText="Pull request topics \(t\)">
				<p>How many topics does the pull request involve?</p>
				<Slider labelText="Features" max={5} bind:value={features} />
				<Slider labelText="Refactorings" max={5} bind:value={refactorings} />
				<Slider labelText="Design Decisions" max={5} bind:value={designDecisions} />
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
		<h4>Result</h4>
		<p>The probability of acceptance {formula} is: {displayChance}%</p>
		<Graph {p} {topics} {collaborators} />
	</Column>
</Row>
<Row>
	<Column>
		<p style="color: #ccc; font-size: .8rem;"><em>Disclaimer: This is a theory. As every theory—it is limited. A theory only models reality to some degree.</em></p>
	</Column>
</Row>

<style>
	p {
		margin-bottom: 1rem;
	}
</style>
