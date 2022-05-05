<script lang="ts">
  import { Row, Column, Form, FormGroup, Slider, Select, SelectItem } from 'carbon-components-svelte'
  import { onMount } from 'svelte';
	import Graph from './Graph.svelte';
	import Percentage from './Percentage.svelte';
	import chanceOfAcceptance, { strategies, formula } from './chance';

	const url = new URL(window.location);
	let params = url.searchParams

	const parse = (param, init = 0, cast = parseInt) => cast(params.get(param) || init)
	const update = (param, value) => {
		url.searchParams.set(param, value);
		window.history.pushState({}, '', url);
	}
	// const typeset = (math) => {
	// 	const destination = document.getElementById('formula');
	// 	if (!destination) { return }
	// 	const options = MathJax.getMetricsFor(destination, false);
	// 	const html = MathJax.tex2svg(math, options);
	// 	return html.outerHTML;
	// }

	let features = parse('f', 1)
	let refactorings = parse('r')
	let designDecisions = parse('d')
	let surprises = parse('s')
	let collaborators = parse('c', 2)
	let p = parse('p', 0.8, parseFloat)
	let strategy = params.get('strategy') || strategies[0]
	// let latexFormula

	let topics
	let chance
	let displayChance

	$: topics = features + refactorings + designDecisions + surprises;
	$: chance = chanceOfAcceptance(p, collaborators, topics, strategy);
	$: displayChance = Math.round(chance * 100);

	$: update('f', features);
	$: update('r', refactorings);
	$: update('d', designDecisions);
	$: update('s', surprises);
	$: update('c', collaborators);
	$: update('p', p);
	$: update('strategy', strategy);
	// $: latex = formula(strategy);
	// $: latexFormula = typeset(latex);

	onMount(() => MathJax.typeset());
</script>

<Row class="mb-08">
	<Column lg={8}>
		<h2 class="mb-06">Your pull request</h2>
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
			<FormGroup legendText="Decison making strategy">
				<p>What does it take to approve a PR within your team?</p>
				<Select bind:selected={strategy}>
					{#each strategies as s}
						<SelectItem value={s} text={s} />
					{/each}
				</Select>
				{#each strategies as s}
					<p>{formula(s)}</p>
				{/each}
			</FormGroup>
		</Form>
	</Column>
	<Column lg={8}>
		<h2 class="mb-06">Result</h2>
		<p id="formula">The probability of acceptance is:</p>
		<Percentage value={displayChance} class="mb-10"/>
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
