<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import QueryRender from './(components)/queryRender.svelte';
	import { pocketbase } from '$lib/pocketbase/pocketbase';
	import Secondtest from './(components)/secondtest.svelte';

	const query = createQuery(() => ({
		queryKey: ['test-query'],
		queryFn: () => pocketbase.collection('test').getFirstListItem('')
	}));

	let condition = true;
</script>

<!-- Center the content at center -->
<div class="flex flex-col items-center justify-center p-6">
	<h1 class="mb-4 text-2xl font-bold">Test Area</h1>
	<p>This is where i tests many things.</p>
</div>
<div class="flex flex-col p-6">
	<h2 class="mt-4 text-lg font-bold">Testing Tanstack query</h2>
</div>

{#if query.isLoading}
	<p class="p-6">Loading projects...</p>
{:else if query.isError}
	<p class="p-6 text-red-500">Error loading projects: {query.error.message}</p>
{:else}
	<div class="p-6">
		<h3 class="text-md mb-2 font-semibold">Projects:</h3>
		<ul class="list-disc pl-5">
			{query.data!.title}
			{query.data!.condition}
		</ul>
	</div>

	{#if query.data!.condition == false}
		<QueryRender />
	{:else}
		<Secondtest />
	{/if}
{/if}
