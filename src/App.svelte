<script>
  import { Content, Grid, Row, Column } from 'carbon-components-svelte'
	import Math from './Math.svelte'
	import DarkMode from './DarkMode.svelte'
</script>

<DarkMode />
<Content class="full-height">
	<Grid noGutter>
		<h1 class="mb-06">PR Math</h1>
		<Row class="mb-08">
			<Column lg={8}>
				<p class="mb-05 bx--body-short-02">What is the chance that your pull request gets accepted?</p>
				<p>As effective software engineers we want our pull requests to get accepted quickly such that we can continuously deliver incremental value to production.</p>
			</Column>
		</Row>
		<Math />
	</Grid>
</Content>
