<script>
  import { Row, Column, Form, FormGroup, Slider } from 'carbon-components-svelte'
  import { onMount } from 'svelte';

	let features = 1
	let refactorings = 0
	let designDecisions = 0
	let surprises = 0
	let topics = 0
	let collaborators = 2
	let p = 0.8
	let chance
	let displayChance
	let formula = "\\(p^{ct}\\)"

	$: topics = features + refactorings + designDecisions + surprises;
	$: chance = p ** (collaborators * topics)
	$: displayChance = chance.toFixed(2) * 100

	onMount(() => {
		MathJax.typeset();
	})
</script>

<Row style="margin-bottom: 2rem;">
	<Column lg={8}>
		<p style="margin-bottom: 1rem;">What is a good PR?</p>
		<p>As effective software engineers we want our pull (or merge) requests to get accepted quickly such that we can ship incremental changes to production and increase the value of our software for our users.</p>
	</Column>
</Row>
<Row>
	<Column>
		<Form>
			<FormGroup legendText="Pull request topics \(t\)">
				<p style="margin-bottom: 1rem;">How many topics does the pull request involve?</p>
				<Slider labelText="Features" max={5} bind:value={features} />
				<Slider labelText="Refactorings" max={5} bind:value={refactorings} />
				<Slider labelText="Design Decisions" max={5} bind:value={designDecisions} />
				<Slider labelText="Surprises" max={5} bind:value={surprises} />
			</FormGroup>
			<FormGroup legendText="Number of collaborators \(c\)">
				<p style="margin-bottom: 1rem;">How many collaborators do you have (excluding yourself)?"</p>
				<Slider max={5} bind:value={collaborators} />
			</FormGroup>
			<FormGroup legendText="Probability of acceptance \(p\)">
				<p style="margin-bottom: 1rem;">What is the likelihood that your collaborators accept any topic?"</p>
				<Slider max={1} step={0.1} bind:value={p} />
			</FormGroup>
		</Form>
	</Column>
</Row>
<Row>
	<Column>
		<p>The probability of acceptance {formula} is: {displayChance}%</p>
	</Column>
</Row>
