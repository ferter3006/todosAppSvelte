<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { pocketbase } from '$lib/pocketbase/pocketbase';

	const query = createQuery(() => ({
		queryKey: ['projects_query2'],
		queryFn: () =>
			pocketbase.collection('projects').getFullList(10, {
				sort: '-created'
			})
	}));
</script>

{#if query.isLoading}
	<p class="p-6">Loading projects...</p>
{:else if query.isError}
	<p class="p-6 text-red-500">Error loading projects: {query.error.message}</p>
{:else}
	<div class="p-6">
		<h3 class="text-md mb-2 font-semibold">Second Test:</h3>
		<ul class="list-disc pl-5">
			{#each query.data as project}
				<li class="mb-1">
					<strong>{project.title}</strong> - {project.description}
				</li>
			{/each}
		</ul>
	</div>
{/if}
