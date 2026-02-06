<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { pocketbase } from '$lib/pocketbase/pocketbase';
	import Secondtest from './secondtest.svelte';

	let showSecondTest = false;

	async function fetchProjects() {
		return pocketbase.collection('projects').getFullList(10, {
			sort: '-created'
		});
	}

	const query = createQuery(() => ({
		queryKey: ['projects'],
		queryFn: () => fetchProjects()
	}));
</script>

<button class="m-4 p-2 bg-blue-500 text-white rounded" on:click={() => showSecondTest = !showSecondTest}>
	{showSecondTest ? 'Ocultar' : 'Mostrar'} Secondtest
</button>

{#if query.isLoading}
	<p class="p-6">Loading projects...</p>
{:else if query.isError}
	<p class="p-6 text-red-500">Error loading projects: {query.error.message}</p>
{:else}
	<div class="p-6">
		<h3 class="text-md mb-2 font-semibold">Projects:</h3>
		<ul class="list-disc pl-5">
			{#each query.data as project}
				<li class="mb-1">
					<strong>{project.title}</strong> - {project.description}
					{#if showSecondTest}
						<Secondtest />
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/if}
