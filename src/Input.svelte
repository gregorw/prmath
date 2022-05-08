<h2 class="mb-06">Your pull request</h2>
<Form>
  <FormGroup legendText="Decison making strategy">
    <p>What does it take to approve a PR within your team?</p>
    <Select bind:selected={strategy}>
      {#each strategies as s}
        <SelectItem value={s} text={s} />
      {/each}
    </Select>
  </FormGroup>
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

<script lang="ts">
  import { Form, FormGroup, Slider, Select, SelectItem } from 'carbon-components-svelte'
	import { strategies } from './chance';

  const url = new URL(window.location);
	let params = url.searchParams

	const parse = (param, init = 0, cast = parseInt) => cast(params.get(param) || init)

  export let strategy = params.get('strategy') || strategies[0]
  export let collaborators = parse('c', 2)
  export let p = parse('p', 0.8, parseFloat)
  export let topics = 0;

	const update = (param, value) => {
		url.searchParams.set(param, value);
		window.history.pushState({}, '', url);
	}

	let features = parse('f', 1)
	let refactorings = parse('r')
	let designDecisions = parse('d')
	let surprises = parse('s')

	$: topics = features + refactorings + designDecisions + surprises;

	$: update('f', features);
	$: update('r', refactorings);
	$: update('d', designDecisions);
	$: update('s', surprises);
	$: update('c', collaborators);
	$: update('p', p);
	$: update('strategy', strategy);

</script>
